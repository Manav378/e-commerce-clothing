import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Titel from '../Components/Titel';
import { assets } from '../assets/assets';

const Orders = () => {

  const {currency , products} = useContext(ShopContext);
  return (
    <div className='border-t '>

      <div className='text-2xl '>
      <Titel text1={"MY"} text2={'Orders'}/>
      </div>

    <div className="space-y-4">
  {products.slice(1, 4).map((item, index) => (
    <div
      key={index}
      className="border-t border-slate-200 pt-4 flex flex-col md:flex-row
                 md:items-center md:justify-between gap-4"
    >
      {/* LEFT : PRODUCT INFO */}
      <div className="flex items-start gap-4">
        <img
          className="w-14 sm:w-20 object-cover"
          src={item.image[0]}
          alt={item.name}
        />

        <div className="space-y-1">
          <p className="font-medium">{item.name}</p>

          <div className="flex flex-wrap gap-x-3 text-sm text-gray-600">
            <p>{currency}{item.price}</p>
            <p>Qty: 1</p>
            <p>Size: M</p>
          </div>

          <p className="text-xs text-gray-500">
            Date: 25 Jan, 2025
          </p>
        </div>
      </div>

      {/* RIGHT : STATUS + ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center
                      sm:justify-between gap-3 md:w-1/2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <p className="text-sm md:text-base">Ready to Ship</p>
        </div>

        <button
          className="border border-black px-4 py-2 text-sm rounded
                     hover:bg-black hover:text-white transition cursor-pointer"
        >
          Track Your Order
        </button>
      </div>
    </div>
  ))}
</div>


    </div>
  )
}

export default Orders
