import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ open, setopen }) => {
  const { getCartCount, setshowsearch, backendUrl, setisLoggedin ,isLoggedin} = useContext(ShopContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(`${backendUrl}/api/auth/logout`);
      if (data.success) setisLoggedin(false);
      toast.success("Logged out successfully");
      navigate("/Signup");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      
      <div className="sticky top-0 z-50 w-full h-[16vh] bg-white flex items-center justify-between px-6 md:px-12 shadow-sm">

    
        <div className="sm:w-[14vw] w-[30vw]">
          <NavLink to="/">
            <img src={assets.logo} className="w-full" alt="TRENDCASA Logo" />
          </NavLink>
        </div>

        
        <ul className="hidden sm:flex gap-6">
          {["/", "/Collection", "/About", "/Contact"].map((path, i) => (
            <NavLink
              key={i}
              to={path}
              className={({ isActive }) =>
                isActive
                  ? "text-black cormorant font-semibold border-b-2 border-black"
                  : "text-gray-600 cormorant hover:text-black transition-colors"
              }
            >
              {path === "/" ? "Home" : path.replace("/", "")}
            </NavLink>
          ))}
        </ul>

     
        <div className="flex items-center gap-5 cursor-pointer">
        
          <lord-icon
            src="https://cdn.lordicon.com/wjyqkiew.json"
            trigger="hover"
            colors="primary:#000000"
            style={{ width: 28, height: 28 }}
            onClick={() => setshowsearch(true)}
          />

        
   <div
  className="relative  cursor-pointer rounded-full"
  onClick={() => navigate('/collection')}
>
  <lord-icon
    src="https://cdn.lordicon.com/kdduutaw.json"
    trigger="hover"
    stroke="bold"
    state="hover-rotation"
    colors="primary:#000000,secondary:#000000"
    style={{ width: "28px", height: "28px" }}
  />

           <div className="absolute right-0 top-full hidden group-hover:flex z-50">
  <div className="flex flex-col bg-white shadow-lg rounded-xl w-44 overflow-hidden">

    {!isLoggedin ? (
   
      <NavLink
        to="/Signup"
        className="cormorant px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
      >
        Login / Signup
      </NavLink>
    ) : (
  
      <>
        <NavLink
          to="/orders"
          className="cormorant px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-black"
        >
          Orders
        </NavLink>

        <button
          onClick={logout}
          className="cormorant text-left px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 hover:text-black"
        >
          Logout
        </button>
      </>
    )}

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
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs px-1.5 rounded-full cormorant">
              {getCartCount()}
            </span>
          </Link>

      
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

   
      <div
        className={`fixed top-0 right-0 h-full w-full bg-white z-50 transition-transform duration-500 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
          }`}
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
              className="cormorant text-slate-700 border-b py-2 hover:text-black transition-colors"
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
