import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import React from 'react'
import ShopContextProvider from './Context/ShopContext.jsx'
import { ToastContainer } from 'react-toastify'



createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={true}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  toastClassName="custom-toast"
  bodyClassName="custom-toast-body"
/>


  <ShopContextProvider>
     

    <App />
  </ShopContextProvider>
  </BrowserRouter>,
)
