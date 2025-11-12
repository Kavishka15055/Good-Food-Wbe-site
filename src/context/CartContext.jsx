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

    // Extract the actual product ID (handle both product objects and cart items)
    const productId = item.product_id || item.id;
    
    if (!productId) {
      console.error("❌ No product ID found in item:", item);
      alert("❌ Error: Invalid product");
      return;
    }

    try {
      console.log("🛒 Sending request to backend for product ID:", productId);
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });

      console.log("🛒 Backend response status:", res.status);
      
      // Handle HTML error responses (like 500 errors that return HTML)
      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("❌ Server returned non-JSON response:", text.substring(0, 200));
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      console.log("🛒 Backend response data:", data);

      if (res.ok && data.success) {
        // Update local cart state
        setCart(prevCart => {
          const existingItem = prevCart.find(cartItem => 
            cartItem.product_id === productId || cartItem.id === productId
          );
          
          if (existingItem) {
            return prevCart.map(cartItem =>
              (cartItem.product_id === productId || cartItem.id === productId)
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            // This shouldn't happen often since backend should sync, but handle it
            return [...prevCart, {
              id: Date.now(),
              product_id: productId,
              name: item.name,
              img: item.img,
              price: item.price,
              quantity: 1
            }];
          }
        });
        console.log("✅ Item added to cart!");
      } else {
        alert(`❌ Failed to add item: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Error adding to cart:", err);
      alert("❌ Error adding item to cart: " + err.message);
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    console.log("🛒 Removing item with ID:", productId);

    try {
      const res = await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          productId: productId,
        }),
      });

      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("❌ Server returned non-JSON response:", text.substring(0, 200));
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      console.log("🛒 Remove response:", data);

      if (res.ok && data.success) {
        setCart(prevCart => {
          const existingItem = prevCart.find(item => 
            item.product_id === productId || item.id === productId
          );
          
          if (existingItem && existingItem.quantity > 1) {
            return prevCart.map(item =>
              (item.product_id === productId || item.id === productId)
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
          } else {
            return prevCart.filter(item => 
              !(item.product_id === productId || item.id === productId)
            );
          }
        });
      } else {
        alert(`❌ Failed to remove item: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Error removing from cart:", err);
      alert("❌ Error removing item from cart: " + err.message);
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

      const contentType = res.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("❌ Server returned non-JSON response:", text.substring(0, 200));
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }

      console.log("🛒 Clear cart response:", data);

      if (res.ok && data.success) {
        setCart([]);
        alert("✅ Cart cleared!");
      } else {
        alert(`❌ Failed to clear cart: ${data.message}`);
      }
    } catch (err) {
      console.error("❌ Error clearing cart:", err);
      alert("❌ Error clearing cart: " + err.message);
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