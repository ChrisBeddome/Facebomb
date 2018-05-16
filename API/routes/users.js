const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");

router.get("/:userID", usersController.getUserInfo);

module.exports = router;