const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");
const artistsRoute = require("./artists");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/artists", artistsRoute);

//TEST
const authenticate = require("./../middleware/authenticate");
router.get("/private", authenticate, function(req, res, next) {
  res.status(200);
  res.json({id: req.decodedToken.id});
});
//TEST

module.exports = router;