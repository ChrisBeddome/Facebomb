const countries = require("./../services/countries");

const newUser = (req, res, next) => {
  const { email, username, password } = req.body;

  const errorMessage = checkEmail(email) || checkUsername(username) || checkPassword(password);

  if (errorMessage) {
    const error = new Error("registration credentials invalid");
    error.clientMessage = errorMessage;
    error.status = 400;
    next(error);
  } else {
    next();
  }
};

const updateUser = (req, res, next) => {
  const { city, province, country, bio, jamSpace } = req.body;

  //values can be null, but at least one must be defined
  if (typeof(city) === "undefined" && typeof(province) === "undefined" && typeof(country) === "undefined" && typeof(bio) === "undefined" && typeof(city) === "undefined") {
    const error = new Error("No valid update parameters provided");
    error.clientMessage = "No valid update parameters provided";
    error.status = 400;
    next(error);
  }

  let errorMessage = null;

  if (typeof(city) !== "undefined" && !errorMessage) {
    errorMessage = checkCity(city);
  }
  if (typeof(province) !== "undefined" && !errorMessage) {
    errorMessage = checkProvince(province);
  }
  if (typeof(country) !== "undefined" && !errorMessage) {
    errorMessage = checkCountry(country);
  }
  if (typeof(bio) !== "undefined" && !errorMessage) {
    errorMessage = checkBio(bio);
  }
  if (typeof(city) !== "undefined" && !errorMessage) {
    errorMessage = checkJamSpace(jamSpace);
  }

  if (errorMessage) {
    const error = new Error("one or more update parameters invalid");
    error.clientMessage = errorMessage;
    error.status = 400;
    next(error);
  } else {
    next();
  }
};

//helper functions

function checkEmail(email) {
  if (!email) {
    return "must provide valid email";
  }

  if (email.length > 255) {
    return "email too long";
  }

  if (email.length < 5) {
    return "email too short";
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return "email incorrectly formatted";
  }

  return null;
}

function checkPassword(password) {
  if (!password) {
    return "must provide password";
  }

  if (password.length > 255) {
    return "password too long";
  }

  if (password.length < 5) {
    return "password must be at least 6 characters";
  }

  return null;
}

function checkUsername(username) {
  if (!username) {
    return "must provide username";
  }

  if (username.length > 255) {
    return "username too long";
  }

  if (username.length < 3) {
    return "username must be at least 3 characters";
  }

  return null;
}

function checkCity(city) {
  if (city === null) {
    return null;
  }

  if (city.length > 255) {
    return "city too long";
  }

  if (city.length < 2) {
    return "city must be at least 2 characters";
  }

  return null;
}

function checkProvince(province) {
  if (province === null) {
    return null;
  }

  if (province.length > 255) {
    return "province too long";
  }

  if (province.length < 2) {
    return "province must be at least 2 characters";
  }

  return null;
}

function checkCountry(country) {
  if (country === null) {
    return null;
  }

  if (country.length !== 2) {
    return "country must be valid 2-letter IS02 code";
  }

  if (!countries.checkCountryExists(country)) {
    return "country must be valid 2-letter IS02 code";
  }

  return null;
}

function checkBio(bio) {
  if (bio === null) {
    return null;
  }

  if (bio.length > 255) {
    return "bio too long";
  }

  if (bio.length < 10) {
    return "bio must be at least 10 characters";
  }

  return null;
}

function checkJamSpace(jamSpace) {
  if (typeof jamSpace !== "boolean") {
    return "jamSpace must be boolean value";
  }

  return null;
}

module.exports.newUser = newUser;
module.exports.updateUser = updateUser;