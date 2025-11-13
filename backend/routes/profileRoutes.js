// routes/profileRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [users] = await db.execute(
      "SELECT id, firstName, lastName, email, phone, address_line1, address_line2, city, state, zip_code, country FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(users[0]);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update user profile and address
router.put("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, phone, address_line1, address_line2, city, state, zip_code, country } = req.body;

    // Check if user exists
    const [users] = await db.execute("SELECT id FROM users WHERE id = ?", [userId]);
    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile
    await db.execute(
      `UPDATE users 
       SET firstName = ?, lastName = ?, phone = ?, address_line1 = ?, address_line2 = ?, city = ?, state = ?, zip_code = ?, country = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [firstName, lastName, phone, address_line1, address_line2, city, state, zip_code, country, userId]
    );

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;