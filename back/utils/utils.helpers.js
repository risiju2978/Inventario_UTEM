require("dotenv").config();
const mysql = require("mysql2");

// objeto de conexion
module.exports.db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
});
