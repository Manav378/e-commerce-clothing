import express from 'express';
import {
  allOrders,
  placeorder,
  placeorderstripe,
  userOrder,
  updateStatus,
  verifyStripe,

  
} from '../Controllers/Order.Controller.js';
import adminAuth from '../Middelware/Adminauth.js';
import authMiddelware from '../Middelware/auth.middelware.js';

const OrderRouter = express.Router();

// Admin routes
OrderRouter.post("/list", adminAuth, allOrders);
OrderRouter.post("/status", adminAuth, updateStatus);

// Payment routes
OrderRouter.post("/place", authMiddelware, placeorder);
OrderRouter.post("/stripe", authMiddelware, placeorderstripe);


// User orders
OrderRouter.post("/userorders", authMiddelware, userOrder);

// Verify payments
OrderRouter.post("/verifyStripe", authMiddelware, verifyStripe);



export default OrderRouter;
