const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");

router.use("/register", registerRoute);
router.use("/login", loginRoute);

//TEST
const authenticate = require("./../middleware/authenticate");
router.get("/private", authenticate, function(req, res, next) {
  res.status(200);
  res.json({id: req.decodedToken.id});
});
//TEST

module.exports = router;