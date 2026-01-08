import express from "express";
import { sendContact } from "../Controllers/Contactus.controller.js";
import authMiddelware from "../Middelware/auth.middelware.js";
const Contactrouter = express.Router();

Contactrouter.post("/contact",authMiddelware, sendContact);

export default Contactrouter;
