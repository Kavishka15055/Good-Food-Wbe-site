import React, { useState } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavLink = [
  { id: 1, name: "Home", link: "#hero" },
  { id: 2, name: "About", link: "#about" },
  { id: 3, name: "Menu", link: "/menu" }, // Changed from dropdown to direct link
  { id: 4, name: "Contact", link: "#contact" },
];

function Navbar({ HandlePopup }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
        <ul className="hidden md:flex items-center gap-10">
          {NavLink.map(({ id, name, link }) => (
            <li key={id}>
              {name === "Menu" ? (
                // Menu is now a direct link to the menu page
                <Link
                  to={link}
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </Link>
              ) : location.pathname === "/" ? (
                // Home page scroll links
                <a
                  href={link}
                  onClick={(e) => handleScroll(e, link)}
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </a>
              ) : (
                // Other pages - navigate to home with hash
                <Link
                  to={`/${link}`}
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </Link>
              )}
            </li>
          ))}

          {/* My Account */}
          <li>
            <button
              onClick={HandlePopup}
              className="flex justify-center items-center gap-2 bg-secondary text-xl text-white px-5 py-2 rounded hover:scale-105 duration-300"
            >
              <FaUser /> My Account
            </button>
          </li>
        </ul>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-2xl"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-start gap-4 px-5 py-4">
            {NavLink.map(({ id, name, link }) => (
              <li key={id} className="w-full">
                {name === "Menu" ? (
                  // Menu is now a direct link in mobile too
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

            <li className="w-full">
              <button
                onClick={() => {
                  HandlePopup();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex justify-center items-center gap-2 bg-secondary text-xl text-white px-5 py-2 rounded hover:scale-105 duration-300"
              >
                <FaUser /> My Account
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;