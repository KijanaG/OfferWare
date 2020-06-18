const api = require('./api');

module.exports = (app) => {
    app.post('/newClient', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.createAccountHolder(req, res);
    })
    app.post('/newMerchant', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.createMerchantAccount(req, res);
    })
    app.get('/getClient', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.getClient(req, res);
    })
    app.post('/verify_current_user/vhmpZ3Xkzb/Jt80KVQOcq/G5pVlJa3yz/PywvIYwa56', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.createToken(req, res);
    })
    app.post('/verify/current/token', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.verifyCurrentToken(req, res);
    })
    app.post('/connect/stripe/account', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.setStripeAccountID(req, res);
    })
    app.post('/upload/merchant/data', verifyToken, (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.uploadMerchantData(req, res);
    })
    app.post('/verify/merchant', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', true);
        api.verifyMerchantEmail(req, res);
    })
}

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        console.log("SUCCESS VERIFYING")
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        console.log("ERROR VERIFYING")
        res.status(403).send("Forbidden 403")
    }
}

