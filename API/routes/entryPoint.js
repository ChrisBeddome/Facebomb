const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");
const artistsRoute = require("./artists");
const usersRoute = require("./users");

router.use("/register", registerRoute);
router.use("/login", loginRoute);
router.use("/artists", artistsRoute);
router.use("/users", usersRoute);

//TEST
const authenticate = require("./../middleware/authenticate");
router.get("/private", authenticate, function(req, res, next) {
  res.status(200);
  res.json({id: req.decodedToken.id});
});
//TEST

module.exports = router;