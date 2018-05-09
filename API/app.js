const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const config = require("./config/config");

//logging
app.use(morgan("dev"));

//parsing
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

//error handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;