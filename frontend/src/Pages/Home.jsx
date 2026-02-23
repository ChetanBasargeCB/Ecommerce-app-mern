import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { AiFillStar } from "react-icons/ai"; 
import { FiShoppingCart, FiChevronLeft, FiChevronRight } from "react-icons/fi"; 
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// --- FIXED SWIPER IMPORTS ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

export default function Home() {
  const [products, setProducts] = useState(null);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalepage] = useState(10);
  
  const limit = 8;
  const carouselImages = [img1, img2, img3, img4];

  useEffect(() => {
    const fetchProduct = async () => {
      setProducts(null); 
      try {
        const res = await axios.get(`http://localhost:3000/user/product?page=${page}&limit=${limit}`);
        setProducts(res.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProduct();
  }, [page]);

  useEffect(() => {
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, [page]);

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 flex flex-col h-full">
      <Skeleton className="h-52 w-full rounded-xl mb-5" />
      <div className="flex justify-between mb-3">
        <Skeleton width={60} height={10} />
        <Skeleton width={40} height={15} />
      </div>
      <Skeleton count={2} className="mb-4" />
      <div className="mt-auto flex justify-between items-center pt-4">
        <Skeleton width={40} height={10} />
        <Skeleton width={45} height={45} borderRadius={12} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16 font-sans">
      <Navbar />

      <div className="w-full max-w-7xl mx-auto px-4 mt-6 h-50 md:h-100">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="h-full rounded-3xl overflow-hidden shadow-xl"
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Trending Products</h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>

        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
            Viewing page {page} results
          </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {!products ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            products.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col">
                <div className="h-52 w-full flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden mb-5">
                  <img src={item.images} alt="" className="h-36 object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex flex-col grow">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-blue-600 font-black">{item.category}</span>
                    <div className="flex items-center bg-yellow-400/10 px-2 py-0.5 rounded text-yellow-700 text-xs font-bold">
                      {item.rating?.rate} <AiFillStar className="ml-0.5" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 line-clamp-2 h-10 mb-4 leading-tight">{item.title}</h3>
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="block text-[10px] text-gray-400 line-through">$1000</span>
                      <span className="text-xl font-black text-gray-900">${item.price}</span>
                    </div>
                    <button className="p-3 bg-blue-600 hover:bg-black text-white rounded-xl transition-all duration-300 shadow-lg shadow-blue-100 active:scale-95">
                      <FiShoppingCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <div className="mt-16 flex flex-col items-center justify-center gap-6 border-t border-gray-100 pt-10">
          <div className="flex items-center bg-white border border-gray-200 rounded-2xl p-1 shadow-sm">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 transition-all text-gray-600">
              <FiChevronLeft size={24} />
            </button>
            <div className="flex items-center px-6 gap-3">
              <span className="text-sm font-medium text-gray-400">Page</span>
              <span className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-xl font-bold">{page}</span>
              <span className="text-sm font-medium text-gray-400">of {totalpage}</span>
            </div>
            <button disabled={page === totalpage} onClick={() => setPage(page + 1)} className="p-3 rounded-xl hover:bg-gray-100 disabled:opacity-30 transition-all text-gray-600">
              <FiChevronRight size={24} />
            </button>
          </div>
          
        </div>
      </div>
    </div>
  ); 
}