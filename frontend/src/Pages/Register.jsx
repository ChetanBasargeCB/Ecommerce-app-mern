import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

// --- UPDATED VALIDATION LOGIC ---
const validation = (name, email, phone, password) => {
  let errors = { name: "", email: "", phone: "", password: "", status: true };
  
  if (!name) { errors.name = "Full name is required"; errors.status = false; }
  if (!email) { errors.email = "Email is required"; errors.status = false; }

  
  // Password Validation: 6+ chars, 1 digit, 1 special char
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  if (!password) { 
    errors.password = "Password is required"; 
    errors.status = false; 
  } else if (!passwordRegex.test(password)) {
    errors.password = "Must be 6+ chars with 1 digit and 1 special character";
    errors.status = false;
  }

  // Phone number validation
  if(!phone){
     errors.phone = "Phone is required"; errors.status = false; 

  } else if (phone.length!=10 || phone.length>10){
     errors.phone = "Phone is number must be 10 digit only"; errors.status = false; 
  }

  return errors;
}

export default function Register() {
  const [data, setData] = useState({ name: "", email: "", phone: "", password: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) setError(prev => ({ ...prev, [name]: "" }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    
   
    const validate = validation(data.name, data.email, data.phone, data.password);
    
    if (!validate.status) {
      setError({ name: validate.name, email: validate.email, phone: validate.phone, password: validate.password });
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "Application/json" },
        body: JSON.stringify(data)
      });

      if (resp.ok) {
        toast.success("Account Created");
        setLoading(false);
        setTimeout(() => { navigate("/login"); }, 3000);
      }

      const info = await resp.json();
      if (resp.status === 409) {
        toast.error(info.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      toast.error("Register Server error...");
      setLoading(false);
    }
    
    // Optional: Reset checkbox on success
    // setIsChecked(false); 
    setData({ name: "", email: "", phone: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8 mt-8">
      <ToastContainer/>
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-150">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="hidden lg:flex w-[40%] bg-indigo-600 p-10 text-white flex-col justify-between relative">
          <div className="relative z-10">
             <Link to={"/"} className="text-sm font-medium opacity-80 cursor-pointer hover:opacity-100">&lt; Home Page</Link>
          </div>
          <div className="relative z-10 mb-50">
            <h1 className="text-5xl font-bold leading-tight mb-4">Get Started</h1>
            <p className="text-indigo-100 mb-6">Already have an account?</p>
            <Link to={"/login"} className="px-8 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition-all font-medium">
              Log in
            </Link>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50"></div>
        </div>

        {/* RIGHT SIDE: THE FORM */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 flex flex-col justify-center relative">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-2xl font-bold text-indigo-700 text-center mb-8">Create account</h2>
            
            <form onSubmit={handelSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email</label>
                <input
                  name="email"
                  type="email"
                  onChange={handelInput}
                  value={data.email}
                  className={`w-full mt-1 px-4 py-2.5 rounded-xl border outline-none transition-all ${error.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-400'}`}
                />
                {error.email && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.email}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
                <div className="relative">
                  <input
                    name="password"
                    type={showpassword ? "text" : "password"}
                    onChange={handelInput}
                    value={data.password}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl border outline-none transition-all ${error.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-400'}`}
                  />
                  <button type="button" onClick={() => setShowpassword(!showpassword)} className="absolute right-3 top-3.5 text-gray-400">
                    {showpassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.password}</p>}
              </div>

              {/* Name */}
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Full Name</label>
                <input
                  name="name"
                  type="text"
                  onChange={handelInput}
                  value={data.name}
                  className={`w-full mt-1 px-4 py-2.5 rounded-xl border outline-none transition-all ${error.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-400'}`}
                />
                {error.name && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.name}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  onChange={handelInput}
                  value={data.phone}
                  className={`w-full mt-1 px-4 py-2.5 rounded-xl border outline-none transition-all ${error.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-400'}`}
                />
                {error.phone && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.phone}</p>}
              </div>

            

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all mt-2"
              >
                {loading ? "Signing..." : "Sign up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}