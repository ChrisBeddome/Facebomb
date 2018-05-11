const usersModel = require("./../models/users");

const registerNewUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    //check if email or username is  already in use
    let emailResponse = await usersModel.getUser({ email });
    let usernameResponse = await usersModel.getUser({ username });

    if (emailResponse || usernameResponse) {
      const error = emailResponse ? new Error("Email already in use") : new Error("Username already in use");
      error.clientMessage = emailResponse ? "Email already in use" : "Username already in use";
      error.status = 400;
      next(error);
    } else {
      //insert user into database
      let response = await usersModel.insertUser(email, username, password);

      //get users information and return success message to client
      const userInfo = await usersModel.getUser({ id: response.insertId });
      res.status(201);
      res.json({
        success: true,
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