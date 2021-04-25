var express = require('express')
const app = express()
const cookies = require("cookie-parser");

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookies());
require("./middleware/passport/index"); // load passport strategies

module.exports = app
