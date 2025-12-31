import express from 'express'
import { register, login , logout, sendVerifyotp, VerifyOTP, isAunthenticated } from "../Controllers/auth.Controller.js";
import authMiddelware from '../Middelware/auth.middelware.js';

const router =  express.Router();


router.post("/register" , register);
router.post("/login" , login);
router.get("/logout" , logout);
router.post("/send-verify" , authMiddelware , sendVerifyotp);
router.post("/verify-otp", authMiddelware , VerifyOTP);
router.get("/isAunthenticated",  isAunthenticated);



export default router



