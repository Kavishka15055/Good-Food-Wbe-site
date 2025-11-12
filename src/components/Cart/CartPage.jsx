// components/Cart/CartPage.jsx
import React from "react";
import { useCart } from "../../context/CartContext";
import { FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => {
    const cleaned = (item.price || "").replace(/[^\d.-]/g, "");
    const price = parseFloat(cleaned) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const handleIncreaseQuantity = (item) => {
    // Create a proper product object from the cart item
    const product = {
      id: item.product_id || item.id, // Use product_id from backend or id from frontend
      name: item.name,
      img: item.img,
      price: item.price
    };
    console.log("➕ Increasing quantity for:", product);
    addToCart(product);
  };

  const handleDecreaseQuantity = (item) => {
    console.log("➖ Decreasing quantity for product ID:", item.product_id || item.id);
    removeFromCart(item.product_id || item.id);
  };

  const handleRemoveItem = (productId) => {
    console.log("🗑️ Removing item with product ID:", productId);
    removeFromCart(productId);
  };

  return (
    <div className="container mx-auto py-20 px-5">
      <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 pb-2">
        Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600 text-xl py-10">
          Your cart is empty 😢
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full md:w-48 h-48 object-cover rounded-lg mb-4 md:mb-0"
                />
                
                <div className="flex-1 md:ml-6 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.price}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Product ID: {item.product_id || item.id}
                  </p>
                  
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      <FaMinus size={12} />
                    </button>
                    
                    <span className="text-lg font-semibold min-w-8 text-center">
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition duration-200"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 md:mt-0">
                  <button
                    onClick={() => handleRemoveItem(item.product_id || item.id)}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                  >
                    <FaTrashAlt /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col md:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-inner">
            <div className="text-2xl font-semibold text-gray-700">
              Total: <span className="text-primary">{totalPrice.toFixed(2)} Rs</span>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition duration-200"
              >
                Clear Cart
              </button>
              <button
                onClick={() => alert("Checkout process coming soon!")}
                className="bg-primary text-white px-8 py-2 rounded hover:bg-primary/90 transition duration-200"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;