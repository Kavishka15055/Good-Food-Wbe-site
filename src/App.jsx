import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Banner from "./components/Banner/Banner";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Popup from "./components/Auth/login";
import MenuPage from "./components/Menu/MenuPage";
import Signup from "./components/Auth/signup";
import CartPage from "./components/Cart/CartPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import ProfilePage from "./components/Profile/ProfilePage";
import OrdersPage from "./components/Orders/OrdersPage";
import CheckoutPage from "./components/Checkout/CheckoutPage";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const HandlePopup = () => setShowPopup(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("Logged out successfully!");
  };

  return (
    <CartProvider user={user}>
      <Router>
        <div className="overflow-x-hidden pt-[80px] flex flex-col items-center">
          <Navbar
            HandlePopup={HandlePopup}
            user={user}
            handleLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <Banner />
                  <About HandlePopup={HandlePopup} />
                  <Banner />
                  <Contact />
                  <Popup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    setUser={setUser}
                  />
                </>
              }
            />
            {/* Pass HandlePopup to MenuPage */}
            <Route
              path="/menu"
              element={
                <>
                  <MenuPage HandlePopup={HandlePopup} />
                  <Popup
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                    setUser={setUser}
                  />
                </>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
