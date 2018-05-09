const express = require("express");
const router = express.Router();
const testRoute = require("./test");

router.use("/test", testRoute);

module.exports = router;