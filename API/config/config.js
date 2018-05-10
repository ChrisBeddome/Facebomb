const config = {
  port: process.env.PORT || 3000,
  database: {
    host: "localhost",
    user: "facebomb_admin",
    password: "facebomb_secret123",
    database: "facebomb",
    port: 3306
  }
};

module.exports = config;