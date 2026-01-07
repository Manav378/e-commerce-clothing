import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Add from "./Pages/Add";
import _List from "./Pages/_List";
import Orders from "./Pages/Orders";
import Login from "./Components/Login";
import { toast } from "react-toastify";

export const currency = "$";

const App = () => {
  const [token, settoken] = useState(localStorage.getItem("token") || "");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (token && !sessionStorage.getItem("adminToastShown")) {
      toast.success("Welcome back to Admin Panel 👋");
      sessionStorage.setItem("adminToastShown", "true");
    }
  }, [token]);

  if (!token) {
    return <Login backendUrl={backendUrl} settoken={settoken} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar settoken={settoken} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/add" element={<Add backendUrl={backendUrl} token={token} />} />
            <Route path="/list" element={<_List token={token} backendUrl={backendUrl} />} />
            <Route path="/orders" element={<Orders token={token} backendUrl={backendUrl} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
