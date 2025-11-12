// context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children, user }) => {
  const [cart, setCart] = useState([]);

  // Load cart from backend when user logs in
  useEffect(() => {
    if (user?.id) {
      console.log("👤 User logged in, fetching cart for user ID:", user.id);
      fetchCartFromBackend();
    } else {
      console.log("👤 No user, clearing cart");
      setCart([]);
    }
  }, [user]);

  const fetchCartFromBackend = async () => {
    try {
      console.log("🛒 Fetching cart from backend...");
      const res = await fetch(`http://localhost:5000/api/cart/${user.id}`);
      console.log("🛒 Backend response status:", res.status);
      
      if (res.ok) {
        const cartData = await res.json();
        console.log("🛒 Cart data received:", cartData);
        setCart(cartData);
      } else {
        const errorData = await res.json();
        console.error("❌ Error fetching cart:", errorData);
      }
    } catch (err) {
      console.error("❌ Network error fetching cart:", err);
    }
  };

  const addToCart = async (item) => {
    console.log("🛒 Add to cart clicked for item:", item);
    
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      console.log("🛒 Sending request to backend...");
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: item.id,
        }),
      });

      console.log("🛒 Backend response status:", res.status);
      
      const data = await res.json();
      console.log("🛒 Backend response data:", data);

      if (res.ok && data.success) {
        // Update local cart state
        setCart(prevCart => {
          const existingItem = prevCart.find(cartItem => cartItem.product_id === item.id);
          if (existingItem) {
            return prevCart.map(cartItem =>
              cartItem.product_id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            return [...prevCart, {
              id: Date.now(),
              product_id: item.id,
              name: item.name,
              img: item.img,
              price: item.price,
              quantity: 1
            }];
          }
        });
        alert("✅ Item added to cart!");
      } else {
        alert(`❌ Failed to add item: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Network error adding to cart:", err);
      alert("❌ Network error adding item to cart");
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });

      const data = await res.json();
      console.log("🛒 Remove response:", data);

      if (res.ok && data.success) {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => item.product_id === productId);
          if (existingItem && existingItem.quantity > 1) {
            return prevCart.map(item =>
              item.product_id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } else {
            return prevCart.filter(item => item.product_id !== productId);
          }
        });
      }
    } catch (err) {
      console.error("❌ Error removing from cart:", err);
      alert("❌ Error removing item from cart");
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const res = await fetch("http://localhost:5000/api/cart/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id }),
      });

      const data = await res.json();
      console.log("🛒 Clear cart response:", data);

      if (res.ok && data.success) {
        setCart([]);
        alert("✅ Cart cleared!");
      }
    } catch (err) {
      console.error("❌ Error clearing cart:", err);
      alert("❌ Error clearing cart");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};