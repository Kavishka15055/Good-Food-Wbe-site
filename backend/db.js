// db.js
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "good_food",
});

console.log("✅ Connected to MySQL database");

export default db;
