import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
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
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total items in cart
  const totalCartItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  // Scroll spy to detect which section is in view (only on home page)
  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const sections = [
          { id: 'hero', offset: 200 },
          { id: 'about', offset: 200 },
          { id: 'contact', offset: 600 } // 500px offset for contact section only
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
      };

      window.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();

      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // Reset active section when not on home page
      setActiveSection("");
    }
  }, [location.pathname]);

  // Handle navigation for home page sections
  const handleNavigation = (e, link) => {
    e.preventDefault();
    
    if (link === "/menu") {
      navigate("/menu");
      setMobileMenuOpen(false);
      return;
    }

    // If link contains both route and hash (like "/#about")
    if (link.includes('#')) {
      const [route, hash] = link.split('#');
      const targetId = hash;
      
      // Define different offsets for different sections
      const sectionOffsets = {
        'hero': 200,
        'about': 200,
        'contact': 500
      };
      
      const offset = sectionOffsets[targetId] || 200; // Default to 200 if not found
      
      if (location.pathname === route) {
        // Already on home page, just scroll to section with offset
        const target = document.getElementById(targetId);
        if (target) {
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });
          setActiveSection(targetId);
        }
      } else {
        // Navigate to home page first, then scroll to section with offset
        navigate(route);
        // Use setTimeout to wait for navigation to complete
        setTimeout(() => {
          const target = document.getElementById(targetId);
          if (target) {
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
              top: targetPosition,
              behavior: "smooth"
            });
            setActiveSection(targetId);
          }
        }, 100);
      }
    } else {
      // Regular route navigation
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
      // For home page sections
      return location.pathname === "/" && activeSection === sectionId;
    }
    
    return location.pathname === link;
  };

  // Get active link name for mobile menu indicator
  const getActiveLinkName = () => {
    if (location.pathname === "/menu") return "Menu";
    if (location.pathname === "/cart") return "Cart";
    
    const activeLink = NavLink.find(link => isActive(link.link));
    return activeLink ? activeLink.name : "Home";
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-5">
        <div className="font-bold text-3xl">Good Food</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6">
          {NavLink.map(({ id, name, link }) => (
            <li key={id} className="relative">
              <button
                onClick={(e) => handleNavigation(e, link)}
                className={`hover:text-primary text-xl font-semibold transition duration-200 ${
                  isActive(link) 
                    ? "text-primary border-b-2 border-primary pb-1" 
                    : "text-gray-700"
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
                className={`relative flex items-center gap-2 text-xl px-4 py-2 rounded-lg hover:bg-primary/10 transition duration-200 ${
                  location.pathname === "/cart" 
                    ? "text-primary border-2 border-primary" 
                    : "text-white bg-primary hover:bg-primary/90"
                }`}
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
          {/* Active page indicator for mobile */}
          <div className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {getActiveLinkName()}
          </div>

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
          <ul className="flex flex-col items-start gap-0 px-5 py-4">
            {NavLink.map(({ id, name, link }) => (
              <li key={id} className="w-full">
                <button
                  onClick={(e) => handleNavigation(e, link)}
                  className={`block w-full text-left text-lg font-semibold py-4 px-3 transition duration-200 border-l-4 ${
                    isActive(link)
                      ? "text-primary bg-primary/10 border-primary"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50 border-transparent"
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}

            {/* Cart for Mobile */}
            {user && (
              <li className="w-full">
                <button
                  onClick={() => {
                    navigate("/cart");
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between text-lg font-semibold py-4 px-3 transition duration-200 border-l-4 ${
                    location.pathname === "/cart"
                      ? "text-primary bg-primary/10 border-primary"
                      : "text-primary bg-primary/10 hover:bg-primary/20 border-transparent"
                  }`}
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
            <li className="w-full pt-4 border-t border-gray-200 mt-2">
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