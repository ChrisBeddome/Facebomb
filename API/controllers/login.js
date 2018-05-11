const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const usersModel = require("./../models/users");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check credentials
    let user = await usersModel.authenticateUser(email, password);

    //generate json web token containing user id
    const payload = {
      id: user.id
    };
    let token = jwt.sign(payload, config.jwtSecret, {
      expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    //send back user data of logged in user
    res.status(200);
    res.json({
      success: true,
      message: "login successful",
      data: {
        token: token,
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = loginUser;