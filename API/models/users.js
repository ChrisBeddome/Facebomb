const db = require("./../services/db");

const getUser = (criteria) => {
  const conn = new db();
  const key = Object.keys(criteria)[0];
  const value = criteria[key];

  const sql = `SELECT id, email, first_name, last_name FROM users WHERE ${key} = ?`;
  const values = [value];
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await conn.query(sql, values);
      resolve(response);
    } catch (e) {
      const error = new Error("Database error");
      error.status = 400;
      error.details = e;
      reject(error);
    }
  
    conn.close();
  });  
}

const insertUser = (email, password, firstName, lastName) => {
  const conn = new db();
  const sql = "INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)";
  const values = [email, password, firstName, lastName];
  
  return new Promise(async (resolve, reject) => {
    try {
      const response = await conn.query(sql, values);
      resolve(response);
    } catch (e) {
      const error = new Error("Database error");
      error.status = 400;
      error.details = e;
      reject(error);
    }
  
    conn.close();
  });
};

module.exports.insertUser = insertUser;
module.exports.getUser = getUser;