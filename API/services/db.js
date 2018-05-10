const mysql = require("mysql");
const config = require("./../config/config");

class Database {
  constructor() {
    this.connection = mysql.createConnection(config.database);
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (error, response) => {
        if (error)
          return reject(error);
        resolve(response);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(error => {
        if (error)
          return reject(error);
        resolve();
      });
    });
  }
}

module.exports = Database;