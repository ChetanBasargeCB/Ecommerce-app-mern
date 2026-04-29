import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// --- VALIDATION LOGIC ---
function Validation(email, password) {
  let errors = { email: "", password: "", status: true };

  if (!email) {
    errors.email = "Email is required";
    errors.status = false;
  }
  if (!password) {
    errors.password = "Password is required";
    errors.status = false;
  }
  return errors;
}

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showpassword, setShowpassword] = useState(false);
  const [error, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handelInput = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error[name]) setError(prev => ({ ...prev, [name]: "" }));
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const validate = Validation(data.email, data.password);
    
    if (!validate.status) {
      setError({
        email: validate.email,
        password: validate.password,
      });
      return;
    }

    try {
      setLoading(true);
      const resp = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "content-type": "Application/json" },
        body: JSON.stringify(data),
      });

   

      if (resp.ok) {
        setLoading(false);
        toast.success("Login Successful");
        return setTimeout(() => {
          navigate("/")
        }, 3000);;
      }

      if (resp.status === 404 || resp.status === 401) {
        setLoading(false);
        toast.error(result.message || "Invalid Credentials");
        return;
      }
    } catch (err) {
      setLoading(false);
      toast.error("Login Error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 lg:p-8">
      <ToastContainer/>
      <div className="flex w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-125">
        
        {/* LEFT SIDE: BRANDING */}
        <div className="hidden lg:flex w-[40%] bg-indigo-600 p-10 text-white flex-col justify-between relative">
          <div className="relative z-10">
            <Link to={"/"} className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
              &lt; Home Page
            </Link>
          </div>

          <div className="relative z-10 mb-20">
            <h1 className="text-5xl font-bold leading-tight mb-4">Welcome Back</h1>
            <p className="text-indigo-100 mb-6">Don't have an account yet?</p>
            <Link to={"/register"} className="px-8 py-2 border border-white rounded-full hover:bg-white hover:text-indigo-600 transition-all font-medium inline-block">
              Sign up
            </Link>
          </div>

          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full opacity-50"></div>
        </div>

        {/* RIGHT SIDE: THE FORM */}
        <div className="w-full lg:w-[60%] p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-sm mx-auto w-full">
            <h2 className="text-3xl font-bold text-indigo-700 text-center mb-8">Login</h2>
            
            <form onSubmit={handelSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
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
                    placeholder="••••••••"
                    onChange={handelInput}
                    value={data.password}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl border outline-none transition-all ${error.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-indigo-400'}`}
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowpassword(!showpassword)} 
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showpassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {error.password && <p className="text-red-500 text-[10px] mt-1 font-semibold">{error.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="w-4 h-4 accent-indigo-600 rounded border-gray-300" />
                  <label htmlFor="remember" className="text-xs text-gray-500">Remember me</label>
                </div>
                <button type="button" className="text-xs text-indigo-600 font-semibold hover:underline">Forgot password?</button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-bold shadow-lg hover:bg-indigo-700 active:scale-95 transition-all mt-2 disabled:bg-indigo-400"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}