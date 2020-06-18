require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');
const { sendVoucherLink, updateProductInDB } = require('./api');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const Router = require('koa-router');
const { receiveWebhook, registerWebhook } = require('@shopify/koa-shopify-webhooks');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');
dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();
    server.use(session({ secure: true, sameSite: 'none' }, server));
    server.keys = [SHOPIFY_API_SECRET_KEY];
    server.use(
        createShopifyAuth({
            apiKey: SHOPIFY_API_KEY,
            secret: SHOPIFY_API_SECRET_KEY,
            scopes: ['read_products', 'write_products', 'write_orders', 'read_orders'],
            async afterAuth(ctx) {
                const { shop, accessToken } = ctx.session;
                ctx.cookies.set('shopOrigin', shop, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                })
                const response = await registerWebhook({
                    address: `${HOST}/webhooks/orders/paid`,
                    topic: 'ORDERS_PAID',
                    accessToken,
                    shop,
                    apiVersion: ApiVersion.April20
                })
                if (response.success) console.log('Successfully registered webhook! #2')
                else console.log('Failed to register webhook #3', response.result)
                ctx.redirect('/');
            },
        }),
    )

    const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });

    router.post('/webhooks/orders/paid', webhook, (ctx) => {
        const wH = ctx.state.webhook;
        let shop = wH.domain;
        let email = wH.payload.email.length > 1 ? wH.payload.email : null;
        let phone = wH.payload.phone ? wH.payload.phone : null;
        let name = wH.payload.customer ? wH.payload.customer.first_name : null;
        let purchases = wH.payload.line_items;
        for (let purchase of purchases) {
            let id = wH.payload.id;
            let title = purchase.title;
            let variant = purchase.variant_title;
            sendVoucherLink(shop, email, phone, title, variant, id, name)
        }
        ctx.response.status = 200;
    })

    server.use(graphQLProxy({ version: ApiVersion.April20 }));
    router.get('*', verifyRequest(), async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    })
    router.patch('*', verifyRequest(), async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    })
    router.post('*', verifyRequest(), async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    })
    router.put('*', verifyRequest(), async (ctx) => {
        await handle(ctx.req, ctx.res);
        ctx.respond = false;
        ctx.res.statusCode = 200;
    })
    server.use(router.allowedMethods());
    server.use(router.routes());
    server.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    })
});