// cartController.js
import db from "../db.js";// ✅ default import

export const getCart = async (req, res) => {
  const { userId } = req.params;
  const [cart] = await db.query(
    `SELECT ci.id, ci.quantity, ci.price, p.name, p.img
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?`,
    [userId]
  );
  res.json(cart);
};

export const addItemToCart = async (req, res) => {
  const { userId, productId } = req.body;

  const [existing] = await db.query(
    "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );

  if (existing.length > 0) {
    await db.query(
      "UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
  } else {
    const [product] = await db.query("SELECT * FROM products WHERE id = ?", [productId]);
    await db.query(
      "INSERT INTO cart_items (user_id, product_id, quantity, price) VALUES (?, ?, 1, ?)",
      [userId, productId, product[0].price]
    );
  }

  res.json({ success: true });
};

export const removeOneInstance = async (req, res) => {
  const { userId, productId } = req.body;

  const [item] = await db.query(
    "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
    [userId, productId]
  );

  if (item.length === 0) return res.json({ success: false });

  if (item[0].quantity > 1) {
    await db.query(
      "UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
  } else {
    await db.query(
      "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );
  }

  res.json({ success: true });
};

export const clearCart = async (req, res) => {
  const { userId } = req.body;
  await db.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);
  res.json({ success: true });
};
