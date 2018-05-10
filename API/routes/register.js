const express = require("express");
const router = express.Router();
const registerController = require("./../controllers/register");
const validate = require("./../middleware/validate");

router.post("/", validate.newUser, registerController.registerNewUser);

module.exports = router;