exports.testRoute = (req, res, next) => {
  res.json("test response");
};

exports.testRoute2 = (req, res, next) => {
  res.json("test response 2");
};

exports.testRouteParam = (req, res, next) => {
  res.json(req.params.testID);
};

