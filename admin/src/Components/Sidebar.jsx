import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Plus, ChevronRight, ClipboardList } from 'lucide-react';

const menuItems = [
  { id: 'add', name: 'Add Item', icon: <Plus size={18} />, path: '/add' },
  { id: 'list', name: 'List Item', icon: <ChevronRight size={18} />, path: '/list' },
  { id: 'orders', name: 'Orders', icon: <ClipboardList size={18} />, path: '/orders' },
];

const Sidebar = () => {
  const [selected, setSelected] = useState('add');

  return (
    <aside className="flex flex-col min-h-screen w-64 p-4 bg-gray-100 border-r  border-gray-200">
    

      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          onClick={() => setSelected(item.id)}
          className={`flex  gap-3 p-1 mb-2 mt-2 border rounded-sm w-full relative left-4
            ${selected === item.id ? 'border-gray-200 bg-black text-white' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
        >
          <div
            className={`p-1 rounded-sm flex items-center justify-center 
              ${selected === item.id ? 'bg-black text-white' : ''}`}
          >
            {item.icon}
          </div>
          <span className="font-medium">{item.name}</span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
