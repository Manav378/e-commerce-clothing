import React from 'react';
import { Routes, Route, useFetcher } from 'react-router-dom';
import Navbar from './Components/Navbar.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Add from './Pages/Add.jsx';
import _List from './Pages/_List.jsx';
import Orders from './Pages/Orders.jsx';
import { useState,useEffect,useRef } from 'react';
import Login from './Components/Login.jsx';
import {   toast } from 'react-toastify';

export const currency = '$';
const App = () => {

  const [token, settoken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :'');

  const backenUrl = import.meta.env.VITE_BACKEND_URL
 

useEffect(() => {
  if (token && !sessionStorage.getItem("adminToastShown")) {
    toast.success("Welcome back to Admin Panel 👋");
    sessionStorage.setItem("adminToastShown", "true");
  }
}, [token]);




 
  return (
   
    <div className="font-sans min-h-screen bg-gray-100 flex flex-col">

    
      {token === "" ? <Login backendUrl={backenUrl}  settoken={settoken}/> 
      :  <>
   

      {/* Top Navbar */}
      <Navbar settoken={settoken} />

      {/* Main Layout */}
      <div className="flex flex-1 min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/add" element={<Add backenUrl={backenUrl} token={token}  />} />
            <Route path="/list" element={<_List token={token} backenUrl={backenUrl}/>} />
            <Route path="/orders" element={<Orders token={token} />} />
          </Routes>
        </main>
      </div>




     </>
      }

      
  
    </div>
  );
};

export default App;
