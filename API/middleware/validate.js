const newUser = (req, res, next) => {
  const {email, password, firstName, lastName} = req.body;
  
  const errorMessage = checkEmail(email) || checkPassword(password) || checkFirstName(firstName) || checkLastName(lastName);

  if (errorMessage) {
    const error = new Error(errorMessage);
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

function checkFirstName(name) {
  if (!name) {
    return "must provide first name";
  }

  if (name.length > 255) {
    return "first name too long";
  }

  return null;
}

function checkLastName(name) {
  if (!name) {
    return "must provide last name";
  }

  if (name.length > 255) {
    return "last name too long";
  }

  return null;
}

module.exports.newUser = newUser;