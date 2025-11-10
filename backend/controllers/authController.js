// controllers/authController.js
import db from "../db.js";
import bcrypt from "bcryptjs";

export const registerUser = (req, res) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length > 0) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (firstName, lastName, phone, email, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, phone, email, hashedPassword],
      (err) => {
        if (err) return res.status(500).json({ message: "Failed to register user" });
        res.status(201).json({ message: "User registered successfully" });
      }
    );
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (result.length === 0) return res.status(401).json({ message: "User not found" });

    const user = result[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", user });
  });
};
