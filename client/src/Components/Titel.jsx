import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="flex items-center gap-4">
        {/* Left line */}
        <span className="h-px w-12 md:w-20 bg-gray-300"></span>

        {/* Text */}
        <h2 className="flex items-center gap-2 text-lg md:text-2xl lg:text-3xl tracking-[0.2em] uppercase">
          <span className="font-light cormorant text-gray-500">{text1}</span>
          <span className="font-medium cormorant text-black">{text2}</span>
        </h2>

        {/* Right line */}
        <span className="h-px w-12 md:w-20 bg-gray-300"></span>
      </div>
    </div>
  );
};

export default Title;
