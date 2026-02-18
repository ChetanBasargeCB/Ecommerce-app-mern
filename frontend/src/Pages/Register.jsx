import React, { useState } from "react";
import registerImg from "../assets/register.png";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlinePhone, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { RiUserAddLine } from "react-icons/ri";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    re_pass: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.phone || !data.password) {
      return toast.error("Please fill all required fields");
    }
    if(data.name.length<3)return toast.error("Name must be have 3 character")

    if (data.password !== data.re_pass) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      const user = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };
      await axios.post("http://localhost:3000/user/register", user);

      toast.success("Account created successfully!");
      setData({ name: "", email: "", phone: "", password: "", re_pass: "" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 pt-28">
      <Toaster position="top-center" />
      
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        
        {/* Left Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-blue-600 p-16 flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
          <div className="relative z-10">
            <h2 className="text-5xl font-black mb-6 leading-[1.1]">Join the <br/> ChoiceBasket.</h2>
            <p className="text-blue-100 text-lg font-medium">Create an account to track orders and get personalized recommendations.</p>
          </div>
          <div className="relative z-10">
            <img 
              src={registerImg} 
              alt="Register graphic" 
              className="w-full h-auto drop-shadow-2xl" 
            />
          </div>
        </div>

        {/* Right Section: Form */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-black text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500 font-medium">Start your shopping journey with us today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input Fields */}
            {[
              { label: "Full Name", name: "name", type: "text", icon: <HiOutlineUser />, placeholder: "Enter your full name" },
              { label: "Email Address", name: "email", type: "email", icon: <HiOutlineMail />, placeholder: "Enter your email" },
              { label: "Phone Number", name: "phone", type: "number", icon: <HiOutlinePhone />, placeholder: "Enter your phone number" }
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-[12px] font-bold text-gray-700 uppercase tracking-widest ml-1">{field.label}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">{field.icon}</span>
                  <input 
                    name={field.name}
                    type={field.type}
                    value={data[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full bg-white border border-gray-300 py-3 pl-12 pr-4 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none font-medium text-gray-800"
                  />
                </div>
              </div>
            ))}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                <input 
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Create a password" 
                  className="w-full bg-white border border-gray-300 py-3 pl-12 pr-12 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none font-medium text-gray-800"
                />
                <button 
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                >
                  {showPass ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-gray-700 uppercase tracking-widest ml-1">Confirm Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
                <input 
                  name="re_pass"
                  type="password"
                  value={data.re_pass}
                  onChange={handleChange}
                  placeholder="Confirm your password" 
                  className="w-full bg-white border border-gray-300 py-3 pl-12 pr-4 rounded-lg focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all outline-none font-medium text-gray-800"
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-gray-900 text-white py-4 rounded-lg font-black text-sm flex items-center justify-center gap-3 shadow-lg transition-all active:scale-95 uppercase tracking-widest mt-6 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><RiUserAddLine size={20} /> Create Account</>
              )}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600 font-bold">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-gray-900 transition-colors">Login Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}