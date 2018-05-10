const db = require("./../services/db");
const helpers = require("./../services/helpers");

const getUser = (criteria) => {
  const conn = new db();
  const key = Object.keys(criteria)[0];
  const value = criteria[key];

  const sql = `SELECT id, email, username FROM users WHERE ${key} = ?`;
  const values = [value];

  acceptableCriteria = ["email", "username", "id"];
  
  return new Promise(async (resolve, reject) => {

    if (!acceptableCriteria.includes(key)) {
      const error = new Error("Unnacceptable search criteria");
      error.clientMessage = "Unnacceptable search criteria";
      error.status = 400;
      reject(error);
    }

    try {
      const response = await conn.query(sql, values);
      resolve(response);
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 400;
      reject(error);
    }
  
    conn.close();
  });  
}

const insertUser = (email, username, password) => {
  const conn = new db();
  const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";
  const values = [email, username, password];

  return new Promise(async (resolve, reject) => {
    try {
      const response = await conn.query(sql, values);
      resolve(response);
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 400;
      reject(error);
    }
  
    conn.close();
  });
};

module.exports.insertUser = insertUser;
module.exports.getUser = getUser;