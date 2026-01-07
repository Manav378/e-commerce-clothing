import React from "react";
import { assets } from "../assets/assets";
import { Menu } from "lucide-react";

const Navbar = ({ settoken, setSidebarOpen }) => {
  const logout = () => {
    settoken("");
    sessionStorage.clear("adminToastShown");
    localStorage.clear("token");
  };

  return (
    <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-gray-400 bg-slate-100">
      
     
      <div className="flex items-center gap-3">
        <Menu
          className="md:hidden cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        />

        <img src={assets.logo} width="120" alt="TrendCasa" />
      </div>

    
      <button
        onClick={logout}
        className="px-4 py-2 bg-black text-white font-display rounded hover:bg-gray-800 active:scale-95"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
