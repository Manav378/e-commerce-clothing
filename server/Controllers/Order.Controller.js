import Ordermodel from "../models/Order.models.js";
import UserModels from "../models/Usermodels.js";
import Stripe from "stripe";
import PaytmChecksum from "paytmchecksum";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// global varibales
const currency = "usd";
const deliveryCharges = 10;

//gateway initilize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Placing Order using COT method
export const placeorder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Ordermodel(orderData);

    await newOrder.save();

    await UserModels.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Placing Order using STRIPE method

export const placeorderstripe = async (req, res) => {
  try {
    const { items, amount, address } = req.body;
    const userId = req.userId;

    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new Ordermodel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery charges",
        },
        unit_amount: deliveryCharges * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const verifyStripe = async (req, res) => {
  const { orderId, success } = req.body;
  const userId = req.userId;

  try {
    if (success === "true") {
      await Ordermodel.findByIdAndUpdate(orderId, { payment: true });
      await UserModels.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await Ordermodel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};





//All Orders data for Admin Panel

export const allOrders = async (req, res) => {
  try {
    const orders = await Ordermodel.find({});
    res.json({ success: true, message: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//User order Data for fronted

export const userOrder = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const usersData = await Ordermodel.find({ userId });
    res.json({ success: true, message: usersData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Update order status from Admin Panel

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Ordermodel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
