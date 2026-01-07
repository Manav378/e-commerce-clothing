import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-b from-gray-50 to-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 cormorant">
          About <span className="text-black">TRENDCASA</span>
        </h1>
        <p className="mt-5 max-w-2xl mx-auto text-gray-600 text-lg cormorant">
          Where modern fashion meets timeless comfort. Curated styles for
          everyday confidence.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src={assets.aboutImg}
              alt="TrendCasa Fashion Aesthetic"
              className="w-full max-w-md object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4 cormorant">
            Who We Are
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4 cormorant">
            <span className="font-semibold text-gray-900">TRENDCASA</span> is a
            modern clothing brand focused on minimal aesthetics, premium
            quality, and everyday wearability. We believe fashion should feel
            effortless, comfortable, and expressive.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 cormorant">
            Every piece at TrendCasa is thoughtfully selected to help you build
            a wardrobe that feels elegant, versatile, and timeless.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-4 cormorant">
            Why Choose Us?
          </h3>

          <ul className="space-y-3 text-gray-700 cormorant">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Premium-quality fabrics
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Minimal & modern designs
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Affordable fashion
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Easy & secure shopping
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
