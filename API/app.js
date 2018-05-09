const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");

//logging
app.use(morgan("dev"));

//parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//error handling
app.use(errorHandler.generateNotFoundError); //only called if error not thrown elsewhere
app.use(errorHandler.logError);
app.use(errorHandler.sendError);

module.exports = app;