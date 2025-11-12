// components/Cart/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { FaTrashAlt, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaCreditCard, FaUtensils, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

// Empty Cart Component
const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-20 px-4">
      <div className="text-center max-w-md mx-auto">
        {/* Animated Icon Container */}
        <div className="relative mb-8">
          <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <FaShoppingBag className="text-5xl text-white" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-2xl">🍕</span>
          </div>
          
          <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-green-400 rounded-full flex items-center justify-center animate-ping">
            <span className="text-xl">🥗</span>
          </div>
          
          <div className="absolute top-1/2 -right-8 w-8 h-8 bg-red-400 rounded-full animate-bounce delay-300">
            <span className="text-lg">🍔</span>
          </div>
        </div>
        
        {/* Text Content */}
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        
        <div className="flex justify-center mb-6">
          <FaSmile className="text-3xl text-yellow-500 animate-bounce" />
        </div>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Looks like you haven't added any delicious items to your cart yet. 
          Don't worry, our kitchen is ready to serve you something amazing!
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <FaUtensils />
            Explore Our Menu
          </Link>
          
          {/* Features List */}
          <div className="bg-white/80 rounded-2xl p-6 mt-8 shadow-md">
            <h3 className="font-semibold text-gray-800 mb-4">Why order from us?</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Fresh Ingredients
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Quick Delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                24/7 Service
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Best Quality
              </div>
            </div>
          </div>
          
          {/* Special Offer */}
          <div className="mt-6 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-white">
            <p className="font-bold text-lg">🎁 Special Offer!</p>
            <p className="text-sm">Free delivery on your first order above ₹500</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Cart Page Component
const CartPage = () => {
  const { cart, removeFromCart, clearCart, addToCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => {
    const cleaned = (item.price || "").replace(/[^\d.-]/g, "");
    const price = parseFloat(cleaned) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const tax = subtotal * 0.1; // 10% tax
  const deliveryFee = subtotal > 1000 ? 0 : 100; // Free delivery above 1000 Rs
  const total = subtotal + tax + deliveryFee;

  const handleIncreaseQuantity = (item) => {
    const product = {
      id: item.product_id || item.id,
      name: item.name,
      img: item.img,
      price: item.price
    };
    addToCart(product);
  };

  const handleDecreaseQuantity = (item) => {
    removeFromCart(item.product_id || item.id);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert("🎉 Order placed successfully! Thank you for your purchase.");
      clearCart();
      setIsCheckingOut(false);
    }, 2000);
  };

  // Return Empty Cart if no items
  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Cart</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </span>
            <span>•</span>
            <span>Total: {total.toFixed(2)} Rs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition duration-200">
                    <div className="flex items-center gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover shadow-md"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-primary font-semibold text-lg mt-1">
                          {item.price}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus size={12} />
                        </button>
                        
                        <span className="text-lg font-semibold min-w-8 text-center">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => handleIncreaseQuantity(item)}
                          className="w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 transition duration-200"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.product_id || item.id)}
                        className="flex items-center justify-center w-10 h-10 text-red-500 hover:bg-red-50 rounded-full transition duration-200"
                        title="Remove item"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-600">Item total:</span>
                      <span className="font-semibold text-gray-800">
                        {((parseFloat(item.price.replace(/[^\d.-]/g, "")) || 0) * item.quantity).toFixed(2)} Rs
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition duration-200 font-semibold"
              >
                <FaArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg sticky top-8">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">Order Total</h2>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} Rs</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>{tax.toFixed(2)} Rs</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      `${deliveryFee.toFixed(2)} Rs`
                    )}
                  </span>
                </div>

                {deliveryFee > 0 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    🚚 Add {(1000 - subtotal).toFixed(2)} Rs more for free delivery!
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{total.toFixed(2)} Rs</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary text-white py-4 rounded-xl font-semibold hover:bg-primary/90 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaCreditCard />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="text-center text-xs text-gray-500 mt-4">
                  🔒 Secure checkout · 100% guaranteed
                </div>

                {/* Clear Cart */}
                <button
                  onClick={clearCart}
                  className="w-full text-red-500 py-3 rounded-xl border border-red-200 hover:bg-red-50 transition duration-200 font-semibold"
                >
                  Clear Entire Cart
                </button>
              </div>
            </div>

            {/* Promo Section */}
            <div className="mt-6 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">🎁 Special Offer!</h3>
              <p className="text-sm opacity-90">
                Get 15% off on your first order above 2000 Rs. Use code: <strong>WELCOME15</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Items */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { id: 21, name: "Garlic Naan", price: "120.Rs", img: "/images/menu/recommended/garlic-naan.jpg" },
              { id: 22, name: "Mango Lassi", price: "180.Rs", img: "/images/menu/recommended/mango-lassi.jpg" },
              { id: 23, name: "Chocolate Brownie", price: "220.Rs", img: "/images/menu/recommended/chocolate-brownie.jpg" },
              { id: 24, name: "Ice Cream", price: "150.Rs", img: "/images/menu/recommended/ice-cream.jpg" }
            ].map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-primary font-semibold mb-3">{item.price}</p>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition duration-200 text-sm font-semibold"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;