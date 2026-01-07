import express from "express";
import { sendContact } from "../Controllers/Contactus.controller.js";

const Contactrouter = express.Router();

Contactrouter.post("/contact", sendContact);

export default Contactrouter;
