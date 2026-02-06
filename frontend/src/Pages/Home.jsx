import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { AiFillStar } from "react-icons/ai"; 
import { FiShoppingCart } from "react-icons/fi"; 
import Shop from "./Shop";

export default function Home() {
  const [products, setProducts] = useState(null);
  
  const fetchData = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      console.log(res.data[1].category)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
   
 useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Container with max-width for better large-screen appearance */}
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Trending Products</h2>
        
        {/* Responsive Grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products && products.map((item) => (
            <div 
              key={item.id} 
              className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Container with fixed height and centering */}
              <div className="h-52 w-full flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="h-40 object-contain group-hover:scale-110 transition-transform duration-300" 
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col grow">

                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.category}</span>

                  <div className="flex items-center bg-green-50 px-2 py-0.5 rounded text-green-700 text-xs font-bold">
                    {item.rating.rate} <AiFillStar className="ml-0.5 text-yellow-500" />
                  </div>
                  
                </div>

                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 h-10 mb-2">
                  {item.title}
                </h3>

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-black text-gray-900">${item.price}</span>
                    <span className="text-sm text-gray-400 line-through">$1000</span>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors">
                    <FiShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}