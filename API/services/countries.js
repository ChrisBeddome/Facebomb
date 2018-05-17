const country = require("countryjs");

const checkCountryExists = (countryCode) => {
  return country.name(countryCode.toUpperCase(), "IS02") ? true : false;
}; 

const checkProvInCountry = (province, countryCode) => {
  const provinceList = country.provinces(countryCode.toUpperCase(), "IS02");

  if (!provinceList) {
    return false;
  }

  const provinceListLower = provinceList.map(prov => prov.toLowerCase());
  return provinceListLower.includes(province.toLowerCase()) ? true : false;
};

module.exports.checkCountryExists = checkCountryExists;
module.exports.checkProvInCountry = checkProvInCountry;