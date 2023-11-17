require('dotenv').config();
const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.PASS,
  })
  .promise();

module.exports = pool;
