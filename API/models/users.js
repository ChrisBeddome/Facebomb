const db = require("./../services/db");
const bcrypt = require("bcrypt");

const getUser = (criteria) => {
  const conn = new db();

  //get the key to be searched
  const key = Object.keys(criteria)[0];
  //get the value to be searched
  const value = criteria[key];

  const sql = `SELECT id, email, username, city, province, country, bio, jam_space, image_url FROM users WHERE ${key} = ?`;
  const values = [value];

  acceptableCriteria = ["email", "username", "id"];

  return new Promise(async (resolve, reject) => {
    if (!acceptableCriteria.includes(key)) {
      const error = new Error("Unnacceptable search criteria");
      error.clientMessage = "Unnacceptable search criteria";
      error.status = 400;
      conn.close();
      return reject(error);
    }

    try {
      const response = await conn.query(sql, values);
      const user = response.length > 0 ? response[0] : null;
      resolve(user);
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 500;
      reject(error);
    }
    conn.close();
  });
}

const insertUser = (email, username, password) => {
  const conn = new db();
  const sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)";

  return new Promise((resolve, reject) => {
    try {
      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) {
          const error = new Error(error.message);
          error.clientMessage = "Database error";
          error.status = 500;
          return reject(error);
        }
        const values = [email, username, hash];
        const response = await conn.query(sql, values);
        resolve(response);
        conn.close();
      });
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 500;
      reject(error);
      conn.close();
    }
  });
};

const updateUser = (id, params) => {

  const conn = new db();
  let sql = "UPDATE users SET ";

  params.forEach(param => {
    sql += `${param.key} = ?, `;
  });

  sql = sql.slice(0, sql.length - 2);
  sql += " WHERE id = ?";

  let values = params.map(param => param.value);
  values.push(id);

  return new Promise(async (resolve, reject) => {
    if (params.length < 1) {
      const error = new Error("Invalid update parameters");
      error.clientMessage = "Invalid update parameters";
      error.status = 400;
      conn.close();
      return reject(error);
    }

    try {
      const response = await conn.query(sql, values);
      resolve(response);
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 500;
      reject(error);
    }
    conn.close();
  });
};

const authenticateUser = (email, password) => {
  const conn = new db();
  const sql = "SELECT id, email, username, password FROM users WHERE email = ?";
  const values = [email];

  return new Promise(async (resolve, reject) => {
    try {
      const response = await conn.query(sql, values);

      //if no user is returned, email was incorrect
      if (response.length < 1) {
        const error = new Error("Invalid login credentials");
        error.clientMessage = "Invalid login credentials";
        error.status = 400;
        return reject(error);
      }

      const user = response[0];
      bcrypt.compare(password, user.password, (error, match) => {
        if (error) {
          const error = new Error(error.message);
          error.clientMessage = "Database error";
          error.status = 500;
          return reject(error);
        }

        if (match) {
          resolve(user);
        } else {
          //if passwords do not match
          const error = new Error("Invalid login credentials");
          error.clientMessage = "Invalid login credentials";
          error.status = 500;
          reject(error);
        }
      });
    } catch (e) {
      const error = new Error(e.sqlMessage);
      error.clientMessage = "Database error";
      error.status = 500;
      reject(error);
    }
  });
};

module.exports.insertUser = insertUser;
module.exports.getUser = getUser;
module.exports.updateUser = updateUser;
module.exports.authenticateUser = authenticateUser;
