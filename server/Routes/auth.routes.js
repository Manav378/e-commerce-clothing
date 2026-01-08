import express from 'express'
import { register, login , logout, sendVerifyotp, resetOtp, isAuthenticated, adminLogin, verifyOTP, resetPassword } from "../Controllers/auth.Controller.js";
import authMiddelware from '../Middelware/auth.middelware.js';
import adminAuth from '../Middelware/Adminauth.js';

const router =  express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.get("/logout" , logout);
router.post("/send-verify" , authMiddelware , sendVerifyotp);
router.post("/verify-otp", authMiddelware , verifyOTP);
router.get("/isAuthenticated", authMiddelware, isAuthenticated);
router.post("/send-reset-otp", resetOtp);
router.post("/send-reset-password", resetPassword);
router.post('/admin' , adminLogin)



export default router



