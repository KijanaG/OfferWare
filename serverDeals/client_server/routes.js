const api = require('./api');

module.exports = (app) => {
    app.get('/client/redemption/success', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.getProduct(req, res);
    })
    app.post('/client/google/places', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.googlePlaceSearch(req, res);
    })
    app.post('/client/directions', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.getDirections(req, res);
    })
    app.post('/client/redeem/transaction', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.redeemTransaction(req, res);
    })
    app.post('/client/ratings', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.uploadReview(req, res);
    })
    app.post('/client/mail/send', (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', 'https://scottsdeal.offerware.co')
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Credentials', false);
        api.sendEmail(req, res);
    })
}