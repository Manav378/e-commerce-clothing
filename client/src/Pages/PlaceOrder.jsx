import React, { useState } from "react";
import CartTotal from "../Components/CartTotal.jsx";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/orders");
  };

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-10 bg-gray-50">
      {/* MAIN WRAPPER */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* LEFT : DELIVERY INFO */}
        <div className="w-full lg:w-[65%] bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-6 border-b pb-2">
            Delivery Information
          </h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="input" placeholder="First Name" />
            <input className="input" placeholder="Last Name" />

            <input className="input sm:col-span-2" placeholder="Email Address" />
            <input className="input sm:col-span-2" placeholder="Street" />

            <input className="input" placeholder="City" />
            <input className="input" placeholder="State" />

            <input className="input" placeholder="Zipcode" />
            <input className="input" placeholder="Country" />

            <input className="input sm:col-span-2" placeholder="Phone" />
          </form>
        </div>

        {/* RIGHT : CART + PAYMENT */}
        <div className="w-full lg:w-[35%] bg-white p-6 rounded-xl shadow space-y-6">

          <CartTotal />

          <h2 className="text-lg font-semibold border-b pb-2">
            Payment Method
          </h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setMethod("strip")}
              className={`payment-btn ${
                method === "strip" ? "bg-green-400" : "bg-slate-200"
              }`}
            >
              <img src={assets.strip} className="h-6" />
            </button>

            <button
              onClick={() => setMethod("razorpay")}
              className={`payment-btn ${
                method === "razorpay" ? "bg-green-400" : "bg-slate-200"
              }`}
            >
              <img src={assets.razorpay} className="h-6" />
            </button>

            <button
              onClick={() => setMethod("cod")}
              className={`payment-btn ${
                method === "cod" ? "bg-green-400" : "bg-slate-200"
              }`}
            >
              Cash on Delivery
            </button>
          </div>

          <button
            onClick={handleClick}
            className="w-full bg-black text-white h-12 rounded-lg
                       hover:bg-gray-800 transition font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
