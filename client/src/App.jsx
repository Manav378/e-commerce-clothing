import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Collection from './Pages/Collection.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'
import Product from './Pages/product.jsx'
import Cart from './Pages/Cart.jsx'
import Login from './Pages/Login.jsx'
import PlaceOrder from './Pages/PlaceOrder.jsx'
import Orders from './Pages/Orders.jsx'
import Navbar from './Components/Navbar.jsx'
import Hero from './Components/Hero.jsx'
import React from 'react'
function App() {
  
  const [open, setopen] = useState(false);

  return (
    <>
     <div className=' px-4 sm:px-[7vw] md:px-[7vw] lg:px-[7vw]' >
      <Navbar open={open} setopen = {setopen}/>
    
      <Routes>
        <Route path='/' element={<Home open={open} setopen = {setopen}/>} />
        <Route path='/Collection' element={<Collection/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Contact' element={<Contact/>} />
        <Route path='/Product/:ProductId' element={<Product/>} />
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Place-order' element={<PlaceOrder/>} />
        <Route path='/Orders' element={<Orders/>} />
      </Routes>
     </div>
    </>
  )
}

export default App
