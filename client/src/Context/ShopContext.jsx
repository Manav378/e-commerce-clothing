import { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import React from "react";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setisLoggedin] = useState(false);
  const [UserData, setUserData] = useState(null);
  const [products, setproducts] = useState([]);
  
axios.defaults.withCredentials = true;

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
    
      }
    } catch (error) {
      setisLoggedin(false);
      setUserData(null);
     
    }
  };


  const getProductsData = async()=>{
    try {
      const response = await axios.get(backendUrl+"/api/product/list" )
      if(response.data.success){
        setproducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    
    getProductsData()
  }, []);


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
  const pathlocation = location.pathname.toLowerCase();

  // ignore auth pages
  if (
    pathlocation === "/signup" ||
    pathlocation.startsWith("/reset-password")
  ) {
    return;
  }

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

  const [CartItems, setCartItems] = useState({});
  const currency = "$";
  const delevery_fee = 10;
  const [search, setsearch] = useState("");
  const [showsearch, setshowsearch] = useState(false);

  const addtocart = async(itemId, size) => {
 const cartData = structuredClone(CartItems || {});

if (!cartData[itemId]) {
  cartData[itemId] = {};
}

if (!cartData[itemId][size]) {
  cartData[itemId][size] = 0;
}

cartData[itemId][size] += 1;

setCartItems(cartData);


    try {
      await axios.post(backendUrl+"/api/Cart/add",{itemId , size},{withCredentials:true});
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    
    
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


  const updateQuantity = async (itemId, size, quantity) => {
   
    setCartItems(prev => {
      const cartData = structuredClone(prev || {});
      if (quantity === 0) {
        if (cartData[itemId]) {
          delete cartData[itemId][size];
          if (Object.keys(cartData[itemId]).length === 0) delete cartData[itemId];
        }
      } else {
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
      }
      return cartData;
    });

   
    try {
      await axios.post(
        backendUrl + "/api/Cart/update",
        { itemId, size, quantity: Number(quantity) },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Cart update failed");
    }
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

 const getUserCartData = async () => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/Cart/get`,
      {}, 
      { withCredentials: true } // MUST have this
    );

    if (data.success) {
      setCartItems(data.message);
    } else {
      toast.error("Failed to fetch cart data");
    }
  } catch (error) {
    console.log(error);
    // toast.error(error.response?.data?.message || error.message);
  }
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
        setCartItems
        
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
