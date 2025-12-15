import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes, FaShoppingCart, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const NavLink = [
  { id: 1, name: "Home", link: "/#hero" },
  { id: 2, name: "About", link: "/#about" },
  { id: 3, name: "Menu", link: "/menu" },
  { id: 4, name: "Contact", link: "/#contact" },
];

function Navbar({ HandlePopup, user, handleLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, getCartItemCount } = useCart();

  // Calculate total items in cart
  const totalCartItems = getCartItemCount ? getCartItemCount() : cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy to detect which section is in view
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScrollSpy = () => {
        const sections = [
          { id: 'hero', offset: 200 },
          { id: 'about', offset: 200 },
          { id: 'contact', offset: 700 }
        ];
        const scrollY = window.scrollY;

        for (const section of sections) {
          const element = document.getElementById(section.id);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            const adjustedOffsetTop = offsetTop - section.offset;
            
            if (scrollY >= adjustedOffsetTop && scrollY < adjustedOffsetTop + offsetHeight) {
              setActiveSection(section.id);
              break;
            }
          }
        }

        // Fallback for bottom of page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
          setActiveSection('contact');
        }
      };

      window.addEventListener('scroll', handleScrollSpy);
      handleScrollSpy();

      return () => window.removeEventListener('scroll', handleScrollSpy);
    } else {
      setActiveSection("");
    }
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdown && !event.target.closest('.user-dropdown')) {
        setUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userDropdown]);

  // Handle navigation
  const handleNavigation = (e, link) => {
    e.preventDefault();
    
    if (link === "/menu") {
      navigate("/menu");
      setMobileMenuOpen(false);
      return;
    }

    if (link.includes('#')) {
      const [route, hash] = link.split('#');
      const targetId = hash;
      
      if (location.pathname === route) {
        const target = document.getElementById(targetId);
        if (target) {
          const targetPosition = target.offsetTop - 80;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
          setActiveSection(targetId);
        }
      } else {
        navigate(route);
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            const targetPosition = target.offsetTop - 80;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
            setActiveSection(targetId);
          }
        }, 100);
      }
    } else {
      navigate(link);
    }
    
    setMobileMenuOpen(false);
  };

  // Check if a nav item is active
  const isActive = (link) => {
    if (link === "/menu") {
      return location.pathname === "/menu";
    }
    
    if (link.startsWith("/#")) {
      const sectionId = link.split('#')[1];
      return location.pathname === "/" && activeSection === sectionId;
    }
    
    return location.pathname === link;
  };

  // Get active link name for mobile menu indicator
  const getActiveLinkName = () => {
    if (location.pathname === "/menu") return "Menu";
    if (location.pathname === "/cart") return "Cart";
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/orders") return "Orders";
    
    const activeLink = NavLink.find(link => isActive(link.link));
    return activeLink ? activeLink.name : "Home";
  };

  // Handle user dropdown toggle
  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  // Handle navigation with dropdown close
  const handleNavigate = (path) => {
    navigate(path);
    setUserDropdown(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-md'
    }`}>
      <div className="container mx-auto flex justify-between items-center py-3 px-1 ">
        {/* Logo */}
        <div className=" -mr-[60px] sm:-mr-[250px] md:-mr-[20px] lg:-mr-[450px]">
          <img src="/logo.png" alt="Good Food Logo" className="w-12 h-12 object-contain rounded-full"/>
        </div>
        <div 
          className="font-bold text-xl sm:text-3xl md:text-2xl lg:text-3xl text-primary cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 "
          onClick={() => navigate("/")}
        >
          Good Food
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NavLink.map(({ id, name, link }) => (
            <li key={id} className="relative">
              <button
                onClick={(e) => handleNavigation(e, link)}
                className={`text-lg font-semibold py-2 px-1 transition-all duration-300 ${
                  isActive(link) 
                    ? "text-primary after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary" 
                    : "text-gray-700 hover:text-primary hover:scale-105 active:scale-95"
                }`}
              >
                {name}
              </button>
            </li>
          ))}

          {/* Cart Icon with Badge */}
          {user && (
            <li className="relative">
              <button
                onClick={() => navigate("/cart")}
                className={`relative flex items-center gap-2 text-lg px-4 py-2 rounded-xl transition-all duration-300 ${
                  location.pathname === "/cart" 
                    ? "text-primary bg-primary/10 border-2 border-primary" 
                    : "text-white bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                }`}
              >
                <FaShoppingCart className="transition-transform duration-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
                    {totalCartItems > 99 ? '99+' : totalCartItems}
                  </span>
                )}
                <span className="hidden sm:block">Cart</span>
              </button>
            </li>
          )}

          {/* User / Login */}
          <li className="relative user-dropdown">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center gap-2 bg-gradient-to-r from-secondary to-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <FaUser className="text-sm" />
                  <span className="max-w-24 truncate">{user.firstName}</span>
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-2xl rounded-xl w-56 border border-gray-200 overflow-hidden transition-all duration-300">
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                      <p className="text-sm font-semibold text-gray-800 truncate">Hello, {user.firstName}!</p>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="w-full text-left px-4 py-3 text-gray-700 font-medium transition-all duration-300 hover:bg-blue-50 border-b border-gray-100 flex items-center gap-3 group"
                    >
                      <FaUser className="text-gray-400 group-hover:text-primary transition-colors duration-300" />
                      <span>My Profile</span>
                    </button>
                    
                    <button
                      onClick={() => handleNavigate("/orders")}
                      className="w-full text-left px-4 py-3 text-gray-700 font-medium transition-all duration-300 hover:bg-blue-50 border-b border-gray-100 flex items-center gap-3 group"
                    >
                      <FaHistory className="text-gray-400 group-hover:text-primary transition-colors duration-300" />
                      <span>My Orders</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 font-medium transition-all duration-300 hover:bg-red-50 flex items-center gap-3 group"
                    >
                      <FaSignOutAlt className="text-red-400 group-hover:text-red-600 transition-colors duration-300" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={HandlePopup}
                className="flex justify-center items-center gap-2 bg-gradient-to-r from-secondary to-purple-600 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 font-semibold shadow-lg hover:shadow-xl"
              >
                <FaUser className="text-sm" /> 
                <span className="hidden sm:block">My Account</span>
              </button>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full border border-primary/20">
            {getActiveLinkName()}
          </div>

          {user && (
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 text-primary transition-all duration-300 hover:bg-primary/10 rounded-lg active:scale-95"
            >
              <FaShoppingCart className="text-xl" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px] shadow-md">
                  {totalCartItems > 9 ? '9+' : totalCartItems}
                </span>
              )}
            </button>
          )}
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 text-gray-700 transition-all duration-300 hover:bg-gray-100 rounded-lg active:scale-95"
          >
            {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-xl border-t border-gray-200 transition-all duration-300">
          <ul className="flex flex-col items-start gap-0 px-4 py-3">
            {NavLink.map(({ id, name, link }) => (
              <li key={id} className="w-full">
                <button
                  onClick={(e) => handleNavigation(e, link)}
                  className={`block w-full text-left text-base font-semibold py-3 px-4 transition-all duration-300 border-l-4 rounded-r-lg ${
                    isActive(link)
                      ? "text-primary bg-primary/10 border-primary shadow-sm"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100 border-transparent"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}

            {user && (
              <>
                <li className="w-full">
                  <button
                    onClick={() => handleNavigate("/cart")}
                    className={`w-full flex items-center justify-between text-base font-semibold py-3 px-4 transition-all duration-300 border-l-4 rounded-r-lg ${
                      location.pathname === "/cart"
                        ? "text-primary bg-primary/10 border-primary shadow-sm"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaShoppingCart />
                      <span>My Cart</span>
                    </div>
                    {totalCartItems > 0 && (
                      <span className="bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {totalCartItems}
                      </span>
                    )}
                  </button>
                </li>

                <li className="w-full">
                  <button
                    onClick={() => handleNavigate("/profile")}
                    className={`w-full flex items-center justify-between text-base font-semibold py-3 px-4 transition-all duration-300 border-l-4 rounded-r-lg ${
                      location.pathname === "/profile"
                        ? "text-primary bg-primary/10 border-primary shadow-sm"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaUser />
                      <span>My Profile</span>
                    </div>
                  </button>
                </li>

                <li className="w-full">
                  <button
                    onClick={() => handleNavigate("/orders")}
                    className={`w-full flex items-center justify-between text-base font-semibold py-3 px-4 transition-all duration-300 border-l-4 rounded-r-lg ${
                      location.pathname === "/orders"
                        ? "text-primary bg-primary/10 border-primary shadow-sm"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50 active:bg-gray-100 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FaHistory />
                      <span>My Orders</span>
                    </div>
                  </button>
                </li>
              </>
            )}

            <li className="w-full pt-3 border-t border-gray-200 mt-2">
              {user ? (
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-800 text-sm">Hello, {user.firstName}!</p>
                    <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-red-600 active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <FaSignOutAlt />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    HandlePopup();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-3 bg-gradient-to-r from-secondary to-purple-600 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
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