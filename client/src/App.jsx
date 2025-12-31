import { useState } from 'react'
import React from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Collection from './Pages/Collection.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Product from './Pages/product.jsx'
import Cart from './Pages/Cart.jsx'
import Signup from './Pages/signup.jsx'
import PlaceOrder from './Pages/PlaceOrder.jsx'
import Orders from './Pages/Orders.jsx'
import Navbar from './Components/Navbar.jsx'
import Footer from './Components/footer.jsx'
import SearchBar from './Components/SearchBar.jsx'
import { toast, ToastContainer } from 'react-toastify';
import ResetPassword from './Pages/resetPassword.jsx'
import "react-toastify/dist/ReactToastify.css";
import EmailVerify from './Pages/EmailVerify.jsx'
function App() {

  const [open, setopen] = useState(false);
  const location = useLocation();
  const hidenavbarfooter = location.pathname.toLowerCase() === '/signup' || location.pathname.toLowerCase() === '/reset-password' || location.pathname === '/EmailVerify' 
  return (
    <>
      <div className=' px-4 sm:px-[7vw] md:px-[7vw] lg:px-[7vw]' >

        {!hidenavbarfooter && <Navbar open={open} setopen={setopen} />}

        {!hidenavbarfooter && <SearchBar />}


        <Routes>
          <Route path='/' element={<Home open={open} setopen={setopen} />} />
          <Route path='/Collection' element={<Collection open={open} />} />
          <Route path='/About' element={<About />} />
          <Route path='/Contact' element={<Contact />} />
          <Route path='/Product/:ProductId' element={<Product />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Place-order' element={<PlaceOrder />} />
          <Route path='/Orders' element={<Orders />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/EmailVerify' element={<EmailVerify />} />

        </Routes>
        {!hidenavbarfooter && <Footer open={open} />}


        <ToastContainer
          position="top-right"
          autoClose={2500}         // Toast 2.5s baad auto close
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={true}      // Click par close hona chahiye
          pauseOnHover={true}
          draggable={true}         // Drag kar ke bhi close kar sakte ho
          theme="light"
          toastClassName="bg-white border border-black/20 text-black rounded-none shadow-sm px-5 py-3"
          bodyClassName="text-sm tracking-wide font-light"
        />




      </div>
    </>
  )
}

export default App
