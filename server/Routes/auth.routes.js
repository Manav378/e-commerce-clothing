import express from 'express'
import { register, login , logout, sendVerifyotp, VerifyOTP, resetOtp, resetpassword, isAuthenticated } from "../Controllers/auth.Controller.js";
import authMiddelware from '../Middelware/auth.middelware.js';

const router =  express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.get("/logout" , logout);
router.post("/send-verify" , authMiddelware , sendVerifyotp);
router.post("/verify-otp", authMiddelware , VerifyOTP);
router.get("/isAunthenticated", authMiddelware, isAuthenticated);
router.post("/send-reset-otp", resetOtp);
router.post("/send-reset-password", resetpassword);



export default router



