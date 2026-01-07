// AuthPage.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showVerifyModal, setShowVerifyModal] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setisLoggedin } = useContext(ShopContext);

  const onsubmithandeler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;

      if (isSignUp) {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/register`,
          { name, email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setShowVerifyModal(true); // registration ke baad modal show karo
          toast.success(data.message); // backend ka message dikhao
        } else {
          toast.error(data.message); // backend error message dikhao
        }
      } else {
        const { data } = await axios.post(
          `${backendUrl}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );

        if (data.success) {
          setisLoggedin(true);
          toast.success(data.message); // backend message
          navigate("/");
        } else {
          toast.error(data.message); // backend error
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const verifyEmail = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify`,
        {},
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("OTP sent to your email 📩");
        navigate("/EmailVerify");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${assets.authBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Auth Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl cormorant">
        {/* Logo */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <img
            onClick={() => navigate("/")}
            src={assets.logo}
            alt="TrendCasa Logo"
            className="h-12 sm:h-16 cursor-pointer"
          />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2 cormorant">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-gray-500 text-sm sm:text-base mb-6 cormorant">
          {isSignUp
            ? "Sign up to start shopping"
            : "Welcome back! Please login to continue"}
        </p>

        <form onSubmit={onsubmithandeler} className="space-y-3 sm:space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-black outline-none cormorant"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full p-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-black outline-none cormorant"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full p-3 text-sm sm:text-base border rounded-md focus:ring-2 focus:ring-black outline-none cormorant"
          />

          {!isSignUp && (
            <div className="text-right">
              <Link
                to="/reset-password"
                className="text-xs sm:text-sm text-gray-600 hover:underline cormorant"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <button className="w-full bg-black hover:bg-gray-800 cursor-pointer text-white py-3 rounded-md font-semibold transition cormorant">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4 cormorant">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black font-semibold cursor-pointer hover:underline cormorant"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>

      {/* VERIFY EMAIL MODAL */}
      {showVerifyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 z-50">
          <div className="bg-white w-full max-w-sm p-5 rounded-xl shadow-lg cormorant">
            <h2 className="text-lg font-bold mb-2 cormorant">Verify Your Email</h2>
            <p className="text-sm text-gray-600 mb-4 cormorant">
              Click below to receive OTP on your email.
            </p>

            <button
              onClick={verifyEmail}
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 cormorant"
            >
              Send OTP
            </button>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full mt-3 bg-gray-200 py-2 rounded-md font-semibold hover:bg-gray-300 cormorant"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
