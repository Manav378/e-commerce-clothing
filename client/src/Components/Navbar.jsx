import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ open, setopen }) => {
  return (
    <>
      {/* ===== NAVBAR (STATIC – NO TRANSLATE) ===== */}
      <div className="sticky top-0 z-50 w-full h-[20vh] bg-white flex items-center justify-between ">

        {/* Logo */}
        <div className="sm:w-[14vw] w-[30vw]">
          <NavLink to="/">
            <img src={assets.logo} className="w-full" alt="logo" />
          </NavLink>
        </div>

        {/* Desktop Links */}
        <ul className="hidden sm:flex gap-6">
          {["/", "/Collection", "/About", "/Contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-black cormorant font-semibold border-b-2 border-black"
                  : "text-gray-600 cormorant hover:text-black"
              }
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}
        </ul>
        

        {/* Icons */}
        <div className="flex items-center gap-5">
          <lord-icon
            src="https://cdn.lordicon.com/wjyqkiew.json"
            trigger="hover"
            colors="primary:#000000"
            style={{ width: 28, height: 28 }}
          />
<div className="relative group">
  {/* Profile Icon */}
  <lord-icon
    src="https://cdn.lordicon.com/kdduutaw.json"
    trigger="hover"
    stroke="bold"
    state="hover-rotation"
    colors="primary:#000000,secondary:#000000"
    style={{ width: "28px", height: "28px", cursor: "pointer" }}
  ></lord-icon>

  {/* Dropdown */}
<div className="absolute right-0 top-full hidden group-hover:flex z-50">


    <div className="flex flex-col bg-white shadow-lg rounded-xl w-40 overflow-hidden">

      <NavLink
        to="/profile"
        className="cormorant px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        My Profile
      </NavLink>

      <NavLink
        to="/orders"
        className="cormorant px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Orders
      </NavLink>

      <button
        onClick={() => console.log("logout")}
        className="cormorant text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Logout
      </button>

    </div>
  </div>
</div>

          <Link to="/cart" className="relative">
            <lord-icon
              src="https://cdn.lordicon.com/uisoczqi.json"
              trigger="hover"
              colors="primary:#000000"
              style={{ width: 28, height: 28 }}
            />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </Link>

          {/* Mobile Menu Icon */}
          {!open && (
            <img
              src={assets.menu}
              onClick={() => setopen(true)}
              className="sm:hidden h-7 w-7 cursor-pointer"
              alt="menu"
            />
          )}
        </div>
      </div>

      {/* ===== MOBILE SIDEBAR (ONLY HERE TRANSLATE IS USED) ===== */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50
        transition-transform duration-500 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <lord-icon
            src="https://cdn.lordicon.com/bwhjesak.json"
            trigger="hover"
            onClick={() => setopen(false)}
            style={{ width: 28, height: 28, cursor: "pointer" }}
          />
        </div>

        <nav className="flex flex-col px-6 gap-4">
          {["/", "/Collection", "/About", "/Contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              onClick={() => setopen(false)}
              className="cormorant text-slate-700 border-b py-2"
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
