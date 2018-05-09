const express = require("express");
const router = express.Router();
const testController = require("./../controllers/test");

router.get("/", testController.testRoute);
router.get("/test2", testController.testRoute2);
router.get("/test2/:testID", testController.testRouteParam);

module.exports = router;