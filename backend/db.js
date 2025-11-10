// db.js
import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",      // or your DB host
  user: "root",           // your MySQL username
  password: "",           // your MySQL password
  database: "good_food"     // your database name
});

db.connect((err) => {
  if (err) {
    console.log("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

export default db;
