// components/Checkout/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FaArrowLeft, FaCreditCard, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Calculate totals with better price parsing
  const subtotal = cart.reduce((acc, item) => {
    const priceStr = item.price || "0";
    const cleaned = priceStr.replace(/[^\d.]/g, "");
    const price = parseFloat(cleaned) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.1;
  const deliveryFee = subtotal > 1000 ? 0 : 100;
  const total = subtotal + tax + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate("/");
      return;
    }

    if (!user.address_line1) {
      alert("Please add a delivery address in your profile before placing an order");
      navigate("/profile");
      return;
    }

    setLoading(true);

    try {
      // Prepare order data with proper price formatting
      const orderData = {
        userId: user.id,
        items: cart.map(item => {
          const priceStr = item.price || "0";
          const cleaned = priceStr.replace(/[^\d.]/g, "");
          const price = parseFloat(cleaned) || 0;
          
          return {
            id: item.product_id || item.id,
            name: item.name,
            price: price,
            quantity: item.quantity
          };
        }),
        totalAmount: total,
        deliveryAddress: {
          address_line1: user.address_line1 || "",
          address_line2: user.address_line2 || "",
          city: user.city || "",
          state: user.state || "",
          zip_code: user.zip_code || "",
          country: user.country || "Sri Lanka"
        },
        paymentMethod: paymentMethod
      };

      console.log("📦 Sending order data:", orderData);

      // Try the main order endpoint first
      let res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      let responseText = await res.text();
      console.log("📦 Order response:", responseText);

      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error("❌ Failed to parse response:", parseError);
        throw new Error("Invalid response from server");
      }

      // If main endpoint fails, try simple endpoint
      if (!res.ok) {
        console.log("🔄 Trying simple order endpoint...");
        res = await fetch("http://localhost:5000/api/orders/simple", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        responseText = await res.text();
        console.log("📦 Simple order response:", responseText);
        
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error("❌ Failed to parse simple response:", parseError);
          throw new Error("Invalid response from simple order endpoint");
        }
      }

      if (res.ok && result.success) {
        alert(`🎉 Order placed successfully!\nOrder Number: ${result.orderNumber}`);
        clearCart();
        navigate("/orders");
      } else {
        console.error("❌ Order failed:", result);
        alert(`❌ Failed to place order: ${result.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Order placement error:", err);
      alert("❌ Error placing order. Please try again. Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FaShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some items to your cart before checkout</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition duration-200"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition duration-200"
          >
            <FaArrowLeft />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="w-20"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary & Delivery */}
          <div className="lg:col-span-2">
            {/* Delivery Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt className="text-blue-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Delivery Address</h2>
              </div>
              
              {user?.address_line1 ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium">{user.address_line1}</p>
                  {user.address_line2 && <p className="text-gray-600">{user.address_line2}</p>}
                  <p className="text-gray-600">
                    {user.city}, {user.state} {user.zip_code}
                  </p>
                  <p className="text-gray-600">{user.country}</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-primary hover:text-primary/80 text-sm mt-2"
                  >
                    Change address
                  </button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-600 mb-3">No delivery address set</p>
                  <button
                    onClick={() => navigate("/profile")}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
                  >
                    Add Address
                  </button>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCreditCard className="text-green-500 text-xl" />
                <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
              </div>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <FaCreditCard className="text-gray-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const priceStr = item.price || "0";
                  const cleaned = priceStr.replace(/[^\d.]/g, "");
                  const itemPrice = parseFloat(cleaned) || 0;
                  const itemTotal = itemPrice * item.quantity;
                  
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 border-b border-gray-100">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600">Rs {itemPrice.toFixed(2)} × {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          Rs {itemTotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Total */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Order Total</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>Rs {tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `Rs ${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    🚚 Add Rs {(1000 - subtotal).toFixed(2)} more for free delivery!
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>Rs {total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading || !user?.address_line1}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaShoppingBag />
                      Place Order
                    </>
                  )}
                </button>

                {!user?.address_line1 && (
                  <p className="text-sm text-red-600 text-center mt-2">
                    Please add a delivery address to continue
                  </p>
                )}

                <div className="text-center text-xs text-gray-500 mt-4">
                  🔒 Secure checkout · 100% guaranteed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;