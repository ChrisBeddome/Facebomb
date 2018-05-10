const express = require("express");
const router = express.Router();
const registerRoute = require("./register");
const loginRoute = require("./login");

router.use("/register", registerRoute);
router.use("/login", loginRoute);

module.exports = router;