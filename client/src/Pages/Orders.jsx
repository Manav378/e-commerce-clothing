import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Context/ShopContext";
import Titel from "../Components/Titel";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const { currency, backendUrl } = useContext(ShopContext);
  const [OrdersData, setOrdersData] = useState([]);

  const loadOrderData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/orders/userorders",
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        let AllOrdersData = [];

        response.data.message.forEach((orders) => {
          orders.items.forEach((item) => {
            item.status = orders.status;
            item.payment = orders.payment;
            item.paymentMethod = orders.paymentMethod;
            item.date = new Date(orders.date).toDateString();
            AllOrdersData.push(item);
          });
        });

        setOrdersData(AllOrdersData.reverse());
      }
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, []);

  return (
    <div className="cormorant font-serif min-h-screen bg-gray-50 px-4 md:px-10 py-10">
      {/* TITLE */}
      <div className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-800">
        <Titel text1="MY" text2="Orders" />
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-6">
        {OrdersData.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No orders yet.</p>
        ) : (
          OrdersData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-md flex flex-col md:flex-row justify-between gap-4 md:items-center"
            >
              {/* LEFT: PRODUCT INFO */}
              <div className="flex items-start gap-4 md:gap-6 flex-1">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <p className="font-semibold text-lg">{item.name}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    <p>Price: {currency}{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>

                  <p className="text-xs text-gray-500">Date: {item.date}</p>
                  <p className="text-xs text-gray-500">
                    Payment: {item.paymentMethod}
                  </p>
                </div>
              </div>

              {/* RIGHT: STATUS + ACTION */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:w-1/3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${item.status === "Order Placed"
                        ? "bg-blue-700"
                        : item.status === "Packing"
                          ? "bg-yellow-400"
                          : item.status === "Shipped"
                            ? "bg-indigo-700"
                            : item.status === "Out of delivery"
                              ? "bg-orange-700"
                              : item.status === "Delivered"
                                ? "bg-green-700"
                                : "bg-gray-400"
                      }`}
                  ></span>

                  <p className="text-sm md:text-base font-medium text-gray-700">
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={loadOrderData}
                  className="border border-black px-4 py-2 text-sm rounded-md hover:bg-black hover:text-white transition cursor-pointer font-medium"
                >
                  Track Your Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
