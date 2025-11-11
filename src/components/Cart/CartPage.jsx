import React from "react";
import { useCart } from "../../context/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const totalPrice = cart.reduce((acc, item) => {
    const cleaned = (item.price || "").replace(/[^\d.-]/g, "");
    const price = parseFloat(cleaned) || 0;
    return acc + price;
  }, 0);

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="relative shadow-lg rounded-xl overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{item.price}</p>
                  <button
  onClick={() => removeFromCart(item.id)} // ✅ use item.id instead of item.name
  className="flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition duration-200 mx-auto"
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
