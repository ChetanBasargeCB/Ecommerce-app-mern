import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiShoppingCart, FiFilter, FiX } from "react-icons/fi";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // Mobile toggle state
  const [selectedCategories,setSelectedCategories]= useState([])

  //This will hold the products to show on screen 
  // if the user not selected any Categories show all Categories 
  // if user selected any categories then show that only
  const filteredProducts =
 selectedCategories.length === 0
    ? products
    : products.filter((item) =>
        selectedCategories.includes(item.category)
      );


  //handel user selected item showing
  const handleCategoryChange = (value) => {
  setSelectedCategories((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value) // if TRUE – checkbox was already checked and it removes uchecked category cards
      : [...prev, value] // add if checked
  );
};


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
  console.log(products)

 const categories = [
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" },
];


  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-20 min-h-screen font-sans">
      
      {/* Mobile Filter Toggle Button */}
      <button 
        onClick={() => setIsFilterOpen(true)}
        className="lg:hidden flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg mb-6 font-bold text-sm shadow-sm"
      >
        <FiFilter /> Filters
      </button>

      <div className="flex gap-10">
        
        {/* Aside / Sidebar */}
        <aside className={`
          fixed inset-0 z-60 bg-white p-6 lg:relative lg:inset-auto lg:z-0 lg:bg-transparent lg:p-0
          transition-transform duration-300 ease-in-out w-72 shrink-0
          ${isFilterOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-8">
            <h2 className="text-xl font-black italic text-blue-600">ShopCart</h2>
            <button onClick={() => setIsFilterOpen(false)}><FiX size={24}/></button>
          </div>

          <div className="bg-white lg:border border-gray-100 rounded-3xl lg:p-8 lg:shadow-sm sticky top-24">
            <h2 className="font-black text-gray-900 text-lg mb-6">Categories</h2>
            <div className="flex flex-col gap-4">
              {categories.map((item) => (
                <label key={item.label} className="flex items-center gap-3 cursor-pointer group">
                  <input checked={selectedCategories.includes(item.value)}
                  onChange={()=>handleCategoryChange(item.value)}
                   type="checkbox"  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                  <span className="text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition-colors">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

           
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

            {filteredProducts.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 p-3 md:p-5 flex flex-col hover:shadow-xl transition-all">
                
                {/* Product Image */}
                <div className="relative aspect-square w-full flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-4">
                  <img 
                    src={item.image} 
                    className="h-3/4 object-contain group-hover:scale-110 transition-transform duration-500" 
                    alt="" 
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
                  
                  <h3 className="text-xs md:text-sm font-bold text-gray-800 line-clamp-2 h-8 md:h-10 leading-tight mb-4">
                    {item.title}
                  </h3>

                  <div className="mt-auto flex flex-col md:flex-row md:items-center justify-between gap-3 pt-4 border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 line-through">$1000</span>
                      <span className="text-base md:text-lg font-black text-gray-900">${item.price}</span>
                    </div>
                    <button className="p-2 md:p-3 bg-blue-600 text-white rounded-lg md:rounded-xl hover:bg-gray-900 transition-colors shadow-md shadow-blue-100">
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}