import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';

const Navbar = ({open , setopen}) => {






  return (
    <div className="relative top-0 left-0 h-[20vh] w-full flex items-center justify-between  bg-white z-50">
      

     <div className=' w-full flex items-center justify-between'>
       

    
      
      <div className={`sm:w-[14vw] w-[30vw]  transition-all duration-700 ${
  open ? "translate-x-[-200%]" : "translate-x-0"
}`}>
         <img
          src={assets.logo}
          className={`w-full  `}
          alt="logo"
        />
     


      </div>

      <ul className="hidden  gap-6 sm:flex  ">

        <NavLink to={'/'} className={({ isActive }) =>
          isActive ? "text-black cormorant font-semibold border-b-2 border-black" : "text-gray-600 cormorant    hover:border-black"
        }>
          Home
        </NavLink>

        <NavLink
          to="/Collection"
          className={({ isActive }) =>
            isActive
              ? "text-black cormorant font-semibold border-b-2 border-black"
              : "text-gray-600 cormorant  hover:text-black"
          }
        >
          Collection
        </NavLink>

        <NavLink
          to="/About"
          className={({ isActive }) =>
            isActive
              ? "text-black cormorant font-semibold border-b-2 border-black"
              : "text-gray-600 cormorant hover:text-black"
          }
        >
          About
        </NavLink>

        <NavLink
          to="/Contact"
          className={({ isActive }) =>
            isActive
              ? "text-black cormorant font-semibold border-b-2 border-black"
              : "text-gray-600 cormorant hover:text-black"
          }
        >
          Contact
        </NavLink>

      </ul>
 
      {/*  icon*/}


      <div className='icons relative right-[5vw] flex items-center gap-5 ' >



      <div className={`flex items-center gap-5 transition-all duration-700 ${
  open ? "translate-x-[-500%]" : "translate-x-0"
}`}>

          {/* search icon*/}
          <lord-icon
            src="https://cdn.lordicon.com/wjyqkiew.json"
            trigger="hover"
            stroke="bold"
            state="hover-rotation"
            colors="primary:#000000,secondary:#000000"
            style={{ width: "28px", height: "28px", cursor: "pointer" }}>
          </lord-icon>




          {/* profile icon*/}
          <div className='group relative'>
            <lord-icon
              src="https://cdn.lordicon.com/kdduutaw.json"
              trigger="hover"
              stroke="bold"
              state="hover-rotation"
              colors="primary:#000000,secondary:#000000"
              style={{ width: "28px", height: "28px", cursor: "pointer" }}>
            </lord-icon>

            <div className='group-hover:block hidden   dropdown-menu  '>
              <div className='flex flex-col text-gray-500 bg-slate-200 absolute rounded-xl right-0 pt-2 w-34 items-center justify-center'>
                <p className='cursor-pointer cormorant p-1 hover:text-black'> My Profile</p>
                <p className='cursor-pointer cormorant p-1 hover:text-black'>Orders</p>
                <p className='cursor-pointer cormorant p-1 hover:text-black'>Logout</p>
              </div>
            </div>
          </div>

          {/* cart icon*/}

          <Link to={'/cart'}>

            <div className="relative top-0">
              <lord-icon
                src="https://cdn.lordicon.com/uisoczqi.json"
                trigger="hover"
                stroke="bold"
                state="hover-rotation"
                colors="primary:#000000,secondary:#000000"
                style={{ width: "28px", height: "28px", cursor: "pointer" }}
              >
              </lord-icon>

              <span className="absolute -top-2 -right-1 bg-black text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
          </Link>
        </div>
  </div>
     </div>
  
          {/* Menu icon */}
        <div className={`relative `}>
         
            <div onClick={() => setopen(true)} className={`sm:hidden transition-all duration-1000 ${open ?  "translate-x-[500%]":"translate-x-0"}`}>
              
           <img src={assets.menu} className='h-7 w-7 cursor-pointer relative bottom-0' alt="menu" />
                
            </div>


        </div>

        {<div className={`sm:hidden  w-full fixed top-0 h-full border border-black transition-all duration-1000 ${open ? "right-0" : "-right-full"
          }`}>
          <div onClick={() => setopen(false)} className='pt-6'>

            <lord-icon
              src="https://cdn.lordicon.com/bwhjesak.json"
              trigger="hover"
              colors="primary:#000000"
              style={{ width: "28px", height: "28px", cursor: "pointer" }}
            ></lord-icon>
          </div>

          <div className='flex flex-col items-center h-full py-1'>
            <NavLink to={'/'} className={'   cormorant hover:text-black text-slate-700 border-t w-full py-1'}>
            <div className='pl-3'>Home</div>
            </NavLink>
            <NavLink to={'/Collection'} className={'   cormorant hover:text-black text-slate-700 border-t w-full py-1'}>
            <div className='pl-3'>Collection</div>
            </NavLink>
           <NavLink to={'/About'} className={'   cormorant hover:text-black text-slate-700 border-t w-full py-1'}>
            <div className='pl-3'>About</div>
            </NavLink>
            <NavLink to={'/Contact'} className={'   cormorant hover:text-black text-slate-700 border-t w-full py-1'}>
            <div className='pl-3'>Contact</div>
            </NavLink>
          </div>

        </div>}







   
    </div>
  )
}

export default Navbar
