import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

function Popup({ showPopup, setShowPopup, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        // ✅ Store user with ID
        const user = {
          id: data.user.id,        // <-- important
          firstName: data.user.firstName,
          email: data.user.email,
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // persist
        setShowPopup(true);
        navigate("/");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong");
    }
  };

  return (
    <>
      {!showPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white rounded-md w-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-dark">Login</h1>
              <IoCloseOutline
                className="text-2xl cursor-pointer"
                onClick={() => setShowPopup(true)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                className="w-full bg-primary text-white py-2 rounded-md font-semibold hover:bg-primary/90 transition duration-200"
                onClick={handleLogin}
              >
                Login
              </button>

              <p className="text-[13px] text-slate-800 text-center mt-2">
                Don't have an account?{" "}
                <Link className="font-medium text-primary underline" to="/signup">
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Popup;

//lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
