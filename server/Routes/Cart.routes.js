import express from 'express'
import { addToCart, getuserCart, updateCart } from '../Controllers/Cart.Controller.js';
import authMiddelware from '../Middelware/auth.middelware.js';

const CartRouter = express.Router();



CartRouter.post("/add" ,authMiddelware, addToCart)
CartRouter.post("/update" ,authMiddelware, updateCart)
CartRouter.post("/get" ,authMiddelware, getuserCart)

export default CartRouter;

