import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Titel from '../Components/Titel.jsx'
import CartTotal from '../Components/CartTotal.jsx'

const Cart = () => {
  const { products, currency, CartItems, updateQuantity } = useContext(ShopContext)
  const [cartData, setcartData] = useState([])

  useEffect(() => {
    if(products.length > 0){
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
    }
  }, [CartItems , products])

  return (
    <div className="w-full min-h-screen px-4 md:px-8 py-8">

      
      <div className="mb-6">
        <Titel text1="CART" text2="ITEMS" />
      </div>

     
      <div className="flex flex-col gap-4">
        {cartData.map((item, index) => {
          const productdata = products.find(
            (product) => product._id === item._id
          )

          return (
            <div
              key={index}
              className="border border-gray-300 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white shadow-sm hover:shadow-md transition"
            >
            
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={productdata.image?.[0]}
                  alt={productdata.name}
                  className="w-20 sm:w-24 md:w-28 shrink-0 rounded-lg"
                />

                <div>
                  <p className="cormorant font-semibold">{productdata.name}</p>

                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                    <p>{currency}{productdata.price}</p>
                    <p className="border px-2 py-1 bg-gray-100 rounded">{item.size}</p>
                  </div>
                </div>
              </div>

          
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="w-20 h-10 text-center font-bold border rounded"
              />

             
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

    
      <div className="mt-8">
        <CartTotal />
      </div>

    </div>
  )
}

export default Cart
