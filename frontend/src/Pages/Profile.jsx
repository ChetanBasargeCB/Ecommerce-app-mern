import React, { useEffect, useState } from "react";
import { IoLogOutOutline, IoMailOutline, IoCallOutline, IoPersonOutline, IoBagCheckOutline, IoTrophyOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "content-type": "Application/json",
          },
        });

        // If server returns Unauthorized (401) or Not Found (404)
        if (!res.ok) {
          toast.error("Please login to access your profile");
          setTimeout(() => {
            navigate("/login");
          }, 2500);
          return;
        }

        const result = await res.json();
        setUser(result);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load profile. Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const resp = await fetch("http://localhost:3000/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const result = await resp.json();
      
      toast.success(result.message || "Logged out successfully");
      
      setTimeout(() => {
        navigate("/");
        // Optional: reload to clear any global auth states
        window.location.reload(); 
      }, 2000);
    } catch (error) {
      toast.error("Logout failed");
      setIsLoggingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 font-semibold text-gray-500 text-lg">
        <div className="animate-pulse">Loading Profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
      <ToastContainer position="top-center" autoClose={2000} />
      
      {/* Only render content if user exists */}
      {user && (
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Account</h1>
            <p className="text-gray-500">Manage your profile and account settings</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sidebar Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-fit">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 border-4 border-white shadow-sm">
                  <IoPersonOutline className="text-5xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-sm text-blue-600 font-medium mb-8 uppercase tracking-widest">Customer</p>
                
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  <IoLogOutOutline className="text-xl" />
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>

            {/* Main Info Card */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="border-b border-gray-100 px-8 py-5">
                  <h3 className="font-bold text-gray-800 text-lg">Personal Information</h3>
                </div>
                
                <div className="p-8 space-y-8">
                  <ProfileDetail icon={<IoPersonOutline />} label="Full Name" value={user.name} />
                  <ProfileDetail icon={<IoMailOutline />} label="Email Address" value={user.email} />
                  <ProfileDetail icon={<IoCallOutline />} label="Phone Number" value={user.phone || "Not Provided"} />
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                <StatCard icon={<IoBagCheckOutline />} color="bg-blue-600" label="Total Orders" value="0" />
                <StatCard icon={<IoTrophyOutline />} color="bg-amber-500" label="Reward Points" value="0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Sub-components for cleaner JSX
function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-5">
      <div className="p-3 bg-gray-50 rounded-xl text-gray-400 text-2xl">{icon}</div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className="text-gray-900 font-semibold text-lg">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ icon, color, label, value }) {
  return (
    <div className={`${color} rounded-3xl p-6 text-white shadow-xl shadow-opacity-20 flex items-center gap-4`}>
      <div className="text-3xl opacity-80">{icon}</div>
      <div>
        <p className="text-xs font-medium opacity-80 mb-1">{label}</p>
        <h4 className="text-2xl font-bold">{value}</h4>
      </div>
    </div>
  );
}