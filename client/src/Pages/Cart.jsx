import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Titel from '../Components/Titel.jsx'
import CartTotal from '../Components/CartTotal.jsx'

const Cart = () => {
  const { products, currency, CartItems, updateQuantity,navigate } = useContext(ShopContext)
  const [cartData, setcartData] = useState([])

  useEffect(() => {
    const tempData = []
    for (const items in CartItems) {
      for (const item in CartItems[items]) {
        if (CartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: CartItems[items][item],
          })
        }
      }
    }
    setcartData(tempData)
  }, [CartItems])

  return (
    <div className="w-full min-h-screen px-4 md:px-8">

      {/* TITLE */}
      <div className="mb-6">
        <Titel text1="CART" text2="ITEMS" />
      </div>

      {/* MAIN GRID */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT : CART ITEMS */}
        <div className="w-full lg:w-screen">
          {cartData.map((item, index) => {
            const productdata = products.find(
              (product) => product._id === item._id
            )

            return (
              <div
                key={index}
                className="border border-gray-300 rounded-lg w-full my-4 p-4
                           flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* PRODUCT */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={productdata.image?.[0]}
                    alt={productdata.name}
                    className="w-16 sm:w-20 md:w-24 shrink-0"
                  />

                  <div>
                    <p className="font-medium">{productdata.name}</p>

                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                      <p>{currency}{productdata.price}</p>
                      <p className="border px-2 py-1 bg-gray-100">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* QUANTITY */}
                <input
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === '' || e.target.value === '0'
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="w-20 h-10 text-center font-bold border"
                />

                {/* DELETE */}
                <lord-icon
                  src="https://cdn.lordicon.com/jzinekkv.json"
                  trigger="hover"
                  className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
                  onClick={() =>
                    updateQuantity(item._id, item.size, 0)
                  }
                />
              </div>
            )
          })}
        </div>
   </div>
        {/* RIGHT : CART TOTAL + BUTTON */}
        <div onClick={()=>navigate('/place-order')} className="w-full lg:w-[30%] flex flex-col gap-6">

          <CartTotal />

          <button
            className="bg-black text-white w-full h-12 md:h-14
                       hover:text-gray-400 transition font-medium"
          >
            Proceed To Checkout
          </button>

        </div>

   
    </div>
  )
}

export default Cart
