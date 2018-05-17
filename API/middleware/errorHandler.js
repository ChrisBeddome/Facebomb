const generateNotFoundError = (req, res, next) => {
  const error = new Error("Not found");
  error.clientMessage = "Not Found";
  error.status = 404;
  next(error);
};

const logError = (error, req, res, next) => {
  console.log(error);
  next(error);
};

const sendError = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    error: error.clientMessage || "Internal server error"
  });
};

module.exports.generateNotFoundError = generateNotFoundError;
module.exports.logError = logError;
module.exports.sendError = sendError;