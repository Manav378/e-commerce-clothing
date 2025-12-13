import React from 'react'

const footer = () => {
  return (

     <footer className={`w-full bg-white py-12 px-6 `}>
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

    {/* LEFT SECTION */}
    <div>
      <h1 className="text-2xl font-semibold tracking-wide cormorant">FOREVER.</h1>
      <p className="text-gray-600 text-sm mt-4 cormorant leading-6">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </p>
    </div>

    {/* MIDDLE SECTION */}
    <div>
      <h2 className="font-semibold text-lg cormorant text-gray-800">COMPANY</h2>
      <ul className="mt-4 space-y-2 text-gray-600 text-sm cormorant">
        <li className="hover:text-black cursor-pointer cormorant">Home</li>
        <li className="hover:text-black cursor-pointer cormorant">About us</li>
        <li className="hover:text-black cursor-pointer cormorant">Delivery</li>
        <li className="hover:text-black cursor-pointer cormorant">Privacy policy</li>
      </ul>
    </div>

    {/* RIGHT SECTION */}
    <div>
      <h2 className="font-semibold text-lg text-gray-800 cormorant">GET IN TOUCH</h2>
      <ul className="mt-4 text-gray-600 text-sm space-y-2">
        <li>+1-212-456-7890</li>
        <li className='cormorant'>contact@foreveryou.com</li>
      </ul>
    </div>

  </div>

  {/* LINE */}
  <div className="h-px bg-gray-300 my-8"></div>

  {/* COPYRIGHT */}
  <p className="text-center text-gray-500 text-sm">
    Copyright 2024 © forever.com – All Rights Reserved.
  </p>
</footer>

   
  )
}

export default footer
