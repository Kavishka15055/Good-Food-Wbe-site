// src/pages/MenuPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const MenuPage = () => {
  const location = useLocation();
  const { addToCart } = useCart();

  // ✅ Menu categories (ensure IDs match your backend products table)
  const menuCategories = [
    {
      id: "starters",
      title: "Starters / Appetizers",
      items: [
        { id: 1, name: "Spring Rolls", img: "/images/menu/starters/spring-rolls.jpg", price: "450.Rs" },
        { id: 2, name: "Garlic Bread", img: "/images/menu/starters/garlic-bread.jpg", price: "450.Rs" },
        { id: 3, name: "Bruschetta", img: "/images/menu/starters/Bruschetta.jpg", price: "450.Rs" },
        { id: 4, name: "Chicken Wings", img: "/images/menu/starters/Chicken-Wings.jpg", price: "450.Rs" },
      ],
    },
    {
      id: "soups",
      title: "Soups",
      items: [
        { id: 5, name: "Tomato Basil Soup", img: "/images/menu/soups/Tomato-Basil-Soup.jpg", price: "450.Rs" },
        { id: 6, name: "Chicken Noodle Soup", img: "/images/menu/soups/Chicken-Noodle-Soup.jpg", price: "450.Rs" },
        { id: 7, name: "Cream of Mushroom", img: "/images/menu/soups/Cream-of-Mushroom.jpg", price: "450.Rs" },
        { id: 8, name: "Minestrone", img: "/images/menu/soups/Minestrone.jpg", price: "450.Rs" },
      ],
    },
    {
      id: "salads",
      title: "Salads",
      items: [
        { id: 9, name: "Caesar Salad", img: "/images/menu/salads/Caesar-Salad.jpg", price: "450.Rs" },
        { id: 10, name: "Greek Salad", img: "/images/menu/salads/Greek-Salad.jpg", price: "450.Rs" },
        { id: 11, name: "Caprese Salad", img: "/images/menu/salads/Caprese-Salad.jpg", price: "450.Rs" },
        { id: 12, name: "Garden Fresh Salad", img: "/images/menu/salads/Garden-Fresh-Salad.jpg", price: "450.Rs" },
      ],
    },
    {
      id: "main-course",
      title: "Main Course / Entrees",
      items: [
        { id: 13, name: "Grilled Chicken", img: "/images/menu/main-course/Grilled-Chicken.jpg", price: "450.Rs" },
        { id: 14, name: "Spaghetti Bolognese", img: "/images/menu/main-course/Spaghetti-Bolognese.jpg", price: "450.Rs" },
        { id: 15, name: "Margherita Pizza", img: "/images/menu/main-course/Margherita-Pizza.jpg", price: "450.Rs" },
        { id: 16, name: "Paneer Butter Masala", img: "/images/menu/main-course/Paneer-Butter-Masala.jpg", price: "450.Rs" },
      ],
    },
    {
      id: "burgers-sandwiches",
      title: "Burgers & Sandwiches",
      items: [
        { id: 17, name: "Classic Beef Burger", img: "/images/menu/burgers-sandwiches/Classic-Beef-Burger.jpg", price: "450.Rs" },
        { id: 18, name: "Veggie Burger", img: "/images/menu/burgers-sandwiches/Veggie-Burger.jpg", price: "450.Rs" },
        { id: 19, name: "Club Sandwich", img: "/images/menu/burgers-sandwiches/Club-Sandwich.jpg", price: "450.Rs" },
        { id: 20, name: "Chicken Panini", img: "/images/menu/burgers-sandwiches/Chicken-Panini.jpg", price: "450.Rs" },
      ],
    },
  ];

  // ✅ Scroll to section if hash in URL
  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  // ✅ Handle add to cart using CartContext
  const handleAddToCart = (item) => {
    addToCart(item); // CartContext now handles login check
  };

  return (
    <div className="container mx-auto py-10 px-1">
      {menuCategories.map((category, index) => (
        <section key={category.id} id={category.id} className={index === 0 ? "py-0" : "py-15"}>
          <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 pb-2">
            {category.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {category.items.map((item) => (
              <div
                key={item.id}
                className="relative pb-3 shadow-lg rounded-2xl hover:shadow-xl hover:scale-110 transition-all duration-700 ease-in-out flex flex-col items-center justify-end bg-cover bg-center h-94 w-full text-white overflow-hidden"
                style={{ backgroundImage: `url(${item.img})` }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-2/5 rounded-b-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center p-4 w-full">
                  <h3 className="text-xl font-semibold mb-1">{item.name}</h3>
                  <p className="text-sm mb-3 opacity-90">{item.price}</p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-primary text-white px-10 py-2 rounded-md hover:bg-primary/80 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MenuPage;


//lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll

