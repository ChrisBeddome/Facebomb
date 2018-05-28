const express = require("express");
const router = express.Router();
const usersController = require("./../controllers/users");
const authenticate = require("./../middleware/authenticate");
const authorize = require("./../middleware/authorize");
const validate = require("./../middleware/validate");

// / gets all data
// /info gets profile data
// /influences gets influences
// /gear gets gear
// /genres gets genres
// /instruments gets instruments
// /samples gets samples

router.get("/:userID", usersController.getUserAll);
router.get("/:userID/info", usersController.getUserInfo);
router.patch("/:userID/info", authenticate, authorize.checkIdMatchesToken, validate.updateUser, usersController.updateUserInfo);
router.get("/:userID/influences", usersController.getUserInfluences);
router.post("/:userID/influences", authenticate, authorize.checkIdMatchesToken, validate.addInfluence, usersController.addInfluence);
// router.delete("/:userID/influences/:influenceID", authenticate, authorize.checkIdMatchesToken, usersController.deleteInfluence);

module.exports = router;