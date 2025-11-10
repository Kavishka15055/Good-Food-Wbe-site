import React from "react";
import CARD_2 from "../../assets/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";
import Logo from "../../assets/logo.jpg";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Left section (Auth Form Area) */}
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 ">
        <div className="flex items-center space-x-2">
          <img
          src={Logo}
          alt="FinTrack Logo"
          className="w-15 h-15 object-contain"
        />
        <h2 className="text-4xl font-medium text-black">FinTrack</h2>
        </div>
        
        {children}
      </div>

      {/* Right section (Decorative + Stats) */}
      <div className="hidden md:block w-[40vw] h-screen bg-cyan-50 bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        {/* Decorative shapes */}
        <div className="w-48 h-48 rounded-[40px] bg-sky-500 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-blue-900 absolute top-[30%] -right-10" />
        <div className="w-30 h-30 rounded-[70px] border-[15px] border-emerald-400 absolute top-[22%] right-[13%]" />
        <div className="w-48 h-48 rounded-[40px] bg-emerald-400 absolute -bottom-7 -left-5" />

        {/* Stats card */}
        <div className="grid grid-cols-1 z-20 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="570,000"
            color="bg-blue-900"
          />
        </div>

        {/* Image */}
        <img
          src={CARD_2}
          alt="Expense card"
          className="w-64 lg:w-[90%] absolute bottom-10 right-5 shadow-lg shadow-blue-400/15 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default AuthLayout;

const StatsInfoCard = ({ icon, label, value, color }) => {
  return (
    <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
      <div
        className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}
      >
        {icon}
      </div>
      <div>
        <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
        <span className="text-[20px] font-semibold">${value}</span>
      </div>
    </div>
  );
};
