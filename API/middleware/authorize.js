const checkIdMatchesToken = (req, res, next) => {
  if (Number(req.params.userID) !== req.decodedToken.id) {
    const error = new Error("unauthorized");
    error.clientMessage = "unauthorized";
    error.status = 401;
    return next(error);
  } else {
    next();
  }
};

module.exports.checkIdMatchesToken = checkIdMatchesToken;