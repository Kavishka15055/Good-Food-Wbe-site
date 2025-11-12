import React, { useState } from "react";
import { FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext"; // Import the cart context

const NavLink = [
  { id: 1, name: "Home", link: "#hero" },
  { id: 2, name: "About", link: "#about" },
  { id: 3, name: "Menu", link: "/menu" },
  { id: 4, name: "Contact", link: "#contact" },
];

function Navbar({ HandlePopup, user, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart(); // Get cart data from context

  // Calculate total items in cart
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const handleScroll = (e, link) => {
    e.preventDefault();
    const target = document.querySelector(link);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-5">
        <div className="font-bold text-3xl">Good Food</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NavLink.map(({ id, name, link }) => (
            <li key={id}>
              {name === "Menu" ? (
                <Link to={link} className="hover:text-primary text-xl font-semibold">
                  {name}
                </Link>
              ) : location.pathname === "/" ? (
                <a
                  href={link}
                  onClick={(e) => handleScroll(e, link)}
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </a>
              ) : (
                <Link to={`/${link}`} className="hover:text-primary text-xl font-semibold">
                  {name}
                </Link>
              )}
            </li>
          ))}

          {/* Cart Icon with Badge */}
          {user && (
            <li className="relative">
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2 text-xl text-white bg-primary px-4 py-2 rounded-lg hover:bg-primary/90 transition duration-200"
              >
                <FaShoppingCart />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                    {totalCartItems > 99 ? '99+' : totalCartItems}
                  </span>
                )}
                <span className="hidden sm:block">Cart</span>
              </button>
            </li>
          )}

          {/* User / Login */}
          <li className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded-lg hover:scale-105 duration-300"
                >
                  <FaUser className="text-sm" />
                  {user.firstName}
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 border border-gray-100 overflow-hidden">
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                      <p className="text-sm font-semibold text-gray-800">{user.firstName}</p>
                      <p className="text-xs text-gray-600">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-100 text-gray-700 font-medium transition duration-200"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={HandlePopup}
                className="flex justify-center items-center gap-2 bg-secondary text-white px-5 py-2 rounded-lg hover:scale-105 duration-300 font-semibold"
              >
                <FaUser /> 
                <span className="hidden sm:block">My Account</span>
              </button>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          {/* Cart Icon for Mobile (visible even when menu is closed) */}
          {user && totalCartItems > 0 && (
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-primary"
            >
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems > 9 ? '9+' : totalCartItems}
              </span>
            </button>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="text-2xl text-gray-700"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col items-start gap-4 px-5 py-6">
            {NavLink.map(({ id, name, link }) => (
              <li key={id} className="w-full border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                {name === "Menu" ? (
                  <Link
                    to={link}
                    className="block w-full text-lg font-semibold hover:text-primary py-2 transition duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                ) : location.pathname === "/" ? (
                  <a
                    href={link}
                    onClick={(e) => {
                      handleScroll(e, link);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-lg font-semibold hover:text-primary py-2 transition duration-200"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    to={`/${link}`}
                    className="block w-full text-lg font-semibold hover:text-primary py-2 transition duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}

            {/* Cart for Mobile */}
            {user && (
              <li className="w-full border-b border-gray-100 pb-3">
                <button
                  onClick={() => {
                    navigate("/cart");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-lg font-semibold text-primary bg-primary/10 px-4 py-3 rounded-lg hover:bg-primary/20 transition duration-200"
                >
                  <div className="flex items-center gap-3">
                    <FaShoppingCart />
                    <span>My Cart</span>
                  </div>
                  {totalCartItems > 0 && (
                    <span className="bg-primary text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              </li>
            )}

            {/* User Section for Mobile */}
            <li className="w-full pt-3 border-t border-gray-200">
              {user ? (
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-800">Hello, {user.firstName}!</p>
                    <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-200"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    HandlePopup();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-3 bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition duration-200"
                >
                  <FaUser />
                  <span>Login / Sign Up</span>
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;