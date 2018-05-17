const extractBearerToken = (token) => {
  if (token.charAt(0) === "B") {
    return token.split("Bearer ").join("");
  } else {
    return token.split("bearer ").join("");
  }
};

const capitalize = (string) => {
  let result = string.split(" ").map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");

  return result;
};

module.exports.extractBearerToken = extractBearerToken;
module.exports.capitalize = capitalize;

