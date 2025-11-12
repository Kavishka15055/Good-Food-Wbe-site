// controllers/cartController.js
import db from "../db.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("🛒 Fetching cart for user:", userId);
    
    const [cart] = await db.query(
      `SELECT ci.id, ci.quantity, ci.price, p.id as product_id, p.name, p.img
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = ?`,
      [userId]
    );
    
    console.log("🛒 Cart data:", cart);
    res.json(cart);
  } catch (err) {
    console.error("❌ Get cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: err.message 
    });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    console.log("🛒 Add to cart request:", { userId, productId });

    // Validate input
    if (!userId || !productId) {
      return res.status(400).json({ 
        success: false, 
        message: "User ID and Product ID are required" 
      });
    }

    // Check if product exists
    const [product] = await db.query("SELECT * FROM products WHERE id = ?", [productId]);
    console.log("📦 Product found:", product);
    
    if (product.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

    // Check if item already in cart
    const [existing] = await db.query(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    console.log("🛒 Existing cart item:", existing);

    if (existing.length > 0) {
      // Update quantity
      await db.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      console.log("✅ Quantity updated");
    } else {
      // Add new item
      await db.query(
        "INSERT INTO cart_items (user_id, product_id, quantity, price) VALUES (?, ?, 1, ?)",
        [userId, productId, product[0].price]
      );
      console.log("✅ New item added to cart");
    }

    res.json({ 
      success: true, 
      message: "Item added to cart successfully" 
    });
    
  } catch (err) {
    console.error("❌ Add to cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: err.message,
      stack: err.stack
    });
  }
};

export const removeOneInstance = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    
    console.log("🛒 Remove from cart request:", { userId, productId });

    const [item] = await db.query(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (item.length === 0) {
      return res.json({ 
        success: false, 
        message: "Item not found in cart" 
      });
    }

    if (item[0].quantity > 1) {
      await db.query(
        "UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      console.log("✅ Quantity decreased");
    } else {
      await db.query(
        "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );
      console.log("✅ Item removed from cart");
    }

    res.json({ 
      success: true, 
      message: "Item removed from cart" 
    });
  } catch (err) {
    console.error("❌ Remove from cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: err.message 
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;
    
    console.log("🛒 Clear cart request for user:", userId);
    
    await db.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);
    
    console.log("✅ Cart cleared");
    res.json({ 
      success: true, 
      message: "Cart cleared successfully" 
    });
  } catch (err) {
    console.error("❌ Clear cart error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Internal Server Error",
      error: err.message 
    });
  }
};