const fs = require('fs');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
var docClient = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');
var jwt = require('jsonwebtoken');
const url = require('url');
const options = {
    key: fs.readFileSync("./jwtRS256.key", "utf8"),
    cert: fs.readFileSync("./jwtRS256.key.pub", "utf8")
}
// const process = require('process');
const config = require('./config').config;
const stripe = require('stripe')(config.stripeKey);
// setInterval(() => {
//     module.exports.helloThere()
// }, 3000)
// const used = process.memoryUsage().heapUsed / 1024 / 1024;
// console.log(`The script uses approximately ${used} MB`);

module.exports = {
    // helloThere: () => {
    //     console.log("HEELLOOO THERE")
    // },
    createAccountHolder: (req, res) => {
        // console.log("CREATING CLIENT")
        jwt.verify(req.token, options.cert, { audience: "deal_admin", issuer: "deal_cert" }, (err, authData) => {
            if (err) {
                res.status(403).send("Forbidden 403");
            } else {
                let { email, id, user } = req.body;
                const params = {
                    TableName: "Deal_Clients",
                    Item: {
                        email: email,
                        client_id: id,
                        name: `${user.firstName}` + ' ' + `${user.lastName}`,
                        created_At: Date.now(),
                        admin: true,
                        stripe: true,
                        merchant_id: null,
                        phoneNumber: null
                    }
                };
                docClient.put(params, (err, data) => {
                    if (err) {
                        res.json({ error: true, error: err, data: data })
                    } else {
                        res.json({ error: false, data: params['Item'] })
                    }
                })
            }
        })
    },
    createMerchantAccount: (req, res) => {
        // console.log("CREATING MERCHANT")
        jwt.verify(req.token, options.cert, { audience: "deal_admin", issuer: "deal_cert" }, (err, authData) => {
            if (err) {
                res.status(403).send("Forbidden 403");
            } else {
                let { email, client_id, contactName, phoneNumber, merchant_id } = req.body;
                const params = {
                    TableName: "Deal_Clients",
                    Item: {
                        email,
                        client_id,
                        stripe: false,
                        name: contactName,
                        merchant_id,
                        phoneNumber,
                        created_At: Date.now(),
                        admin: false
                    }
                };
                docClient.put(params, (err, data) => {
                    if (err) {
                        res.json({ error: err, data: data })
                    } else {
                        res.json({ error: null, data: params['Item'] })
                    }
                })
            }
        })
    },
    getClient: (req, res) => {
        // console.log("GETTING CLIENT")
        let { id } = url.parse(req.url, true).query;
        jwt.verify(req.token, options.cert, { audience: "deal_admin", issuer: "deal_cert" }, (err, authData) => {
            if (err) {
                res.status(403).send("Forbidden 403")
            } else {
                const params = {
                    TableName: "Deal_Clients",
                    FilterExpression: "email = :email",
                    ExpressionAttributeValues: { ':email': id }
                }
                docClient.scan(params, (err, data) => {
                    if (err) {
                        res.send({ error: err, data: null })
                    } else {
                        res.send({ error: false, data: data.Items[0] })
                    }
                })
            }
        })
    },
    verifyMerchantEmail: (req, res) => { //Check DB during registration of merchant to see if email exists
        let { email, id } = req.body;
        const params = {
            TableName: "Deal_Merchants",
            FilterExpression: "merchant_id = :merchant_id",
            ExpressionAttributeValues: { ':merchant_id': id }
        }
        docClient.scan(params, (err, data) => {
            if (err) {
                res.send({ error: err, data: null })
            } else {
                console.log(data)
                let merchant = { ...data.Items[0] };
                let privateInfo = merchant.privateInfo;
                if (privateInfo && email == privateInfo.email && !merchant.verified) {
                    res.send({ error: null, data: privateInfo })
                } else {
                    res.send({ error: "Wrong Email", data: null })
                }
            }
        })
    },
    setStripeAccountID: async (req, res) => {
        let { merchant_id, created_At, stripe_code, email } = req.body;
        const response = await stripe.oauth.token({
            grant_type: 'authorization_code',
            code: stripe_code,
        });
        var connected_account_id = response.stripe_user_id;
        console.log(connected_account_id)
        jwt.verify(req.token, options.cert, { audience: 'deal_admin', issuer: 'deal_cert' }, (err, authData) => {
            const params = {
                TableName: "Deal_Merchants",
                Key: { 'merchant_id': merchant_id },
                UpdateExpression: 'set stripe_id = :s, verified = :v',
                ExpressionAttributeValues: { ':s': connected_account_id, ':v': true }
            }
            docClient.update(params, (err, data) => {
                if (err) {
                    res.send({ error: err, data: null })
                } else {
                    const clientParams = {
                        TableName: "Deal_Clients",
                        Key: { 'email': email, "created_At": created_At },
                        UpdateExpression: 'set stripe = :s',
                        ExpressionAttributeValues: { ':s': true }
                    }
                    docClient.update(clientParams, (err, data) => {
                        if (err) res.send({ error: err, data: null })
                        else res.send({ error: null, data: connected_account_id })
                    })
                }
            })
        })
    },
    uploadMerchantData: (req, res) => {
        // console.log("UPLOADING MERCHANT DATA FORM")
        jwt.verify(req.token, options.cert, { audience: "deal_admin", issuer: "deal_cert" }, (err, authData) => {
            if (err) {
                res.status(403).send("Forbidden 403")
            } else {
                let merchant_id = uuid.v4();
                let { name, contactInfo, location, offers, photos, dealDescription, merchantDescription } = req.body;
                const params = {
                    TableName: "Deal_Merchants",
                    Item: {
                        name,
                        merchant_id,
                        verified: false,
                        privateInfo: contactInfo,
                        location,
                        stripe_id: null,
                        offers,
                        photos,
                        dealDescription,
                        merchantDescription
                    }
                }
                docClient.put(params, (err, data) => {
                    if (err) {
                        res.json({ error: err, data: null })
                    } else {
                        res.json({ error: null, data: merchant_id })
                    }
                })
            }
        })
    },
    createToken: (req, res) => {
        jwt.sign({ user: req.body.user, id: req.body.id },
            options.key, {
            algorithm: "RS256", issuer: "deal_cert",
            audience: "deal_admin", expiresIn: '33d'
        }, (err, token) => {
            if (err) {
                res.send({ error: err, token: null })
            } else {
                res.send({ error: null, token: token });
            }
        })
    },
    verifyCurrentToken: (req, res) => {
        jwt.verify(req.token, options.cert, {
            audience: "deal_admin", issuer: "deal_cert"
        }, (err, authData) => {
            if (err) {
                res.status(403).send("Forbidden 403")
            } else {
                res.send(true)
            }
        })
    },
}
