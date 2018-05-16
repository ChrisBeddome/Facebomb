const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");
const authenticate = require("./../middleware/authenticate");
const validate = require("./../middleware/validate");

router.get("/:userID", usersController.getUserInfo);
router.patch("/:userID", authenticate, validate.updateUser, usersController.updateUserInfo);

module.exports = router;