const http = require("http");
const app = require("./app");
const config = require("./config/config");
const spotify = require("./services/spotify");

spotify.login().then(res => {
  config.spotify.setToken(res.access_token);
  console.log("Spotify authentication successful")
}).catch(res => {
  console.log("Error connecting to spotify");
  console.log(res);
});

const server = http.createServer(app);
server.listen(config.port);
console.log(`Server started. Listening for requests on port ${config.port}...`)