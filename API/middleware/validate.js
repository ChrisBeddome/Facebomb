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


module.exports.newUser = newUser;