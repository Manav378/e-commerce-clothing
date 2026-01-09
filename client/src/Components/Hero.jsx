import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const naviagte = useNavigate();
  return (
    <div className="relative w-full md:h-[600px] bg-gray-50">

      {/* Overlay Background */}
      <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/20 z-10"></div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full relative z-20">

        {/* Left Text Block */}
        <div className="flex flex-col justify-center items-center text-center p-8 md:p-16 gap-6">
          
          {/* Small Header */}
          <div className="flex items-center gap-3 text-[12px] tracking-widest text-gray-500 cormorant uppercase">
            <span className="w-8 h-px bg-gray-400"></span>
            Our Bestsellers
            <span className="w-8 h-px bg-gray-400"></span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 cormorant tracking-tight">
            Latest Arrivals
          </h1>

          {/* Subtext */}
          <p className="text-gray-700 text-sm md:text-lg max-w-md cormorant">
            Curated fashion pieces for timeless elegance and everyday comfort. Elevate your style with TRENDCASA.
          </p>

          {/* Shop Now Button */}
          <button onClick={()=>naviagte("/collection")} className="mt-4 cursor-pointer px-8 py-3 bg-black text-white cormorant font-semibold rounded-lg shadow-lg hover:bg-gray-800 transition-all">
            Shop Now
          </button>

        </div>

        {/* Right Image Block */}
        <div className="relative w-full h-[300px] md:h-full overflow-hidden rounded-tl-[80px] rounded-br-[80px] shadow-xl">
          <img 
            src={assets.main_temp}
            alt="TRENDCASA Fashion"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </div>
  );
};

export default Hero;
