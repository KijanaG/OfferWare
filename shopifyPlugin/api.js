const dotenv = require('dotenv');
const AWS = require('aws-sdk');
const sgMail = require('@sendgrid/mail');
const short = require('short-uuid');
const { HTML } = require('./html')
dotenv.config();
sgMail.setApiKey(process.env.sendGridKey);
AWS.config.update({ region: 'us-west-2' });
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports = {
    sendVoucherLink: async (shop, email, phone, title, variant_title, id, name) => {
        const p_params = {
            TableName: 'Shopify_Products',
            FilterExpression: 'shopOrigin = :shop and title = :t',
            ExpressionAttributeValues: { ':shop': shop, ':t': title }
        }
        let awsRequest = await docClient.scan(p_params);
        let result = await awsRequest.promise();
        if (result.Items.length > 0) {
            // console.log("Received Item")
            const transaction_id = short.generate();
            const v_code = Date.now().toString();
            let variantPurchased = null;
            for (let variant of result.Items[0].variants) {
                if (variant.title == variant_title) {
                    variantPurchased = variant
                    variantPurchased.variant_title = variant_title;
                    variantPurchased.title = title
                }
            }
            //Get variant from variant array & add to transaction
            const t_params = {
                TableName: 'Deal_Transactions',
                Item: {
                    transaction_id, order_id: id, email, shopOrigin: shop,
                    ...variantPurchased, time_purchased: Date.now(),
                    v_code: v_code.substring(v_code.length - 5),
                    time_redeemed: null, rating: null, review: null,
                    vendor: result.Items[0].global_id
                }
            }
            awsRequest = await docClient.put(t_params);
            let res = await awsRequest.promise();
            if (Object.keys(res).length > 0) return
            let link = `"https://scottsdeal.offerware.co/redeem/${transaction_id}/${result.Items[0].global_id}"`
            if (!name) name = "Here it is";
            if (email) {
                let sendEmail = HTML.replace('{{LINK}}', link)
                sendEmail = sendEmail.replace('{{EMAIL}}', result.Items[0].email)
                const msg = {
                    to: email, from: 'ScottsDeal@offerware.co',
                    subject: `${name}, your voucher link for: ${variant_title}.`,
                    html: sendEmail,
                }
                let resMail = await sgMail.send(msg)
            } else {
                await client.messages
                    .create({
                        body: `${name}, your voucher for ${variant_title}: ${link}. Enjoy! \nThe ScottsDeal Team`,
                        from: '+14806133029',
                        to: phone
                    })
                    .then(message => console.log(message.sid))
            }

            const addParams = {
                TableName: 'Shopify_Products',
                Key: { 'id': result.Items[0].id, "shopOrigin": shop },
                UpdateExpression: "set transactionTotal = transactionTotal + :p",
                ExpressionAttributeValues: { ":p": 1 },
            }
            let awsUpdate = await docClient.update(addParams)
            let awsUpdateRes = await awsUpdate.promise();
        }
        return
    },
}
