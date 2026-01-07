import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { backendUrl, CartItems, setCartItems, getCartAmount, delevery_fee, products, currency } =
    useContext(ShopContext);

  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setformData((data) => ({ ...data, [name]: value }));
  };

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in CartItems) {
        for (const item in CartItems[items]) {
          const product = products.find((p) => p._id === items);
          if (!product) continue;

          const quantity = CartItems[items][item];
          if (!quantity || quantity <= 0) continue;

          const ItemInfo = structuredClone(product);
          ItemInfo.size = item;
          ItemInfo.quantity = quantity;
          orderItems.push(ItemInfo);
        }
      }

      if (orderItems.length === 0) {
        toast.error("Cart is empty");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delevery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(backendUrl + "/api/orders/place", orderData, {
            withCredentials: true,
          });
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(backendUrl + "/api/orders/stripe", orderData, {
            withCredentials: true,
          });

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("PLACE ORDER ERROR:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onsubmitHandler}
      className="w-full min-h-screen px-4 md:px-10 py-10 bg-gray-50 cormorant"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">

        {/* LEFT: DELIVERY INFO */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 text-gray-800">
            Delivery Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              required
              onChange={onchangeHandler}
              name="firstName"
              value={formData.firstName}
              className="input border border-gray-700"
              placeholder="First Name"
            />
            <input
              required
              onChange={onchangeHandler}
              name="lastName"
              value={formData.lastName}
              className="input border border-gray-700"
              placeholder="Last Name"
            />
            <input
              required
              onChange={onchangeHandler}
              name="email"
              value={formData.email}
              className="input sm:col-span-2 border border-gray-700"
              placeholder="Email Address"
            />
            <input
              required
              onChange={onchangeHandler}
              name="street"
              value={formData.street}
              className="input sm:col-span-2 border border-gray-700"
              placeholder="Street"
            />
            <input
              required
              onChange={onchangeHandler}
              name="city"
              value={formData.city}
              className="input border border-gray-700"
              placeholder="City"
            />
            <input
              required
              onChange={onchangeHandler}
              name="state"
              value={formData.state}
              className="input border border-gray-700"
              placeholder="State"
            />
            <input
              required
              onChange={onchangeHandler}
              name="zipcode"
              value={formData.zipcode}
              className="input border border-gray-700"
              placeholder="Zipcode"
            />
            <input
              required
              onChange={onchangeHandler}
              name="country"
              value={formData.country}
              className="input border border-gray-700"
              placeholder="Country"
            />
            <input
              required
              onChange={onchangeHandler}
              name="phone"
              value={formData.phone}
              className="input sm:col-span-2 border-gray-700"
              placeholder="Phone"
            />
          </div>
        </div>

        {/* RIGHT: CART TOTAL + PAYMENT */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">

          {/* CART TOTAL */}
          <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col gap-4 cormorant">
            <div className="font-extrabold text-2xl text-center cormorant">CART TOTAL</div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span className="cormorant">Subtotal</span>
              <span className="font-medium cormorant">{currency}{getCartAmount()}</span>
            </div>
            <div className="flex justify-between text-gray-600 text-sm">
              <span>Shipping Fee</span>
              <span className="font-medium cormorant">{currency}{delevery_fee}</span>
            </div>
            <hr className="border-gray-300 my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span className="cormorant">Total</span>
              <span className="cormorant">{currency}{getCartAmount() + delevery_fee}</span>
            </div>
          </div> 

          {/* PAYMENT METHOD */}
          <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
            <h2 className="text-2xl font-semibold border-b pb-2 cormorant text-gray-800">
              Payment Method
            </h2>
            <div className="flex flex-wrap gap-3 mt-2">
              <button
                type="button"
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded ${
                  method === "stripe" ? "bg-green-400 text-white" : "bg-slate-200"
                }`}
              >
                <img src={assets.strip} className="h-6" /> 
              </button>

              <button
                type="button"
                onClick={() => setMethod("cod")}
                className={`px-4 py-2 rounded cursor-pointer cormorant ${
                  method === "cod" ? "bg-green-400 text-white" : "bg-slate-200"
                }`}
              >
                Cash on Delivery
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-black cursor-pointer cormorant text-white h-12 rounded-sm hover:bg-gray-800 transition font-medium mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
