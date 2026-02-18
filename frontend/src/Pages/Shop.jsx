import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiShoppingCart, FiFilter, FiX } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("API Fetch error", err);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const filteredProducts =
    selectedCategories.length === 0
      ? products
      : products.filter((item) => selectedCategories.includes(item.category));

  const categories = [
    { label: "Men's Clothing", value: "men's clothing" },
    { label: "Women's Clothing", value: "women's clothing" },
    { label: "Electronics", value: "electronics" },
    { label: "Jewelery", value: "jewelery" },
  ];

  // --- Skeleton function
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border border-gray-100 p-3 md:p-5 flex flex-col h-full">
      <Skeleton className="aspect-square w-full rounded-xl mb-4" />
      <div className="flex flex-col grow space-y-2">
        <Skeleton width={40} height={10} />
        <Skeleton count={2} height={15} />
        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
          <div className="space-y-1">
            <Skeleton width={30} height={8} />
            <Skeleton width={60} height={20} />
          </div>
          <Skeleton width={40} height={40} borderRadius={12} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20 min-h-screen font-sans">
      
      {/* Mobile Filter Toggle */}
      <button 
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg mb-6 font-bold text-sm shadow-sm"
      >
        <FiFilter /> Filters
      </button>

      <div className="flex gap-10">
        
        {/* Aside / Sidebar */}
        <aside className={`
          fixed inset-0 z-50 bg-white p-6 lg:relative lg:inset-auto lg:z-0 lg:bg-transparent lg:p-0
          transition-transform duration-300 ease-in-out w-72 shrink-0
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-8">
            <h2 className="text-xl font-black italic text-blue-600">Choice Basket</h2>
            <button onClick={() => setIsFilterOpen(false)}><FiX size={24}/></button>
          </div>

          <div className="bg-white lg:border border-gray-100 rounded-3xl lg:p-8 lg:shadow-sm sticky top-24">
            <h2 className="font-black text-gray-900 text-lg mb-6 tracking-tight">Categories</h2>
            <div className="flex flex-col gap-4">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width={18} height={18} />
                    <Skeleton width={120} height={15} />
                  </div>
                ))
              ) : (
                categories.map((item) => (
                  <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      checked={selectedCategories.includes(item.value)}
                      onChange={() => handleCategoryChange(item.value)}
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" 
                    />
                    <span className={`text-sm font-semibold transition-colors ${
                      selectedCategories.includes(item.value) ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {item.label}
                    </span>
                  </label>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {loading ? (
              // Show 6 skeleton cards while loading
              Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
            ) : (
              filteredProducts.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 p-3 md:p-5 flex flex-col hover:shadow-xl transition-all">
                  
                  {/* Product Image */}
                  <div className="relative aspect-square w-full flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-4">
                    <img 
                      src={item.image} 
                      className="h-3/4 object-contain group-hover:scale-110 transition-transform duration-500" 
                      alt={item.title} 
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[9px] font-black text-blue-600 uppercase">
                      {item.category}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col grow">
                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                      <AiFillStar size={14}/>
                      <span className="text-[10px] font-bold text-gray-700">{item.rating.rate}</span>
                    </div>
                    
                    <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 h-8 md:h-10 leading-tight mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 line-through">$1000</span>
                        <span className="text-base md:text-lg font-black text-gray-900">${item.price}</span>
                      </div>
                      <button className="p-2 md:p-3 bg-blue-600 text-white rounded-lg md:rounded-xl hover:bg-black transition-colors shadow-md shadow-blue-100 active:scale-95">
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}