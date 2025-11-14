// db.js
import mysql from "mysql2/promise";

// Create connection pool instead of single connection
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "good_food",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log("✅ Connected to MySQL database with connection pool");

// Test the connection
db.getConnection()
  .then(connection => {
    console.log("✅ Database connection successful");
    connection.release();
  })
  .catch(err => {
    console.error("❌ Database connection failed:", err);
  });

export default db;