import { IoSearchOutline, IoChevronDownOutline } from "react-icons/io5";
import { IoMdContact } from "react-icons/io"; // Fixed: IoMd icons are in /io
import { GrCart } from "react-icons/gr";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Hot Deals", path: "/deals" },
  ];

  return (
    <nav className="flex justify-center items-center h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-sm">
      <div className="flex w-full max-w-7xl px-8 justify-between items-center">
        {/* Logo Section */}
        <div className="shrink-0 cursor-pointer group">
          <NavLink
            to="/"
            className="flex items-center text-xl font-black tracking-tighter text-gray-900"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-yellow-300 shadow-sm transition-transform group-hover:scale-105 group-hover:bg-blue-700">
              CB
            </span>

            <div className="ml-3 flex flex-col leading-none">
              <span className="text-lg text-gray-900">Choice</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">
                Basket
              </span>
            </div>
          </NavLink>
        </div>

        {/* Search box */}
        <div className="relative flex-1 max-w-xs hidden lg:block">
          <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            className="w-full py-2 pl-12 pr-4 bg-gray-100/50 border border-transparent rounded-full focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none text-sm"
            placeholder="Search products..."
          />
        </div>

        {/* Nav Pages */}
        <div className="hidden md:flex items-center gap-8 mx-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-bold transition-all duration-300 py-2 ${
                  isActive
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 after:rounded-full"
                    : "text-gray-500 hover:text-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Action Items */}
        <div className="flex items-center gap-8 ml-6">
          {/* Account Dropdown on Hover */}
          <div className="relative group py-4">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <IoMdContact className="text-gray-500 text-2xl group-hover:text-blue-600 transition-colors" />
              <span className="hidden sm:inline text-sm font-semibold text-gray-600 group-hover:text-blue-600">
                Account
              </span>
              <IoChevronDownOutline className="text-xs text-gray-400 group-hover:rotate-180 transition-transform duration-200" />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full w-40 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-2 flex flex-col gap-1">
                <NavLink
                  to="/profile"
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                >
                  Profile
                </NavLink>
              </div>
            </div>
          </div>

          {/* Cart Section */}
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <div className="relative p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <GrCart className="text-xl text-gray-700 group-hover:text-blue-600" />
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 rounded-full border-2 border-white">
                2
              </span>
            </div>
            <span className="hidden sm:inline text-sm font-semibold text-gray-600 group-hover:text-blue-600">
              Cart
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
