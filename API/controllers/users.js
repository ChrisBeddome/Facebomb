const usersModel = require("./../models/users");
const countries = require("./../services/countries");

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
      if (key === "jamSpace") {
        obj.key = "jam_space";
      } else {
        obj.key = key.toLowerCase();
      }
      if (obj.key === "jam_space") {
        obj.value = params[key] ? 0 : 1;
      }
      obj.value = params[key];
      filteredParams.push(obj);
    }
  }

  //if user supplied province but no country, we must check that the province provided exists within the country stored in database
  //if user supplied both province and country, we must check that the province exists within the country provided
  if (filteredParams.map(param => param.key).includes("province") && filteredParams.find(param => param.key === "province").value !== null) {
    let prov = filteredParams.find(param => param.key === "province").value;

    if (!filteredParams.map(param => param.key).includes("country")) {
      try {
        const user = await usersModel.getUser({ id: userID });

        if (!user) {
          const error = new Error("user not found");
          error.clientMessage = "user not found";
          error.status = 400;
          return next(error);
        }

        if (!countries.checkProvInCountry(prov, user.country)) {
          const error = new Error("province country mismatch");
          error.clientMessage = "province not found within country stored";
          error.status = 400;
          return next(error);
        }

      } catch (error) {
        console.log(error);
        let err = new Error("database error");
        err.clientMessage = "database error";
        err.status = 400;
        return next(err);
      }

    } else {
      let countryCode = filteredParams.find(param => param.key === "country").value;
      if (countryCode !== null && !countries.checkProvInCountry(prov, countryCode)) {
        const error = new Error("province country mismatch");
        error.clientMessage = "province not found within country provided";
        error.status = 400;
        return next(error);
      }
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