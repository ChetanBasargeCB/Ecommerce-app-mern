import React, { useState } from "react";
import loginImg from "../assets/login.png";
import toast, { Toaster } from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import { RiLoginCircleLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", data);
    if (data.password === "") return toast.error("Password is requred");

    try {
      const user = { email: data.email, password: data.password };
      const res = await axios.post("http://localhost:3000/user/login", user);
      toast.success(res.data.message);
      setData({ email: "", password: "" });

      setTimeout(() => {
        navigate("/")
      }, 1500);

    } catch (err) {
      console.log(err);
      if (err.response) {
        const status = err.response.status; 
        if(status===401) return toast.error("Invalid Credential")
        if(status===400) return toast.error("Bad Request")
      }

      toast.error("Server error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-10 pt-24">
      <Toaster />
      {/* Centered Login Card */}
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden flex flex-col md:row lg:flex-row border border-gray-100">
        {/* Left Section: Image/Branding */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 flex-col justify-center items-center text-white relative">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4 tracking-tighter">
              Welcome!
            </h2>
            <p className="text-blue-100 mb-8 font-medium">
              Log in to ChoiceBasket to access your account and start shopping.
            </p>
            <img
              src={loginImg}
              alt="login graphic"
              className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300 rounded-lg blur-3xl opacity-30"></div>
        </div>

        {/* Right Section: The Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-3xl font-black text-gray-900">Sign In</h1>
            <p className="text-gray-500 mt-2 font-medium">
              Enter your details below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Email
              </label>
              <div className="relative group">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-xl" />
                <input
                  required
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="user@choicebasket.com"
                  className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-4 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium text-sm"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <div className="relative group">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors text-xl" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 py-4 pl-12 pr-12 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 p-1"
                >
                  {showPass ? (
                    <HiOutlineEyeOff size={22} />
                  ) : (
                    <HiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <button className="w-full bg-blue-600 hover:bg-black text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-3 shadow-xl shadow-blue-100 transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
              <RiLoginCircleLine size={20} /> Login to Account
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 font-medium">
              New to ChoiceBasket?{" "}
              <NavLink
                to="/register"
                className="text-blue-600 font-black hover:underline underline-offset-4"
              >
                Create Account
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
