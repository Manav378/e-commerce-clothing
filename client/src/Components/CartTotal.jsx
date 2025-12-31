import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Titel from './Titel'

const CartTotal = () => {

  const { currency, delevery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const total = subtotal + delevery_fee

  return (
    <div className="w-full flex justify-center md:justify-end lg:justify-end px-4 mt-6">
      
      <div className="w-full md:w-[35vw] lg:w-[28vw] rounded-lg p-4 flex flex-col gap-4 bg-white">

        <Titel text1="CART" text2="TOTAL" />

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-600">Subtotal</p>
          <p>{currency}{subtotal}</p>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm">
          <p className="text-gray-600">Shipping Fee</p>
          <p>{currency}{delevery_fee}</p>
        </div>

        <hr className="border-gray-300" />

        {/* Total */}
        <div className="flex justify-between items-center font-bold text-lg">
          <p>Total</p>
          <p>{currency}{total}</p>
        </div>

      </div>

    </div>
  )
}

export default CartTotal
