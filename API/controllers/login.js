const usersModel = require("./../models/users");

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //check credentials
    let user = await usersModel.authenticateUser(email, password);

    //send back user data of logged in user
    res.status(201);
    res.json({
      message: "login successful",
      data: {
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