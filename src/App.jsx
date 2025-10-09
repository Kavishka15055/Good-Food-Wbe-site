// src/App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx/Navbar";
import Hero from "./components/Hero/Hero";
import Banner from "./components/Banner/Banner";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Popup from "./components/Popup/Popup";
import MenuPage from "./components/Menu/MenuPage"; // 👈 new page
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const HandlePopup = () => {
    setShowPopup(false);
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
        <Navbar HandlePopup={HandlePopup} />
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Banner />
                <About HandlePopup={HandlePopup} />
                <Banner />
                <Contact />
                <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
              </>
            }
          />
          {/* Menu Page */}
          <Route path="/menu" element={<MenuPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
