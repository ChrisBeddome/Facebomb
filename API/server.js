const http = require("http");
const app = require("./app");
const config = require("./config/config");
const spotify = require("./services/spotify");

spotify.login().then(res => {
  config.spotify.setToken(res.access_token);
}).catch(res => {
  console.log("Error connecting to spotify");
  console.log(res);
});

const server = http.createServer(app);
server.listen(config.port);