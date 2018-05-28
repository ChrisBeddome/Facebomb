const usersModel = require("./../models/users");
const countries = require("./../services/countries");
const helpers = require("./../services/helpers");

const getUserInfo = async (req, res, next) => {
  const userID = req.params.userID;

  try {
    const user = await usersModel.getUser({ id: userID });

    if (!user) {
      const error = new Error("user not found");
      error.clientMessage = "user not found";
      error.status = 400;
      return next(error);
    }

    const { id, username, city, province, country, bio, jam_space, image_url } = user;

    const data = {
      id,
      username,
      city,
      province,
      country,
      bio,
      jamSpace: jam_space ? true : false,
      imageURL: image_url
    };

    res.status(200);
    res.json({
      success: true,
      message: "search successful",
      data
    });
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  const userID = req.decodedToken.id;
  const params = req.body;

  const updatableParams = ["city", "province", "country", "bio", "jamSpace"];
  let filteredParams = [];

  //loop over params, filter out invalid params
  for (var key in params) {
    if (!params.hasOwnProperty(key)) {
      continue;
    }

    if (updatableParams.includes(key.toLowerCase())) {
      let obj = {};

      //cast API keys to match database keys
      if (key.toLowerCase() === "jamspace") {
        obj.key = "jam_space";
      } else {
        obj.key = key.toLowerCase();
      }
      //API accepts "true" and "false", database expects 0 or 1
      if (obj.key === "jam_space") {
        obj.value = params[key] ? 0 : 1;
      }
      else if (obj.key === "country") {
        obj.value = params[key].toUpperCase();
      }
      else if (obj.key === "province") {
        obj.value = params[key].toLowerCase();
      }
      else if (obj.key === "city") {
        obj.value = helpers.capitalize(params[key]);
      }
      else {
        obj.value = params[key];
      }
      filteredParams.push(obj);
    }
  }

  //attempt to update user
  try {
    const response = await usersModel.updateUser(userID, filteredParams);

    if (response.affectedRows < 1) {
      const error = new Error("error updating user");
      error.clientMessage = "database error";
      error.status = 500;
      return next(error);
    }

    //get info of updated user to send in response
    const user = await usersModel.getUser({ id: userID });

    if (!user) {
      const error = new Error("user not found");
      error.clientMessage = "user not found";
      error.status = 400;
      return next(error);
    }

    const { id, username, city, province, country, bio, jam_space, image_url } = user;

    const data = {
      id,
      username,
      city,
      province,
      country,
      bio,
      jamSpace: jam_space ? true : false,
      imageURL: image_url
    };

    res.status(200);
    res.json({
      success: true,
      message: "user updated",
      data
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserInfo = getUserInfo;
module.exports.updateUserInfo = updateUserInfo;