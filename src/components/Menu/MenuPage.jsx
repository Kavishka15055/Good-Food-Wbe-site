// components/Menu/MenuPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { 
  FaSearch, 
  FaFilter, 
  FaSortAmountDown, 
  FaHeart, 
  FaRegHeart,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaFire,
  FaLeaf,
  FaStar,
  FaClock,
  FaInfoCircle
} from "react-icons/fa";

const MenuPage = () => {
  const location = useLocation();
  const { addToCart, cart } = useCart();
  const [activeCategory, setActiveCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [quantities, setQuantities] = useState({});
  const categoryRefs = useRef({});

  const menuCategories = [
    {
      id: "starters",
      title: "Starters / Appetizers",
      icon: "",
      items: [
        { 
          id: 1, 
          name: "Spring Rolls", 
          img: "/images/menu/starters/spring-rolls.jpg", 
          price: "550.Rs",
          description: "Crispy vegetable spring rolls with sweet chili sauce",
          prepTime: "15 min",
          spicy: false,
          vegetarian: true,
          popular: true
        },
        { 
          id: 2, 
          name: "Garlic Bread", 
          img: "/images/menu/starters/garlic-bread.jpg", 
          price: "450.Rs",
          description: "Toasted bread with garlic butter and herbs                             .",
          prepTime: "10 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 3, 
          name: "Bruschetta", 
          img: "/images/menu/starters/Bruschetta.jpg", 
          price: "450.Rs",
          description: "Toasted bread topped with fresh tomatoes and basil",
          prepTime: "12 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 4, 
          name: "Chicken Wings", 
          img: "/images/menu/starters/Chicken-Wings.jpg", 
          price: "450.Rs",
          description: "Crispy chicken wings with your choice of sauce",
          prepTime: "20 min",
          spicy: true,
          vegetarian: false,
          popular: true
        },
      ],
    },
    {
      id: "soups",
      title: "Soups",
      icon: "",
      items: [
        { 
          id: 5, 
          name: "Tomato Basil Soup", 
          img: "/images/menu/soups/Tomato-Basil-Soup.jpg", 
          price: "450.Rs",
          description: "Creamy tomato soup with fresh basil",
          prepTime: "15 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 6, 
          name: "Chicken Noodle Soup", 
          img: "/images/menu/soups/Chicken-Noodle-Soup.jpg", 
          price: "450.Rs",
          description: "Chicken soup with vegetables and noodles",
          prepTime: "25 min",
          spicy: false,
          vegetarian: false
        },
        { 
          id: 7, 
          name: "Cream of Mushroom", 
          img: "/images/menu/soups/Cream-of-Mushroom.jpg", 
          price: "450.Rs",
          description: "Rich and creamy mushroom soup",
          prepTime: "18 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 8, 
          name: "Minestrone", 
          img: "/images/menu/soups/Minestrone.jpg", 
          price: "450.Rs",
          description: "Traditional Italian vegetable soup",
          prepTime: "30 min",
          spicy: false,
          vegetarian: true,
          popular: true
        },
      ],
    },
    {
      id: "salads",
      title: "Salads",
      icon: "",
      items: [
        { 
          id: 9, 
          name: "Caesar Salad", 
          img: "/images/menu/salads/Caesar-Salad.jpg", 
          price: "450.Rs",
          description: "Fresh romaine lettuce with Caesar dressing and croutons",
          prepTime: "10 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 10, 
          name: "Greek Salad", 
          img: "/images/menu/salads/Greek-Salad.jpg", 
          price: "450.Rs",
          description: "Mixed greens with feta, olives, and Greek dressing",
          prepTime: "12 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 11, 
          name: "Caprese Salad", 
          img: "/images/menu/salads/Caprese-Salad.jpg", 
          price: "450.Rs",
          description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
          prepTime: "8 min",
          spicy: false,
          vegetarian: true,
          popular: true
        },
        { 
          id: 12, 
          name: "Garden Fresh Salad", 
          img: "/images/menu/salads/Garden-Fresh-Salad.jpg", 
          price: "450.Rs",
          description: "Mixed seasonal vegetables with house dressing",
          prepTime: "10 min",
          spicy: false,
          vegetarian: true
        },
      ],
    },
    {
      id: "main-course",
      title: "Main Course",
      icon: "",
      items: [
        { 
          id: 13, 
          name: "Grilled Chicken", 
          img: "/images/menu/main-course/Grilled-Chicken.jpg", 
          price: "450.Rs",
          description: "Juicy grilled chicken breast with herbs",
          prepTime: "25 min",
          spicy: false,
          vegetarian: false,
          popular: true
        },
        { 
          id: 14, 
          name: "Spaghetti Bolognese", 
          img: "/images/menu/main-course/Spaghetti-Bolognese.jpg", 
          price: "450.Rs",
          description: "Classic Italian pasta with meat sauce",
          prepTime: "20 min",
          spicy: false,
          vegetarian: false
        },
        { 
          id: 15, 
          name: "Margherita Pizza", 
          img: "/images/menu/main-course/Margherita-Pizza.jpg", 
          price: "450.Rs",
          description: "Traditional pizza with tomato, mozzarella, and basil",
          prepTime: "15 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 16, 
          name: "Paneer Butter Masala", 
          img: "/images/menu/main-course/Paneer-Butter-Masala.jpg", 
          price: "450.Rs",
          description: "Indian cottage cheese in rich buttery tomato sauce",
          prepTime: "30 min",
          spicy: true,
          vegetarian: true,
          popular: true
        },
      ],
    },
    {
      id: "burgers-sandwiches",
      title: "Burgers & Sandwiches",
      icon: "",
      items: [
        { 
          id: 17, 
          name: "Classic Beef Burger", 
          img: "/images/menu/burgers-sandwiches/Classic-Beef-Burger.jpg", 
          price: "450.Rs",
          description: "Juicy beef patty with fresh vegetables and sauce",
          prepTime: "15 min",
          spicy: false,
          vegetarian: false,
          popular: true
        },
        { 
          id: 18, 
          name: "Veggie Burger", 
          img: "/images/menu/burgers-sandwiches/Veggie-Burger.jpg", 
          price: "450.Rs",
          description: "Plant-based patty with fresh toppings",
          prepTime: "12 min",
          spicy: false,
          vegetarian: true
        },
        { 
          id: 19, 
          name: "Club Sandwich", 
          img: "/images/menu/burgers-sandwiches/Club-Sandwich.jpg", 
          price: "450.Rs",
          description: "Triple-decker sandwich with chicken, bacon, and vegetables",
          prepTime: "10 min",
          spicy: false,
          vegetarian: false
        },
        { 
          id: 20, 
          name: "Chicken Panini", 
          img: "/images/menu/burgers-sandwiches/Chicken-Panini.jpg", 
          price: "450.Rs",
          description: "Grilled chicken panini with melted cheese",
          prepTime: "8 min",
          spicy: false,
          vegetarian: false
        },
      ],
    },
  ];

  useEffect(() => {
    if (location.hash) {
      const section = document.querySelector(location.hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setActiveCategory(location.hash.replace('#', ''));
      }
    } else {
      window.scrollTo(0, 0);
    }

    // Set up intersection observer for category highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-100px 0px -50% 0px" }
    );

    // Observe all category sections
    menuCategories.forEach(category => {
      const element = document.getElementById(category.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location]);

  // Filter and sort items
  const filteredCategories = menuCategories.map(category => ({
    ...category,
    items: category.items
      .filter(item => {
        const price = parseFloat(item.price.replace(/[^\d.]/g, ""));
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
        return matchesSearch && matchesPrice;
      })
      .sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^\d.]/g, ""));
        
        switch (sortBy) {
          case "price-low":
            return priceA - priceB;
          case "price-high":
            return priceB - priceA;
          case "name":
          default:
            return a.name.localeCompare(b.name);
        }
      })
  })).filter(category => category.items.length > 0);

  const handleAddToCart = (item, quantity = 1) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    setQuantities(prev => ({ ...prev, [item.id]: 1 }));
  };

  const handleQuickView = (item) => {
    setSelectedItem(item);
    setShowQuickView(true);
  };

  const toggleFavorite = (itemId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const updateQuantity = (itemId, change) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;
      const newQuantity = Math.max(1, current + change);
      return { ...prev, [itemId]: newQuantity };
    });
  };

  const scrollToCategory = (categoryId) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  const getCartQuantity = (itemId) => {
    return cart.filter(item => item.id === itemId || item.product_id === itemId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Sticky Header */}
      <div className="fixed top-17 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                <span className="text-sm text-gray-600">Rs {priceRange[0]} - Rs {priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar pl-1">
            {menuCategories.map(category => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium">{category.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="container mx-auto py-15 px-4 w-full ">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-12 ">
            <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">No items found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setPriceRange([0, 2000]);
              }}
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category, index) => (
            <section 
              key={category.id} 
              id={category.id}
              ref={el => categoryRefs.current[category.id] = el}
              className={`mb-16 scroll-mt-24 ${index === 0 ? "pt-4" : "pt-8"}`}
            >
              <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                  {category.items.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((item) => {
                  const quantity = quantities[item.id] || 1;
                  const cartQuantity = getCartQuantity(item.id);
                  
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {/* Item Image */}
                      <div 
                        className="relative h-48 bg-cover bg-center cursor-pointer"
                        style={{ backgroundImage: `url(${item.img})` }}
                        // onClick={() => handleQuickView(item)}
                      >
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex gap-2">
                          {item.popular && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <FaFire className="text-xs" />
                              Popular
                            </span>
                          )}
                          {item.vegetarian && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                              <FaLeaf className="text-xs" />
                              Veg
                            </span>
                          )}
                          {item.spicy && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              🌶️ Spicy
                            </span>
                          )}
                        </div>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(item.id, e)}
                          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition duration-200"
                        >
                          {favorites.has(item.id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-600" />
                          )}
                        </button>

                        {/* Quick View Button */}
                        {/* <button
                          onClick={() => handleQuickView(item)}
                          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-200 hover:scale-110"
                        >
                          <FaInfoCircle className="text-gray-700" />
                        </button> */}
                      </div>

                      {/* Item Details */}
                      <div className="p-4 ">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 ">
                            {item.name}
                          </h3>
                          <span className="text-primary font-bold text-lg">
                            {item.price}
                          </span>
                        </div>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-10">
                          {item.description}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <FaClock className="text-xs" />
                              {item.prepTime}
                            </span>
                            {cartQuantity > 0 && (
                              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                                {cartQuantity} in cart
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-xs" />
                            <span>4.5</span>
                          </div>
                        </div>

                        {/* Add to Cart Controls */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-600 hover:text-primary transition duration-200"
                            >
                              <FaMinus className="text-xs" />
                            </button>
                            <span className="font-semibold text-sm w-6 text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-600 hover:text-primary transition duration-200"
                            >
                              <FaPlus className="text-xs" />
                            </button>
                          </div>

                          <button
                            onClick={() => handleAddToCart(item, quantity)}
                            className="flex-1 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 font-semibold"
                          >
                            <FaShoppingCart />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}
      </div>

      {/* Quick View Modal */}
      {showQuickView && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedItem.img}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={() => setShowQuickView(false)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:scale-110 transition duration-200"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedItem.name}</h2>
                <span className="text-primary font-bold text-2xl">{selectedItem.price}</span>
              </div>

              <p className="text-gray-600 mb-6">{selectedItem.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <FaClock className="text-gray-400" />
                  <span>Prep time: {selectedItem.prepTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedItem.vegetarian ? (
                    <>
                      <FaLeaf className="text-green-500" />
                      <span>Vegetarian</span>
                    </>
                  ) : (
                    <span>Non-Vegetarian</span>
                  )}
                </div>
                {selectedItem.spicy && (
                  <div className="flex items-center gap-2">
                    <span>🌶️ Spicy</span>
                  </div>
                )}
                {selectedItem.popular && (
                  <div className="flex items-center gap-2">
                    <FaFire className="text-red-500" />
                    <span>Popular Choice</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
                  <button
                    onClick={() => updateQuantity(selectedItem.id, -1)}
                    className="text-gray-600 hover:text-primary transition duration-200"
                  >
                    <FaMinus />
                  </button>
                  <span className="font-semibold text-lg w-8 text-center">
                    {quantities[selectedItem.id] || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(selectedItem.id, 1)}
                    className="text-gray-600 hover:text-primary transition duration-200"
                  >
                    <FaPlus />
                  </button>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(selectedItem, quantities[selectedItem.id] || 1);
                    setShowQuickView(false);
                  }}
                  className="flex-1 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 font-semibold text-lg"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style> */}
    </div>
  );
};

export default MenuPage;