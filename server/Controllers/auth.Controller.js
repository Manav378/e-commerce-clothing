import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModels from "../models/Usermodels.js";
import transporter from "../config/smtp.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { otpEmailTemplate } from "../utils/OtpTemplate.js";
//----------------- REGISTER ✅ -------------------//
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }


    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await UserModels.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });
    user.save();

    const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    

   await transporter.sendMail({
      from: `"TRENDCASA" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Welcome to TRENDCASA",
      html: verifyEmailTemplate(name), // now only name, no link
    });
 

    return res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//----------------- LOGIN ✅ -------------------//
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }


    //    if (!user.isVerified) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Please verify your email first",
    //   });
    // }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- LOGOUT ✅ -------------------//
export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- SEND VERIFICATION OTP ✅ -------------------//
export const sendVerifyotp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModels.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.isAccountVerified) {
      return res.status(400).json({
        message: "Account already verified",
        success: false,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const Expireotp = Date.now() + 24 * 60 * 60 * 1000;

    user.verifyotp = otp;
    user.verifyotpExpireAt = Expireotp;
    await user.save();

    await transporter.sendMail({
      from: `"TRENDSPA" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your account verification OTP is ${otp}.`,
      html:otpEmailTemplate(user.name , otp)
    });

    return res.status(200).json({
      message: "Verification OTP sent to email",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- VERIFY EMAIL USING OTP ✅ -------------------//
export const VerifyOTP = async (req, res) => {
  try {
    const { otp, userId } = req.body;

    if (!otp || !userId) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const user = await UserModels.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (otp !== user.verifyotp) {
      return res.status(401).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    if (user.verifyotpExpireAt < Date.now()) {
      return res.status(401).json({
        message: "OTP expired",
        success: false,
      });
    }

    user.isAccountVerified = true;
    user.verifyotp = "";
    user.verifyotpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- CHECK AUTHENTICATION ✅ -------------------//
export const isAuthenticated = (req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- SEND RESET PASSWORD OTP ✅ -------------------//
export const resetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Missing details",
      success: false,
    });
  }

  try {
    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const Expireotp = Date.now() + 15 * 60 * 1000;

    user.resetotp = otp;
    user.resetotpExpireAt = Expireotp;
    await user.save();

    await transporter.sendMail({
      from: `"TRENDSPA" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP to reset your password is ${otp}.`,
    });

    return res.status(200).json({
      message: "Reset password OTP sent to email",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//----------------- RESET PASSWORD USING OTP ✅ -------------------//
export const resetpassword = async (req, res) => {
  const { email, otp, newpassword } = req.body;

  if (!email || !otp || !newpassword) {
    return res.status(400).json({
      message: "Missing details",
      success: false,
    });
  }

  try {
    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (otp !== user.resetotp) {
      return res.status(401).json({
        message: "Invalid OTP",
        success: false,
      });
    }

    if (user.resetotpExpireAt < Date.now()) {
      return res.status(401).json({
        message: "OTP expired",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    user.resetotp = "";
    user.resetotpExpireAt = 0;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
