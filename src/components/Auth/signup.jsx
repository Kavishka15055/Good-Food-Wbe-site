import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Signup successful!");
        console.log("User created:", data);
        window.location.href = "/"; // Redirect to login or home
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full  px-4">
      <div className="bg-white rounded-xl sm:px-50 w-full  ">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <p className="text-[13px] text-gray-700 mt-2 text-justify">
            By clicking <span className="font-semibold">Join</span> I agree to the{" "}
            <a href="#" className="text-primary underline">Hilton Honors Program Terms and Conditions</a>, 
            and I agree to the collection, use, sharing and transfer of information as set out in the{" "}
            <a href="#" className="text-primary underline">Hilton Global Privacy Statement</a>. 
            I also agree to receive special offers and promotions from Hilton via email and direct mail. 
            I understand that I can unsubscribe from offers and promotions by changing my subscription preferences in my Hilton Honors profile. 
            California Consumers, learn about{" "}
            <a href="#" className="text-primary underline">
              Hilton's collection and use of your personal information
            </a>.
          </p>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md mt-4 font-semibold hover:bg-primary/90 transition-all duration-200"
          >
            Join Now
          </button>

          <p className="text-sm text-center mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;