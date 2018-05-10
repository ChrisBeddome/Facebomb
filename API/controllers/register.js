const db = require("./../services/db");
const usersModel = require("./../models/users");

const registerNewUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    //check if email or username is  already in use
    let emailResponse = await usersModel.getUser({ email });
    let usernameResponse = await usersModel.getUser({ username })
    
    if (emailResponse.length > 0 || usernameResponse.length > 0) {
      const error = emailResponse.length > 0 ? new Error("Email already in use") : new Error("Username already in use");
      error.clientMessage = emailResponse.length > 0 ? "Email already in use" : "Username already in use";
      error.status = 400;
      next(error);
    } else {
      response = await usersModel.insertUser(email, username, password);
      let userInfo = await usersModel.getUser({ id: response.insertId });
      userInfo = userInfo[0];
      res.status(201);
      res.json({
        message: "User registered",
        data: {
          id: userInfo.id,
          email: userInfo.email,
          username: userInfo.username
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.registerNewUser = registerNewUser;