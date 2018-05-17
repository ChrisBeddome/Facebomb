const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const helpers = require("./../services/helpers")

const authenticateUser = (req, res, next) => {
  // check header for token
  let token = req.headers["authorization"] || null

  // decode token
  if (token) {

    //extract token from header
    token = helpers.extractBearerToken(token);

    // verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function (err, decoded) {
      if (err) {
        let error;
        if (err.name === "TokenExpiredError") {
          error = new Error("token expired")
          error.status = 401;
          error.clientMessage = "token expired";
        } else {
          error = new Error("failed to authenticate")
          error.status = 401;
          error.clientMessage = "failed to authenticate";
        }
        next(error);
      } else {
        // if everything is good, save to request object
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    // if there is no token, return error
    const error = new Error("No token provided")
    error.status = 401;
    error.clientMessage = "No token provided";
    next(error);
  }
}

module.exports = authenticateUser;