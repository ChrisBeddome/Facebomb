const db = require("./../services/db");
const usersModel = require("./../models/users");

const registerNewUser = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    let response = await usersModel.getUser({email});
    if (response.length > 0) {
      const error = new Error("Email already in use");
      error.status = 400;
      next(error);
    } else {
      response = await usersModel.insertUser(email, password, firstName, lastName);
      let userInfo = await usersModel.getUser({id: response.insertId});
      userInfo = userInfo[0];
      res.status(201);
      res.json({
        id: userInfo.id,
        email: userInfo.email,
        firstName: userInfo.first_name,
        lastname: userInfo.last_name
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.registerNewUser = registerNewUser;