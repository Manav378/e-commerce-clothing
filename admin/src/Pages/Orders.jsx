import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { assets } from "../assets/assets"
import { currency } from "../App"

const Orders = ({ token, backendUrl }) => {
  const [fetchOrder, setfetchOrder] = useState([])

  const fetchOrders = async () => {
    if (!token) return
    try {
      const response = await axios.post(
        backendUrl + "/api/orders/list",
        {},
        { headers: { token } }
      )

      if (response.data.success) {
        setfetchOrder(response.data.message)
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [token])

  const statusHandeler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/orders/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      )

      if (response.data.success) {
        fetchOrders()
      } else {
        toast.error(response.data.error)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 font-display">Orders</h1>

      <div className="flex flex-col gap-6">
        {fetchOrder.map((item, index) => (
          <div
            key={index}
            className="
              bg-white rounded-xl shadow-md
              p-4 sm:p-5 md:p-6
              flex flex-col lg:flex-row gap-5
            "
          >
         
            <div className="flex justify-center lg:justify-start">
              <img
                src={assets.parcel}
                className="w-20 sm:w-24 h-20 sm:h-24 object-contain"
                alt="Parcel"
              />
            </div>

         
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

             
              <div>
                <h2 className="font-semibold text-base sm:text-lg mb-2  font-display">
                  Products
                </h2>
                <div className="text-sm sm:text-base space-y-1">
                  {item.items.map((product, i) => (
                    <p key={i} className="wrap-break-words">
                      <span className="font-medium font-display">{product.name}</span>{" "}
                      × {product.quantity}
                      <span className="text-gray-500 font-display"> {product.size}</span>
                    </p>
                  ))}
                </div>
              </div>

            
              <div>
                <h2 className="font-semibold text-base sm:text-lg mb-2">
                  Customer
                </h2>
                <p className="font-medium font-display">
                  {item.address.firstName} {item.address.lastName}
                </p>
                <p className="text-sm sm:text-base wrap-break-words font-display">
                  {item.address.street}, {item.address.city},{" "}
                  {item.address.state}, {item.address.country},{" "}
                  {item.address.zipcode}
                </p>
                <p className="text-sm sm:text-base font-display">
                  Phone: {item.address.phone}
                </p>
              </div>

          
              <div>
                <h2 className="font-semibold text-base sm:text-lg mb-2 font-display">
                  Order Info
                </h2>
                <p className="font-display">Items: {item.items.length}</p>
                <p className="font-display">Payment: {item.payment ? "Done" : "Pending"}</p>
                <p className="font-display">Method: {item.paymentMethod}</p>
                <p className="font-display">Date: {new Date(item.date).toDateString()}</p>
                <p className="font-semibold mt-1 font-display">
                  Total: {currency}{item.amount}
                </p>
              </div>

             
              <div className="flex flex-col">
                <h2 className="font-semibold text-base sm:text-lg mb-2">
                  Status
                </h2>
                <select
                  value={item.status}
                  onChange={(event) =>
                    statusHandeler(event, item._id)
                  }
                  className="
                    w-full
                    border border-gray-300
                    rounded-md
                    px-3 py-2
                    text-sm sm:text-base
                    cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out of delivery">Out of delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders
