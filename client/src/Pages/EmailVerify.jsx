import React, { useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../Context/ShopContext';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;

  const { backendUrl, isLoggedin, userData } = useContext(ShopContext);
  const inputrefs = React.useRef([]);
  const navigate = useNavigate();

  const handelInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handelPaste = (e) => {
    const paste = e.clipboardData.getData('text');
    const pastArray = paste.split('');
    pastArray.forEach((char, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = char;
      }
    });
  };

  const handelDelete = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  };

  const onsubmithandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputrefs.current.map((e) => e.value);
      const otp = otpArray.join('');
      const { data } = await axios.post(backendUrl+'/api/auth/verify-otp', { otp },{withCredentials:true});

      if (data.success) {
        toast.success(data.message);
        navigate('/');
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
     toast.error("Invalid OTP");
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) navigate('/');
  }, [isLoggedin, userData]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={assets.logo}
            alt="TrendCasa Logo"
            className="h-16 object-contain cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Email Verification
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={onsubmithandler} className="space-y-6">
          <div className="flex justify-center gap-3" onPaste={handelPaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  ref={(el) => (inputrefs.current[index] = el)}
                  onInput={(e) => handelInput(e, index)}
                  onKeyDown={(e) => handelDelete(e, index)}
                  className="w-12 h-12 text-center text-xl font-semibold rounded-md bg-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-600"
                />
              ))}
          </div>

          <button className="w-full py-3 bg-black hover:bg-gray-800 cursor-pointer text-white rounded-md font-semibold transition">
            Verify Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
