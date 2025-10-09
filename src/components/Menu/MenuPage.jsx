// src/pages/MenuPage.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MenuPage = () => {
  const location = useLocation();

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
      {/* Vegetables */}
      <section id="vegetables" className="py-0">
        <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 border-primary pb-2">
          Vegetables
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 shadow-lg rounded-lg bg-white">Carrots</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Potatoes</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Tomatoes</div>
        </div>
      </section>

      {/* Fruits */}
      <section id="fruits" className="py-40">
        <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 border-primary pb-2">
          Fruits
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 shadow-lg rounded-lg bg-white">Apples</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Bananas</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Mangoes</div>
        </div>
      </section>

      {/* Grains */}
      <section id="grains" className="py-40">
        <h2 className="text-3xl font-bold mb-8 text-primary border-b-4 border-primary pb-2">
          Grains
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 shadow-lg rounded-lg bg-white">Rice</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Wheat</div>
          <div className="p-5 shadow-lg rounded-lg bg-white">Corn</div>
        </div>
      </section>
    </div>
  );
};

export default MenuPage;
