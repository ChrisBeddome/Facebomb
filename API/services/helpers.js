const extractBearerToken = (token) => {
  if (token.charAt(0) === "B") {
    return token.split("Bearer ", 1).join("");
  } else {
    return token.split("bearer ", 1).join("");
  }
};

module.exports.extractBearerToken = extractBearerToken;

