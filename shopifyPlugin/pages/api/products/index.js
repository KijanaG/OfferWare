const dotenv = require('dotenv');
const AWS = require('aws-sdk');
dotenv.config();
AWS.config.update({ region: 'us-west-2' });
var docClient = new AWS.DynamoDB.DocumentClient();

export default async (req, res) => {
    const { shopOrigin } = req.cookies;
    res.setHeader('Content-Type', 'application/json')
    let success = null;
    switch (req.method) {
        case 'GET':
            let fetchedProducts = await fetchProductsFromDB(shopOrigin)
            res.status(200).json({ data: fetchedProducts ? fetchedProducts : [] });
            break;
        case 'POST':
            let postProducts = req.body.products.map(prod => {
                delete prod.__typename;
                let id_arr = prod.id.split('/')
                prod.global_id = id_arr[id_arr.length - 1]
                let images = prod.images.edges.map(img => {
                    delete img.__typename;
                    delete img.node.__typename;
                    return img.node;
                })
                prod.images = images;
                let variants = prod.variants.edges.map(variant => {
                    delete variant.__typename;
                    delete variant.node.__typename;
                    return variant.node;
                })
                prod.variants = variants;
                prod.shopOrigin = shopOrigin;
                return prod
            })
            success = await postProductsToDB(postProducts, 'POST')
            res.status(200).json({ success });
            break;
        case 'PUT':
            success = await postProductsToDB([req.body.product], 'PUT')
            res.status(200).json({ success })
            break;
        case 'PATCH':
            success = await updateProductInDB(req.body.product, shopOrigin)
            res.status(200).json({ success })
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH'])
            res.status(405).end(`Method ${method} Not Allowed.`)
            break;
    }
}

async function updateProductInDB(product, shop) {
    let { title, descriptionHtml, images, variants, id } = product;
    const title_params = {
        TableName: 'Shopify_Products',
        FilterExpression: 'shopOrigin = :shop and id = :id',
        ExpressionAttributeValues: { ':shop': shop, ':id': id }
    }
    let awsRequest = docClient.scan(title_params);
    let result = await awsRequest.promise();
    let updatedProduct = null;
    if (result.Items.length > 0) {
        updatedProduct = { ...result.Items[0], title, descriptionHtml }
        await updateDB(updatedProduct, images, variants)
        return true
    }
}

async function updateDB(updatedProduct, images, variants) {
    let newImages = [];
    for (let image of images.edges)
        newImages.push({ 'altText': image.node.altText, 'originalSrc': image.node.originalSrc })
    updatedProduct.images = newImages;
    let newVariants = [];
    for (let variant of variants.edges)
        newVariants.push({ 'title': variant.node.title, 'price': variant.node.price, 'compareAtPrice': variant.node.compareAtPrice })
    updatedProduct.variants = newVariants
    let updated_params = {
        TableName: 'Shopify_Products',
        Item: updatedProduct
    }
    let awsReq = await docClient.put(updated_params);
    let res = awsReq.promise();
    return;
}

async function fetchProductsFromDB(shopOrigin, count = 0) {
    const params = {
        TableName: 'Shopify_Products',
        FilterExpression: "shopOrigin = :shop",
        ExpressionAttributeValues: { ':shop': shopOrigin }
    }
    const awsRequest = await docClient.scan(params);
    const result = await awsRequest.promise();
    if (result.Items.length > 0)
        return result.Items;
    else {
        if (count == 3) return null
        await fetchProductsFromDB(shopOrigin, ++count)
    }
}

async function postProductsToDB(products, method, count = 0) {
    if (products.length == 0) return true;
    let Item = { ...products[products.length - 1], updatedAt: Date.now() }
    if (method == 'POST') {
        Item = {
            ...Item, streetAddress: null, city: null, zipCode: null, state: null, 
            transactionTotal: 0, businessName: null, merchantDescription: null, 
            email: null, createdAt: Date.now(), redeemedTotal: 0
        }
    }
    const params = { TableName: 'Shopify_Products', Item }
    docClient.put(params, async (err, data) => {
        if (err) {
            if (count == 5) return false;
            await postProductsToDB(products, method, ++count)
        } else {
            if (products.length > 0) {
                products.pop();
                await postProductsToDB(products, method, count)
            }
            return true
        }
    })
}