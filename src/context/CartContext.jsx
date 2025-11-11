import React, { createContext, useContext, useEffect, useState } from "react";

// Create context
const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // Function to fetch cart
  const fetchCart = async () => {
    if (!user?.id) {
      setCart([]);
      return;
    }

    try {
      console.log("Fetching cart for user:", user.id);
      const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // Fetch cart when user changes
  useEffect(() => {
    fetchCart();
  }, [user]);

  // Add product to cart
  const addToCart = async (product) => {
    if (!user?.id) return alert("Please log in to add items to your cart");
    if (!product) return alert("Product is invalid");

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, product }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      // Refresh cart
      await fetchCart();
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    if (!user?.id) return alert("Please log in to remove items from your cart");

    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId }),
      });

      if (!res.ok) throw new Error("Failed to remove from cart");

      // Refresh cart
      await fetchCart();
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!user?.id) return alert("Please log in to clear your cart");

    try {
      const res = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      setCart([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
