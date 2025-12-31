// AuthPage.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../Context/ShopContext";
import axios from 'axios'
import { toast } from "react-toastify";

export default function signup() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate()
  const {backendUrl,setisLoggedin} = useContext(ShopContext);
const [showVerifyModal, setShowVerifyModal] = useState(false);

  const onsubmithandeler = async(e)=>{
          try {
            e.preventDefault()
            axios.defaults.withCredentials = true;
            if(isSignUp){
             const {data} = await axios.post(`${backendUrl}/api/auth/register`,{
                  name,email,password
                } , { withCredentials: true }  )

                if(data.success){
                  setisLoggedin(true);
                   toast.success("Register Successfully!!😃");
                setShowVerifyModal(true);
                }else{
                toast.error("Invalid credentials");

                }
            }else{
              const {data} = await axios.post(`${backendUrl}/api/auth/login`,{
                  email,password
                })

                if(data.success){
                  setisLoggedin(true);
                toast.success("Welcome to TREND CASA");

                  navigate('/')
                }else{
               toast.error("Invalid credentials");

                }
            }
          } catch (error) {
           toast.error("Invalid credentials");

          }
  }


  const verifyEmail = async()=>{
    try {
      axios.defaults.withCredentials = true
      const {data} = await axios.post(`${backendUrl}/api/auth/send-verify` ,{ withCredentials: true } );
      if(data.success){
        
        navigate('/EmailVerify')
       toast.success("OTP sent to your email 📩✨");
      }
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${assets.authBg})`, 
      }}
    >
      {/* Gradient overlay instead of plain black */}
      <div className="absolute inset-0 bg-linear-to-br from-black/60 via-black/40 to-black/70"></div>

      <div className="relative w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">
        
        {/* Bigger Logo */}
        <div className="flex justify-center mb-6">
          <img
          onClick={()=>navigate('/')}
            src={assets.logo}
            alt="TrendCasa Logo"
            className="h-16 object-contain"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          {isSignUp ? "Create Account" : "Login"}
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {isSignUp
            ? "Sign up to start shopping"
            : "Welcome back! Please login to continue"}
        </p>

        <form onSubmit={onsubmithandeler} className="space-y-4">
          {isSignUp && (
            <input
             onChange={(e)=>setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
            />
          )}

          <input
            type="email"
            onChange={(e)=>setemail(e.target.value)}
            value={email}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />

          <input
            type="password"
            onChange={(e)=>setpassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
          />

          {!isSignUp && (
            <div className="text-right">
              <Link
                to="/reset-password"
                className="text-sm text-gray-600 hover:text-black hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          <button className="w-full bg-black hover:bg-gray-800 cursor-pointer text-white p-3 rounded-md font-semibold transition">
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black font-semibold cursor-pointer hover:underline"
          >
            {isSignUp ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>




      {showVerifyModal && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
      <h2 className="text-xl font-bold mb-4">Verify Your Email</h2>
      <p className="mb-4">Click the button below to send OTP to your email.</p>
      <button onClick={verifyEmail}
        className="w-full cursor-pointer bg-black hover:bg-gray-800 text-white py-2 rounded font-semibold"
      >
        Send OTP
      </button>

      <button
        onClick={() => setShowVerifyModal(false)}
        className="w-full mt-3 cursor-pointer bg-gray-200 hover:bg-gray-300 text-black py-2 rounded font-semibold"
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
}
