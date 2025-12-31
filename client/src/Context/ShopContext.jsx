import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { products } from "../assets/assets";
import React from "react";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setisLoggedin] = useState(false);
  const [UserData, setUserData] = useState(null);
  

  // Auth check
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/isAunthenticated`, {
        withCredentials: true,
      });

      if (data.success) {
        setisLoggedin(true);
        setUserData(data.userId || null);
      } else {
        setisLoggedin(false);
        setUserData(null);
        toast.error("User Not authenticated!")
      }
    } catch (error) {
      setisLoggedin(false);
      setUserData(null);
        toast.error("User Not authenticated!")
    }
  };


  const getUserData = async()=>{
    try {
        const {data} = await axios.get(`${backendUrl}/api/user/data`)
        if(data.success){
            setUserData(data.UserData)
        }else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(() => {
    // Skip auth check for signup/login
    if (["/signup"].includes(location.pathname.toLowerCase())) return;

    getAuthState();
  }, [location.pathname]);

  // Logout
  const logout = async () => {
    try {
      await axios.get(`${backendUrl}/api/auth/logout`, { withCredentials: true });
      setisLoggedin(false);
      setUserData(null);
      toast.success("Logged out successfully");
      navigate("/signup");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  // Cart & other stuff
  const [CartItems, setCartItems] = useState({});
  const currency = "$";
  const delevery_fee = 10;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);

  const addtocart = (itemId, size) => {
    let cartData = structuredClone(CartItems);
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (!cartData[itemId]) cartData[itemId] = {};
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in CartItems) {
      for (const size in CartItems[items]) {
        count += CartItems[items][size] || 0;
      }
    }
    return count;
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(CartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const items in CartItems) {
      let itemInfo = products.find((p) => p._id === items);
      for (const size in CartItems[items]) {
        total += (itemInfo?.price || 0) * CartItems[items][size];
      }
    }
    return total;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delevery_fee,
        search,
        setsearch,
        showsearch,
        setshowsearch,
        CartItems,
        addtocart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        backendUrl,
        isLoggedin,
        setisLoggedin,
        UserData,
        setUserData,
        logout,
        navigate,
        getUserData,
        UserData,
        setUserData
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
