const config = {
  port: process.env.PORT || 3000,
  jwtSecret: "%g*se#$gjS/.T;w$kgWk))i58hSFm>S?e",
  database: {
    host: "localhost",
    user: "jam_mates_admin",
    password: "jam_mates_secret123",
    database: "jam_mates",
    port: 3306
  },
  spotify: {
    clientID: "06bf86c905464b22b069b75b67c9c65d",
    clientSecret: "d72263d0fc2148ae935dc931b7624d68",
    token: null,

    setToken: function(token) {
      this.token = token;
    }
  }
};

module.exports = config;