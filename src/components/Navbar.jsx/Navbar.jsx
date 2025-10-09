import React, { useState } from "react";
import { FaCaretDown, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const NavLink = [
  { id: 1, name: "Home", link: "#hero" },
  { id: 2, name: "About", link: "#about" },
  { id: 3, name: "Contact", link: "#contact" },
];

const DropdownLinks = [
  { id: 1, name: "Vegetables", link: "/menu#vegetables" },
  { id: 2, name: "Fruits", link: "/menu#fruits" },
  { id: 3, name: "Grains", link: "/menu#grains" },
];

function Navbar({ HandlePopup }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
              {location.pathname === "/" ? (
                <a
                  href={link}
                  onClick={(e) => handleScroll(e, link)}
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </a>
              ) : (
                <Link
                  to={`/${link}`} // always go back to home
                  className="hover:text-primary text-xl font-semibold"
                >
                  {name}
                </Link>
              )}
            </li>
          ))}

          {/* Dropdown */}
          <li
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="flex items-center gap-1 text-xl font-semibold hover:text-primary cursor-pointer">
              Menu <FaCaretDown className="group-hover:rotate-180 duration-300" />
            </div>

            {dropdownOpen && (
              <div className="absolute top-full mt-0 bg-white shadow-lg w-[150px] p-2 z-50">
                {DropdownLinks.map((item) => (
                  <a
                    key={item.id}
                    href={item.link}
                    className="block px-4 py-2 hover:bg-primary/20 text-xl"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </li>

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
                {location.pathname === "/" ? (
                  <a
                    href={link}
                    onClick={(e) => handleScroll(e, link)}
                    className="block w-full text-xl font-semibold hover:text-primary"
                  >
                    {name}
                  </a>
                ) : (
                  <Link
                    to={`/${link}`}
                    className="block w-full text-xl font-semibold hover:text-primary"
                  >
                    {name}
                  </Link>
                )}
              </li>
            ))}

            {DropdownLinks.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className="block px-3 py-1 rounded hover:bg-primary/20 text-lg"
              >
                {item.name}
              </a>
            ))}

            <li className="w-full">
              <button
                onClick={HandlePopup}
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
