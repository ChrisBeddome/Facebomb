const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const config = require("./config/config");
const errorHandler = require("./middleware/errorHandler");
const entryPoint = require("./routes/entryPoint");

//logging
app.use(morgan("dev"));

//parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//entry point to API
app.use("/", entryPoint);

//error handling
app.use(errorHandler.generateNotFoundError); //only called if error not thrown elsewhere
app.use(errorHandler.logError);
app.use(errorHandler.sendError);

module.exports = app;