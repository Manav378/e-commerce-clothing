import React from 'react'
import { assets } from '../assets/assets'
const ourPlolicy = () => {
  return (
    <div>
                 {/* Policy Section — Fully Responsive */}
      <section className={`features flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-28 lg:gap-48 xl:gap-60 my-12 w-full `}>

        {/* 1st Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.exchange} className="w-8 md:w-12" alt="Easy Exchange" />
          </div>
          <h3 className="text-sm md:text-lg font-semibold">Easy Exchange Policy</h3>
          <p className="text-gray-500 text-xs md:text-sm">
            We offer hassle free exchange policy
          </p>
        </div>

        {/* 2nd Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.returnPolicy} className="w-8 md:w-12" alt="Return Policy" />
          </div>
          <h3 className="text-sm md:text-lg  cormorant font-semibold">7 Days Return Policy</h3>
          <p className="text-gray-500 cormorant  text-xs md:text-sm">
            We provide 7 days free return policy
          </p>
        </div>

        {/* 3rd Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.support} className="w-8 md:w-12" alt="Customer Support" />
          </div>
          <h3 className="text-sm md:text-lg cormorant font-semibold">Best customer support</h3>
          <p className="text-gray-500 text-xs cormorant  md:text-sm">
            We provide 24/7 customer support
          </p>
        </div>

      </section>
    </div>
  )
}

export default ourPlolicy
