const jwt = require("jsonwebtoken");
const config = require("./../config/config");

const authenticateUser = (req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.query.token || req.headers["authorization"];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.jwtSecret, function (error, decoded) {
      if (error) {
        const error = new Error("failed to authenticate")
        error.status = 400;
        error.clientMessage = "failed to authenticate";
        next(error);
      } else {
        // if everything is good, save to request for use in other routes
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