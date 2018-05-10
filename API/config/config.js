const config = {
  port: process.env.PORT || 3000,
  database: {
    host: "localhost",
    user: "jam_buds_admin",
    password: "jam_buds_secret123",
    database: "jam_buds",
    port: 3306
  }
};

module.exports = config;