import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Banner from "./components/Banner/Banner";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Popup from "./components/Auth/login";
import MenuPage from "./components/Menu/MenuPage";
import Signup from "./components/Auth/signup";
import CartPage from "./components/Cart/CartPage"; // ✅ Cart page
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [user, setUser] = useState(null);

  const HandlePopup = () => setShowPopup(false);

  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully!");
  };

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
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
                <Popup showPopup={showPopup} setShowPopup={setShowPopup} setUser={setUser} />
              </>
            }
          />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<CartPage />} /> {/* ✅ Cart page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
