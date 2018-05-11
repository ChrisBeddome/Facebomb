const config = {
  port: process.env.PORT || 3000,
  jwtSecret: "%g*se#$gjS/.T;w$kgWk))i58hSFm>S?e",
  database: {
    host: "localhost",
    user: "jam_buds_admin",
    password: "jam_buds_secret123",
    database: "jam_buds",
    port: 3306
  }
};

module.exports = config;