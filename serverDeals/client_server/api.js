const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const axios = require('axios');
const AWS = require('aws-sdk');
const url = require('url');
dotenv.config();
sgMail.setApiKey(process.env.sendGridKey);
AWS.config.update({ region: 'us-west-2' });
var docClient = new AWS.DynamoDB.DocumentClient();

module.exports = {
    googlePlaceSearch: async (req, res) => {
        let { name, coords } = req.body;
        axios.post(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&locationbias=circle:1600@${coords.lat},${coords.lng}&key=${process.env.googleMapKey}`)
            .then(place_res => {
                axios.post(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_res.data.candidates[0].place_id}&fields=name,website,reviews,user_ratings_total,rating,formatted_phone_number,opening_hours,photos,formatted_address,geometry&key=${process.env.googleMapKey}`)
                    .then(details_res => {
                        res.send({ data: details_res.data })
                    })
                    .catch(err => {
                        console.log(err)
                        res.send(null)
                    })
            })
            .catch(err => {
                console.log(err)
                res.send(null)
            })
    },
    getDirections: async (req, res) => {
        const { myLoc, destLoc } = req.body;
        axios.post(`https://maps.googleapis.com/maps/api/directions/json?origin=${myLoc.lat},${myLoc.lng}&destination=${destLoc.lat},${destLoc.lng}&key=${process.env.googleMapKey}`)
            .then(response => {
                if (response.data.routes[0].legs[0].distance.text)
                    res.send({ distance: response.data.routes[0].legs[0].distance.text })
                else
                    res.send({ distance: null })
            })
            .catch(err => {
                console.log(err)
                res.send({ distance: null })
            })
    },
    getProduct: async (req, res) => {
        let { p_id, t_id } = url.parse(req.url, true).query;
        const t_params = {
            TableName: "Deal_Transactions",
            FilterExpression: "transaction_id = :t",
            ExpressionAttributeValues: { ":t": t_id }
        }
        const p_params = {
            TableName: "Shopify_Products",
            FilterExpression: "global_id = :p",
            ExpressionAttributeValues: { ":p": p_id }
        }
        let awsTransReq = await docClient.scan(t_params);
        let tResult = await awsTransReq.promise();
        let awsProdReq = await docClient.scan(p_params);
        let pResult = await awsProdReq.promise();
        res.send({ product: pResult.Items[0], transaction: tResult.Items[0] })
    },
    redeemTransaction: async (req, res) => {
        let { t_id, time, id, shop } = req.body;

        const checkTransaction = {
            TableName: 'Deal_Transactions',
            FilterExpression: 'transaction_id = :t',
            ExpressionAttributeValues: { ':t': t_id }
        }
        docClient.scan(checkTransaction, async (err, data) => {
            if (err) res.status(500).send({ redeemed: false })
            let transaction = data.Items[0]
            if (!transaction.time_redeemed) {
                const params = {
                    TableName: 'Deal_Transactions',
                    Key: { 'transaction_id': t_id },
                    UpdateExpression: 'set time_redeemed = :t',
                    ExpressionAttributeValues: { ':t': time }
                }
                let awsReq = await docClient.update(params)
                let awsRes = await awsReq.promise()
                const p_params = {
                    TableName: 'Shopify_Products',
                    Key: { 'id': id, 'shopOrigin': shop },
                    UpdateExpression: 'set redeemedTotal = redeemedTotal + :O',
                    ExpressionAttributeValues: { ':O': 1 }
                }
                let awsProd = await docClient.update(p_params)
                awsRes = await awsProd.promise()
                res.send({ redeemed: true })
            } else {
                res.send({ redeemed: false })
            }
        })
    },
    uploadReview: (req, res) => {
        let { stars, review, t_id } = req.body;
        const params = {
            TableName: 'Deal_Transactions',
            Key: { 'transaction_id': t_id },
            UpdateExpression: 'set rating = :s, review = :r',
            ExpressionAttributeValues: { ':s': stars, ':r': review }
        }
        docClient.update(params, (err, data) => {
            if (err) res.send({ error: err })
            else res.send({ error: null })
        })
    },
    sendEmail: async (req, res) => {
        let { email, code, vendor } = req.body;
        const msg = {
            to: email, from: 'ScottsDeal@offerware.co',
            subject: `Verification Code to Redeem Voucher`,
            text: `Your verification code for ${vendor} is: ${code}. \n\nAll The Best, \n\nThe ScottsDeal Team`
        }
        let resMail = await sgMail.send(msg)
        res.send(true)
    }
    // getOffer: async (req, res) => {
    //     let { id } = url.parse(req.url, true).query;
    //     const params = {
    //         TableName: "Deal_Merchants",
    //         FilterExpression: "merchant_id = :m",
    //         ExpressionAttributeValues: { ':m': id }
    //     }
    //     docClient.scan(params, (err, data) => {
    //         if (err) res.send({ error: err, data: null })
    //         else res.send({ error: null, data: data.Items[0] })
    //     })
    // },
    // webhook: async (req, res) => {
    //     //Get Checkout Session object from Stripe Webhook
    //     //Get transaction ID from Session Object success url
    //     let email = "me@you.com";
    //     let transaction_id = short.generate(); //Get From Session Object
    //     const params = {
    //         TableName: 'Deal_Transactions',
    //         Key: { 'transaction_id': transaction_id },
    //         UpdateExpression: 'set email = :e, redeemed = :r, time_purchased = :t',
    //         ExpressionAttributeValues: { ':e': email, ":r": 1, ":t": Date.now() }
    //     }
    //     docClient.update(params, (err, data) => {
    //         if (err) res.send({ received: false })
    //         else res.send({ received: true })
    //     })
    // },
    // initiateStripe: async (req, res) => {
    //     const { merchant_id, stripe_id } = req.body;
    //     console.log(merchant_id, stripe_id, " IN HERE")
    //     let transaction_id = short.generate();
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types: ['card'],
    //         line_items: [{
    //             name: "Cucumber from Roger's Farm",
    //             amount: 200,
    //             currency: 'usd',
    //             quantity: 1,
    //         }],
    //         payment_intent_data: {
    //             application_fee_amount: 100,
    //         },
    //         success_url: `https://example.com/success`,
    //         // success_url: `https://re.offerware.co/${merchant_id}/${transaction_id}/{{CHECKOUT_SESSION_ID}}/success`,
    //         cancel_url: `https://example.com/cancel`,
    //         // cancel_url: `https://re.offerware.co/cancel`,
    //     }, {
    //         stripeAccount: stripe_id,
    //     })
    //     console.log(session)
    //     res.send({ data: session })
    // },
    // //TEST SIMULATION STRIPE PURCHASE
    // fakeStripe: async (req, res) => {
    //     const { merchant_id, stripe_id, option } = req.body;
    //     let transaction_id = short.generate();
    //     let v_code = Date.now().toString()
    //     const params = {
    //         TableName: "Deal_Transactions",
    //         Item: {
    //             transaction_id, merchant_id,
    //             option_name: option.offerDescription,
    //             option_id: option.id, rating: null, review: null,
    //             v_code: v_code.substring(v_code.length - 5),
    //             session_id: "{{SESSION_ID}}", email: null,
    //             time_purchased: null, //Wait until purchase is successful to log
    //             time_redeemed: null,
    //             redeemed: 0, // 0 == Initialized, 1 == Purchased, 2 == Redeemed
    //             amount: option.offerPrice
    //         }
    //     }
    //     docClient.put(params, (err, data) => {
    //         if (err) {
    //             res.json({ error: err, data: null })
    //         } else {
    //             res.json({ error: null, data: "{{SESSION_ID}}" })
    //         }
    //     })
    // },
}