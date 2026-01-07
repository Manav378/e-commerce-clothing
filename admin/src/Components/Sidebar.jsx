import React from "react";
import { NavLink } from "react-router-dom";
import { Plus, ChevronRight, ClipboardList, X } from "lucide-react";

const menuItems = [
  { id: "add", name: "Add Item", icon: <Plus size={18} />, path: "/add" },
  { id: "list", name: "List Item", icon: <ChevronRight size={18} />, path: "/list" },
  { id: "orders", name: "Orders", icon: <ClipboardList size={18} />, path: "/orders" },
];

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`
        fixed md:static z-50
        top-0 left-0 h-full
        w-64 bg-slate-100 border-r border-gray-200
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b md:hidden">
          <p className="font-semibold font-display">Admin Panel</p>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded
                 ${
                   isActive
                     ? "bg-black text-white"
                     : "text-gray-700 hover:bg-gray-100"
                 }`
              }
            >
              {item.icon}
              <span className="font-display">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
