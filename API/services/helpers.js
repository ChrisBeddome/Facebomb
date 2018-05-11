const extractBearerToken = (token) => {
  if (token.charAt(0) === "B") {
    return token.split("Bearer ").join("");
  } else {
    return token.split("bearer ").join("");
  }
};

module.exports.extractBearerToken = extractBearerToken;

