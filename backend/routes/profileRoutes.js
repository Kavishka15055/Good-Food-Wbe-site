// routes/profileRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [users] = await db.execute(
      "SELECT id, firstName, lastName, email, phone, address_line1, address_line2, city, state, zip_code, country, created_at FROM users WHERE id = ?",
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

// Get user statistics - MAKE SURE THIS ROUTE EXISTS
router.get("/:userId/stats", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("📊 Fetching stats for user:", userId); // Debug log
    
    // Get user info with created_at
    const [users] = await db.execute(
      "SELECT id, firstName, lastName, email, phone, created_at FROM users WHERE id = ?",
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if orders table exists and get order count
    let orderCount = 0;
    let totalSpent = 0;

    try {
      // Get order count
      const [orderCountResult] = await db.execute(
        "SELECT COUNT(*) as order_count FROM orders WHERE user_id = ?",
        [userId]
      );
      orderCount = orderCountResult[0].order_count;

      // Get total spent
      const [totalSpentResult] = await db.execute(
        "SELECT COALESCE(SUM(total_amount), 0) as total_spent FROM orders WHERE user_id = ? AND status != 'cancelled'",
        [userId]
      );
      totalSpent = totalSpentResult[0].total_spent;
    } catch (tableError) {
      console.log("Orders table might not exist, using default values");
      // If orders table doesn't exist, use default values
      orderCount = 0;
      totalSpent = 0;
    }

    res.json({
      user: users[0],
      stats: {
        orderCount: orderCount,
        totalSpent: totalSpent,
        memberSince: users[0].created_at
      }
    });
  } catch (err) {
    console.error("Get user stats error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;