import React, { useState } from "react";
import { FaUser, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate(); // ✅ For cart navigation

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

          {user && (
            <li>
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-2 text-xl text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 transition duration-200"
              >
                <FaShoppingCart />
              </button>
            </li>
          )}

          {/* User / Login */}
          <li className="relative">
            {user ? (
              <div>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 bg-secondary text-white px-5 py-2 rounded hover:scale-105 duration-300"
                >
                  {user.firstName}
                </button>
                {userDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-32">
                    <button
                      onClick={() => {
                        handleLogout();
                        setUserDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={HandlePopup}
                className="flex justify-center items-center gap-2 bg-secondary text-xl text-white px-5 py-2 rounded hover:scale-105 duration-300"
              >
                <FaUser /> My Account
              </button>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-2xl">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-start gap-4 px-5 py-4">
            {NavLink.map(({ id, name, link }) => (
              <li key={id} className="w-full">
                {name === "Menu" ? (
                  <Link
                    to={link}
                    className="block w-full text-xl font-semibold hover:text-primary"
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
                    className="block w-full text-xl font-semibold hover:text-primary"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    to={`/${link}`}
                    className="block w-full text-xl font-semibold hover:text-primary"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}

            {user && (
              <li>
                <button
                  onClick={() => {
                    navigate("/cart");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 text-xl text-white bg-primary px-4 py-2 rounded hover:bg-primary/90 transition duration-200"
                >
                  <FaShoppingCart /> Cart
                </button>
              </li>
            )}

            <li className="w-full">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="w-full flex justify-center items-center gap-2 bg-secondary text-white px-5 py-2 rounded"
                  >
                    {user.firstName}
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-full">
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserDropdown(false);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    HandlePopup();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex justify-center items-center gap-2 bg-secondary text-white px-5 py-2 rounded"
                >
                  <FaUser /> My Account
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
