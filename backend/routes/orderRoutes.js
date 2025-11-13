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

// Create new order - COMPLETELY FIXED VERSION
router.post("/", async (req, res) => {
  console.log("📦 Received order creation request:", req.body);
  
  let connection;
  try {
    const { userId, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    console.log("📦 Creating new order for user:", userId);
    console.log("🛒 Order items:", JSON.stringify(items, null, 2));
    console.log("💰 Total amount:", totalAmount);
    console.log("🏠 Delivery address:", deliveryAddress);
    console.log("💳 Payment method:", paymentMethod);

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

    // Get database connection
    connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Create order
      console.log("📝 Creating order in database...");
      const [orderResult] = await connection.execute(
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
        
        console.log(`📝 Adding item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Total: ${itemTotal}`);
        
        await connection.execute(
          `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, item_total) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [orderId, item.id, item.name, item.price, item.quantity, itemTotal]
        );
        console.log(`✅ Added item: ${item.name} x${item.quantity}`);
      }

      // Clear user's cart after successful order
      console.log("🗑️ Clearing user's cart...");
      await connection.execute(
        "DELETE FROM cart_items WHERE user_id = ?",
        [userId]
      );

      await connection.commit();
      console.log(`🎉 Order ${orderNumber} created successfully!`);
      
      res.json({ 
        success: true, 
        message: "Order created successfully",
        orderId: orderId,
        orderNumber: orderNumber
      });

    } catch (transactionError) {
      await connection.rollback();
      console.error("❌ Order creation transaction failed:", transactionError);
      console.error("❌ Transaction error details:", transactionError.message);
      console.error("❌ Transaction error code:", transactionError.code);
      
      let errorMessage = "Failed to create order";
      
      if (transactionError.code === 'ER_NO_REFERENCED_ROW_2') {
        errorMessage = "Invalid user or product reference. Please check if products exist.";
      } else if (transactionError.code === 'ER_NO_SUCH_TABLE') {
        errorMessage = "Database tables missing. Please run the SQL setup script.";
      } else if (transactionError.code === 'ER_BAD_NULL_ERROR') {
        errorMessage = "Missing required data for order creation.";
      }
      
      throw new Error(errorMessage);
    }

  } catch (err) {
    console.error("❌ Create order error:", err);
    console.error("❌ Error stack:", err.stack);
    
    res.status(500).json({ 
      success: false,
      message: err.message || "Internal Server Error",
      error: err.toString()
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Simple order creation endpoint (fallback)
router.post("/simple", async (req, res) => {
  try {
    const { userId, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

    console.log("📦 Using simple order creation for user:", userId);

    // Generate unique order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order without transaction
    const [orderResult] = await db.execute(
      `INSERT INTO orders (user_id, order_number, total_amount, delivery_address, payment_method, status, payment_status) 
       VALUES (?, ?, ?, ?, ?, 'confirmed', 'pending')`,
      [userId, orderNumber, totalAmount, JSON.stringify(deliveryAddress), paymentMethod]
    );

    const orderId = orderResult.insertId;

    // Insert order items
    for (const item of items) {
      const itemTotal = (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 1);
      
      await db.execute(
        `INSERT INTO order_items (order_id, product_id, product_name, product_price, quantity, item_total) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.id, item.name, item.price, item.quantity, itemTotal]
      );
    }

    // Clear cart
    await db.execute("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    res.json({ 
      success: true, 
      message: "Order created successfully",
      orderId: orderId,
      orderNumber: orderNumber
    });

  } catch (err) {
    console.error("❌ Simple order creation error:", err);
    res.status(500).json({ 
      success: false,
      message: "Failed to create order: " + err.message
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

export default router;