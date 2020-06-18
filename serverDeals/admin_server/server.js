const express = require("express")
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
const router = express.Router();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use('/', router);

require('./routes.js')(app);

/** start server */
app.listen(4000, () => {
    console.log("Server started at port: 4000");
});