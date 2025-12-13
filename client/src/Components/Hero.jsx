import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div 
      className={`relative w-full 
      md:h-[480px] `}
    >

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full">

        {/* Left Text Block */}
        <div className="flex items-center border border-gray-500 justify-center text-center p-6">
          <div className="flex flex-col items-center gap-2">

            <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-600">
              <span className="w-6 h-px bg-gray-400"></span>
              <span>OUR BESTSELLERS</span>
              <span className="w-6 h-px bg-gray-400"></span>
            </div>

            <h1 className="text-3xl text-gray-700 font-serif">
              Latest Arrivals
            </h1>

            <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-600 cursor-pointer hover:text-black">
              <span>SHOP NOW</span>
              <span className="w-6 h-px bg-gray-400"></span>
            </div>

          </div>
        </div>

        {/* Right Image Block */}
        <div>
          <img 
            src={assets.main_temp}
            className="w-full h-[300px] md:h-full object-cover"
            alt=""
          />
        </div>
      </div>

    </div>
  )
}

export default Hero
