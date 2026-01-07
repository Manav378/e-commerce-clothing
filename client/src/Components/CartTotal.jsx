import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Titel from './Titel'
import { useNavigate } from 'react-router-dom'


const CartTotal = () => {
  const { currency, delevery_fee, getCartAmount } = useContext(ShopContext)
  const navigate = useNavigate()

  const subtotal = getCartAmount()
  const total = subtotal + delevery_fee

  return (
    <div className="w-full mt-6 flex justify-center md:justify-end px-2 md:px-4 lg:px-0">
      <div className="w-full sm:w-[80%] md:w-[35%] lg:w-[28%] bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4">
        
        {/* Title */}
        <div className='cormorant font-extrabold text-2xl m-auto'>CART TOATL</div>

        {/* Subtotal */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className='cormorant'>Subtotal</span>
          <span className="font-medium cormorant">{currency}{subtotal}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span className='cormorant'>Shipping Fee</span>
          <span className="font-medium cormorant">{currency}{delevery_fee}</span>
        </div>

        <hr className="border-gray-300 my-2" />

        {/* Total */}
        <div className="flex justify-between items-center text-lg font-bold">
          <span className='cormorant'>Total</span>
          <span className='cormorant'>{currency}{total}</span>
        </div>

        {/* Checkout Button */}
        <button onClick={()=>navigate('/Place-order')} className="mt-4 w-full bg-black cormorant cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition">
          Proceed To Checkout
        </button>

      </div>
    </div>
  )
}

export default CartTotal
