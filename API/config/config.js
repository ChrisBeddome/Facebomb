const config = {
  port: process.env.PORT || 3000,
  jwtSecret: "%g*se#$gjS/.T;w$kgWk))i58hSFm>S?e",
  database: {
    host: "localhost",
    user: "jam_mates_admin",
    password: "jam_mates_secret123",
    database: "jam_mates",
    port: 3306
  }
};

module.exports = config;