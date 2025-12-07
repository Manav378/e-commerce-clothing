import React from 'react'
import { assets } from '../assets/assets'

const Hero = ({open , setopen}) => {
  return (
    <div className={`relative flex items-center justify-center transition-all duration-800  h-[480px] w-full ${open ? 'translate-x-[-500%]' : 'translate-x-0' }`}>
        {/* text inside main template  */}
      <div className='text w-[50%] border border-gray-600  h-full'>
        <div className=" w-full h-full flex flex-col items-center justify-center text-center gap-2">
  
  {/* Top small text with lines */}
  <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-600">
    <span className="w-6 h-px bg-gray-400"></span>
    <span>OUR BESTSELLERS</span>
    <span className="w-6 h-px bg-gray-400"></span>
  </div>

  {/* Main heading */}
  <h1 className="text-3xl text-gray-700 font-serif">Latest Arrivals</h1>

  {/* Shop now with line */}
  <div className="flex items-center gap-2 text-[10px] tracking-widest text-gray-600">
    <span>SHOP NOW</span>
    <span className="w-6 h-px bg-gray-400"></span>
  </div>

</div>

      </div>


         {/* mainn image inside template  */}
      <div className='image w-[50%] b h-full'>
        <img src={assets.main_temp} className=' object-cover w-full h-full' alt="" />
      </div>
    </div>
  )
}

export default Hero
