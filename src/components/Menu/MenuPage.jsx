// src/pages/MenuPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MenuPage = () => {
  const location = useLocation();

  // Menu categories data
  const menuCategories = [
    {
      id: "starters",
      title: "Starters / Appetizers",
      items: ["Spring Rolls", "Garlic Bread", "Bruschetta", "Chicken Wings"]
    },
    {
      id: "soups",
      title: "Soups",
      items: ["Tomato Basil Soup", "Chicken Noodle Soup", "Cream of Mushroom", "Minestrone"]
    },
    {
      id: "salads",
      title: "Salads",
      items: ["Caesar Salad", "Greek Salad", "Caprese Salad", "Garden Fresh Salad"]
    },
    {
      id: "main-course",
      title: "Main Course / Entrees",
      items: ["Grilled Chicken", "Spaghetti Bolognese", "Margherita Pizza", "Paneer Butter Masala"]
    },
    {
      id: "burgers-sandwiches",
      title: "Burgers & Sandwiches",
      items: ["Classic Beef Burger", "Veggie Burger", "Club Sandwich", "Chicken Panini"]
    }
  ];

  // Scroll to section when hash changes
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div className="container mx-auto py-20 px-5">
      {menuCategories.map((category, index) => (
        <section 
          key={category.id} 
          id={category.id} 
          className={index === 0 ? "py-0" : "py-40"}
        >
          <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 border-primary pb-2">
            {category.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {category.items.map((item, itemIndex) => (
              <div 
                key={itemIndex} 
                className="p-5 shadow-lg rounded-lg bg-white hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item}</h3>
                <p className="text-gray-600">Delicious and freshly prepared</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuPage;