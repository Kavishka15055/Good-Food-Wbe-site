// components/Cart/EmptyCart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaUtensils, FaSmile } from "react-icons/fa";

const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center py-20 px-4 ">
      <div className="text-center max-w-md mx-auto  ">
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
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
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

export default EmptyCart;