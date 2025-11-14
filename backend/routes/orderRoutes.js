// routes/orderRoutes.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// Get user's order history
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    
    const [orders] = await db.execute(
      `SELECT 
        o.id,
        o.order_number,
        o.total_amount,
        o.status,
        o.payment_status,
        o.payment_method,
        o.created_at,
        COUNT(oi.id) as item_count
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.user_id = ?
       GROUP BY o.id
       ORDER BY o.created_at DESC
       LIMIT 10`,
      [userId]
    );

    res.json(orders);
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order details with items
router.get("/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Get order details
    const [orders] = await db.execute(
      `SELECT 
        o.*,
        u.firstName,
        u.lastName,
        u.email,
        u.phone
       FROM orders o
       JOIN users u ON o.user_id = u.id
       WHERE o.id = ?`,
      [orderId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Get order items
    const [orderItems] = await db.execute(
      `SELECT 
        oi.*,
        p.img
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({
      order: orders[0],
      items: orderItems
    });
  } catch (err) {
    console.error("Get order details error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create new order - SIMPLIFIED AND FIXED VERSION
router.post("/", async (req, res) => {
  console.log("📦 Received order creation request");
  
  try {
    const { userId, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    console.log("📦 Creating new order for user:", userId);
    console.log("🛒 Order items count:", items.length);
    console.log("💰 Total amount:", totalAmount);

    // Validate required fields
    if (!userId || !items || !totalAmount || !deliveryAddress || !paymentMethod) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields" 
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "Order must contain at least one item" 
      });
    }

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    console.log("📝 Creating order in database...");
    const [orderResult] = await db.execute(
      `INSERT INTO orders (user_id, order_number, total_amount, delivery_address, payment_method, status, payment_status) 
       VALUES (?, ?, ?, ?, ?, 'confirmed', 'pending')`,
      [userId, orderNumber, totalAmount, JSON.stringify(deliveryAddress), paymentMethod]
    );

    const orderId = orderResult.insertId;
    console.log(`✅ Order created with ID: ${orderId}`);

    // Insert order items
    console.log("📦 Inserting order items...");
    for (const item of items) {
      const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
      
      await db.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, item_total) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.price, item.quantity, itemTotal]
      );
      console.log(`✅ Added item: ${item.name} x${item.quantity}`);
    }

    // Clear user's cart after successful order
    console.log("🗑️ Clearing user's cart...");
    await db.execute(
      "DELETE FROM cart_items WHERE user_id = ?",
      [userId]
    );

    console.log(`🎉 Order ${orderNumber} created successfully!`);
    
    res.json({ 
      success: true, 
      message: "Order created successfully",
      orderId: orderId,
      orderNumber: orderNumber
    });

  } catch (err) {
    console.error("❌ Create order error:", err);
    
    let errorMessage = "Failed to create order";
    
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      errorMessage = "Invalid user or product reference. Please check if products exist.";
    } else if (err.code === 'ER_NO_SUCH_TABLE') {
      errorMessage = "Database tables missing. Please run the SQL setup script.";
    } else if (err.code === 'ER_BAD_NULL_ERROR') {
      errorMessage = "Missing required data for order creation.";
    } else if (err.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
      errorMessage = "Invalid data format for order creation.";
    }
    
    res.status(500).json({ 
      success: false,
      message: errorMessage,
      error: err.message
    });
  }
});

// Update order status
router.put("/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const [result] = await db.execute(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, orderId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Update order status error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Add this route to your orderRoutes.js
router.post("/clear-old", async (req, res) => {
  try {
    const { userId, olderThan } = req.body;
    
    console.log("🗑️ Clearing old orders for user:", userId);
    console.log("📅 Older than:", olderThan);

    // Delete orders older than specified date that are delivered or cancelled
    const [result] = await db.execute(
      `DELETE FROM orders 
       WHERE user_id = ? 
       AND created_at < ? 
       AND status IN ('delivered', 'cancelled')`,
      [userId, olderThan]
    );

    console.log(`✅ Cleared ${result.affectedRows} old orders`);

    res.json({
      success: true,
      message: "Old orders cleared successfully",
      clearedCount: result.affectedRows
    });

  } catch (err) {
    console.error("❌ Clear old orders error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to clear old orders",
      error: err.message
    });
  }
});

export default router;