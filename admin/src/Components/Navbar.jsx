import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({settoken}) => {

  const logout = ()=>{
    settoken('');
    sessionStorage.clear('adminToastShown')
    localStorage.clear("token");
  }
  return (
    <div className='flex items-center justify-between px-6 py-1 border-b border-b-gray-200'>
      
      {/* Logo */}
      <img
        src={assets.logo}
        className=''
        width={'130px'}
        alt="TrendCasa Logo"
      />

      {/* Logout Button */}
<button
onClick={logout}
  className="
    px-5 py-2
    rounded-sm
    bg-black text-white
    font-medium
    hover:bg-gray-800
    transition duration-200
    active:scale-95
    cursor-pointer
  "
>
  Logout
</button>



    </div>
  )
}

export default Navbar
