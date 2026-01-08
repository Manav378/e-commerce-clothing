import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import UserModels from "../models/Usermodels.js";
import transporter from "../config/smtp.js";
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { otpEmailTemplate } from "../utils/OtpTemplate.js";

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ==================== REGISTER ====================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Weak password" });
    }

    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModels.create({
      name,
      email,
      password: hashedPassword,
      isAccountVerified: false,
    });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);

    await transporter.sendMail({
      from: `"TRENDCASA" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Welcome to TRENDCASA",
      html: verifyEmailTemplate(name),
    });

    res.status(201).json({ success: true, message: "Registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const user = await UserModels.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    if (!user.isAccountVerified) {
      return res.status(403).json({ success: false, message: "Verify email first" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, cookieOptions);
    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== LOGOUT ====================
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ==================== SEND VERIFY OTP ====================
export const sendVerifyotp = async (req, res) => {
  try {
    const user = await UserModels.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.isAccountVerified)
      return res.status(400).json({ success: false, message: "Account already verified" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyotp = await bcrypt.hash(otp, 10);
    user.verifyotpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    await transporter.sendMail({
      from: `"TRENDCASA" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Account Verification OTP",
      html: otpEmailTemplate(user.name, otp),
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== VERIFY OTP ====================
export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;

    const user = await UserModels.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.verifyotpExpireAt < Date.now())
      return res.status(401).json({ success: false, message: "OTP expired" });

    const isValid = await bcrypt.compare(otp, user.verifyotp);
    if (!isValid) return res.status(401).json({ success: false, message: "Invalid OTP" });

    user.isAccountVerified = true;
    user.verifyotp = "";
    user.verifyotpExpireAt = 0;
    await user.save();

    res.status(200).json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== RESET PASSWORD OTP ====================
export const resetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModels.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetotp = await bcrypt.hash(otp, 10);
    user.resetotpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    await transporter.sendMail({
      from: `"TRENDCASA" <${process.env.SENDER_EMAIL}>`,
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP is ${otp}`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== RESET PASSWORD ====================
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newpassword } = req.body;

    if (!validator.isStrongPassword(newpassword))
      return res.status(400).json({ success: false, message: "Weak password" });

    const user = await UserModels.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    if (user.resetotpExpireAt < Date.now())
      return res.status(401).json({ success: false, message: "OTP expired" });

    const isValid = await bcrypt.compare(otp, user.resetotp);
    if (!isValid) return res.status(401).json({ success: false, message: "Invalid OTP" });

    user.password = await bcrypt.hash(newpassword, 10);
    user.resetotp = "";
    user.resetotpExpireAt = 0;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== CHECK AUTHENTICATION ====================
export const isAuthenticated = (req, res) => {
  try {
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ==================== ADMIN LOGIN ====================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
      return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ role: "admin" }, process.env.JWT_TOKEN, { expiresIn: "1d" });

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
