import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from "../Context/ShopContext";

const Contact = () => {

  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { backendUrl } = useContext(ShopContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/contact', { Name, email, message });
      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-20 px-6 text-center bg-gray-50">
        <h1 className="text-4xl md:text-5xl font-medium text-gray-900 cormorant">
          Contact <span className="font-semibold">TRENDCASA</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600 text-lg cormorant">
          Have a question, feedback, or need help with your order?  
          We’re always here for you.
        </p>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        
        {/* Image */}
        <div className="flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-xl">
            <img
              src={assets.contactImg}
              alt="TrendCasa Contact"
              className="w-full max-w-md object-cover"
            />
          </div>
        </div>

        {/* Form */}
        <div>
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 cormorant">
            Get in Touch
          </h2>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1 cormorant">
                Your Name
              </label>
              <input
              required
                onChange={(e) => setName(e.target.value)}
                value={Name}
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1 cormorant" >
                Email Address
              </label>
              <input
              required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1 cormorant">
                Message
              </label>
              <textarea
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                rows="4"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-black"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-black cursor-pointer text-white py-3 rounded-lg hover:bg-gray-900 transition cormorant"
            >
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 text-sm text-gray-600 space-y-1 cormorant">
            <p>Email: support@trendcasa.com</p>
            <p>Customer Support: Mon – Sat, 10AM – 7PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
