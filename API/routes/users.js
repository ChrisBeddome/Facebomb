const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");
const authenticate = require("./../middleware/authenticate");

router.get("/:userID", usersController.getUserInfo);
router.patch("/:userID", authenticate, usersController.updateUserInfo);

module.exports = router;