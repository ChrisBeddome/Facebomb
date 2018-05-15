const fetch = require("node-fetch");
const config = require("./../config/config");

const login = () => {
  const clientID = config.spotify.clientID;
  const clientSecret = config.spotify.clientSecret;
  const clientInfo = `${clientID}:${clientSecret}`;
  const buff = new Buffer(clientInfo);
  const base64ClientInfo = buff.toString('base64');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${base64ClientInfo}`
  }

  const body = "grant_type=client_credentials";

  const settings = {
    method: "POST",
    headers: headers,
    body: body,
    mode: "cors",
    cache: "default"
  }

  const request = "https://accounts.spotify.com/api/token";

  return new Promise((resolve, reject) => {
    fetch(request, settings).then(res => res.json())
      .then(body => {
        if (body.error) {
          reject(body);
        } else {
          resolve(body);
        }
      });
  });
}

const getArtists = (searchTerm) => {
  const clientID = config.spotify.clientID;
  const clientSecret = config.spotify.clientSecret;
  let token = config.spotify.token;

  return new Promise((resolve, reject) => {
    if (!token) {
      const error = new Error("Spotify access token not set");
      error.clientMessage = "Database error";
      error.status = 500;
      return reject(error);
    }

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const settings = {
      method: 'GET',
      headers: headers,
      mode: 'cors',
      cache: 'default'
    };

    var request = `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist&limit=15`;

    fetch(request, settings).then(res => res.json()).then(body => {
      if (body.error) {
        const error = new Error(body.error.message);
        error.clientMessage = "Database error";
        error.status = 500;
        return reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

module.exports.login = login;
module.exports.getArtists = getArtists;