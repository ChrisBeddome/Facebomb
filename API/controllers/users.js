const usersModel = require("./../models/users");

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

    const {id, username, city, province, country, bio, jam_space, image_url} = user;

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

module.exports.getUserInfo = getUserInfo;