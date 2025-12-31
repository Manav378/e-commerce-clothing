import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModels from "../models/Usermodels.js";
import transporter from "../config/smtp.js";
//-----------------REGISTER ✅ -------------------//
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Missing details",
        success: false,
      });
    }

    const existingUser = await UserModels.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModels({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production => true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    await transporter.sendMail({
      from: `"TRENDSPA" <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Welcome to TRENDSPA",
      text: `Welcome to TRENDSPA E-commerce website, your account has been created with email id: ${email}`,
    });

    console.log("✅ Email sent successfully");
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//-----------------LOGIN ✅ -------------------//

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
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
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(404)
        .json({ message: "Invalid Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JSON_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // production => true
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User Login successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//-----------------LOGOUT ✅ -------------------//

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "User Logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//-----------------Send verification OTP to sender's Email ✅ -------------------//
export const sendVerifyotp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await UserModels.findById(userId);

    if (user.isAccountVerified) {
      return res.status(404).json({
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
      text: `Account Verification OTP is ${otp}.Use this OTP for accoutn Verification`,
    });

    return res.status(201).json({
      message: "Account Verification OTP send to user's Email",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//-----------------Verified Email Using OTP ✅ -------------------//
export const VerifyOTP  = async(req,res)=>{
  try {
      const {otp , userId} = req.body;

          if(!otp || !userId){
            return res.status(404),json({
              message:"Missing Details",
              success:false
            })
          }

          const user = await UserModels.findById(userId);
          
          if(!user) return res.status(404).json({message:"User not found!" , success:false});
          if(otp !== user.verifyotp || otp === ''){
            return res.status(404).json({message:"Invalid OTP" , success :false})
          }

          if(user.verifyotpExpireAt < Date.now()){
            return res.status(404).json({
              message:"OTP is already Expired",
              success:false
            })
          }

          user.isAccountVerified = true;
          user.verifyotp = '';
          user.verifyotpExpireAt = 0;

          await user.save();

          return res.status(200).json({message:"Email Verified successfully" , success:true});

  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
        
}

//-----------------Check is Aunthenticated ✅ -------------------//
export const isAunthenticated = (req,res)=>{
  try {
    return res.status(201).json({success:true});
  } catch (error) {
    return res.status(401).json({message:error.message})
  }
}