import React, { useRef, useState, useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";


const ResetPassword = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(ShopContext);

  const [email, setemail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const inputrefs = useRef([]);
  const [isEmailsend, setisEmailsend] = useState(false);
  const [otp, setotp] = useState("");
  const [isotpsubmited, setisotpsubmited] = useState(false);

  // ================= SEND EMAIL =================
  const OnsubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl+
       "/api/auth/send-reset-otp",
        { email },{withCredentials:true}
      );
      response.data.success
        ? toast.success(response.data.message)
        : toast.error(response.data.error);

      setisEmailsend(response.data.success);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ================= OTP INPUT LOGIC =================
  const handelInput = (e, index) => {
    if (e.target.value && index < inputrefs.current.length - 1) {
      inputrefs.current[index + 1].focus();
    }
  };

  const handelPaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputrefs.current[index]) {
        inputrefs.current[index].value = char;
      }
    });
  };

  const handelDelete = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputrefs.current[index - 1].focus();
    }
  };

  const onsubmithandler = (e) => {
    e.preventDefault();
    const newotp = inputrefs.current.map((el) => el.value).join("");
    if (newotp.length !== 6) return toast.error("Enter valid OTP");
    setotp(newotp);
    setisotpsubmited(true);
  };

  // ================= RESET PASSWORD =================
  const newPasswordHandeler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl+
      "/api/auth/send-reset-password",
        { email, otp, newpassword },{withCredentials:true}
      );

      response.data.success
        ? toast.success(response.data.message)
        : toast.error(response.data.error);

      response.data.success && navigate("/Signup");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 overflow-y-auto flex items-center justify-center px-4 py-8">

      {/* ================= EMAIL FORM ================= */}
      {!isEmailsend && (
        <form
          onSubmit={OnsubmitEmail}
          className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col items-center"
        >
          <img
            src={assets.logo}
            alt="TrendCasa"
            onClick={() => navigate("/")}
            className="h-12 sm:h-16 mb-4 cursor-pointer"
          />

          <h2 className="text-2xl cormorant sm:text-3xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-sm cormorant text-gray-600 text-center mb-4">
            Enter your email to receive OTP
          </p>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-3 py-2.5 rounded-md border border-gray-400 mb-4 focus:ring-2 focus:ring-black"
          />

          <button className="w-full py-2.5 cursor-pointer cormorant bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-800 transition">
            Send OTP
          </button>
        </form>
      )}

      {/* ================= OTP FORM ================= */}
      {isEmailsend && !isotpsubmited && (
        <form
          onSubmit={onsubmithandler}
          className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-2xl"
        >
          <h2 className="text-2xl cormorant sm:text-3xl font-bold text-center mb-2">
            Email Verification
          </h2>
          <p className="text-center cormorant text-gray-500 mb-6">
            Enter 6-digit OTP
          </p>

          <div
            className="flex justify-center gap-2 sm:gap-3 mb-6"
            onPaste={handelPaste}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  maxLength="1"
                  ref={(el) => (inputrefs.current[index] = el)}
                  onInput={(e) => handelInput(e, index)}
                  onKeyDown={(e) => handelDelete(e, index)}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-center text-lg font-semibold rounded-md bg-gray-200 focus:bg-white focus:ring-2 focus:ring-black"
                  required
                />
              ))}
          </div>

          <button className="w-full cormorant cursor-pointer py-2.5 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition">
            Verify OTP
          </button>
        </form>
      )}

      {/* ================= NEW PASSWORD ================= */}
      {isEmailsend && isotpsubmited && (
        <form
          onSubmit={newPasswordHandeler}
          className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-xl p-6 sm:p-8 md:p-10 shadow-2xl flex flex-col items-center"
        >
          <h2 className="text-2xl cormorant sm:text-3xl font-bold mb-2">
            Set New Password
          </h2>
          <p className="text-sm cormorant text-gray-600 mb-4">
            Enter your new password
          </p>

          <input
            type="password"
            required
            value={newpassword}
            onChange={(e) => setnewpassword(e.target.value)}
            placeholder="New password"
            className="w-full px-3 py-2.5 rounded-md border border-gray-400 mb-4 focus:ring-2 focus:ring-black"
          />

          <button className="w-full py-2.5 cursor-pointer bg-black cormorant text-white rounded-md font-semibold text-lg hover:bg-gray-800 transition">
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
