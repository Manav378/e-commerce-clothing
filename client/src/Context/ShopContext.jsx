import { createContext } from "react";
import { products } from "../assets/assets";
import { useState, } from "react";
import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();




const ShopContextProvider = (props)=>{
const currency = '$';
const delevery_fee = 10;
const [search, setsearch] = useState('');
const [showsearch, setshowsearch] = useState(false);
const [CartItems, setCartItems] = useState({});
const navigate = useNavigate();

const addtocart = async(itemId , size)=>{
    let cartData = structuredClone(CartItems)
    if(!size){
        toast.error('Select Product Size');
        return
    }

    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1
        }else{
            cartData[itemId][size] = 1;
        }
    }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

}

const getCartCount = ()=>{
    let totalcount = 0;
    for (const items in CartItems) {
      for (const item in CartItems[items]) {
        try {
            if(CartItems[items][item] > 0){
                totalcount += CartItems[items][item] 
            }
            
        } catch (error) {
            
        }   
    }
}
return totalcount;
}


const updateQuantity = (itemId , size , quantity)=>{
            let cartData = structuredClone(CartItems);
            cartData[itemId][size] = quantity;
            setCartItems(cartData);
}


const getCartAmount = ()=>{
        let totalAmount = 0;
        for (const items in CartItems) {
            let itemInfo = products.find((product)=>product._id === items);
            for (const item in CartItems[items]) {
               try {
                if(CartItems[items][item] > 0){
                    totalAmount += itemInfo.price * CartItems[items][item];
                }
               } catch (error) {
                
               }
                
                
            }
            
        }

        return totalAmount;
}



    const value = {
        products,currency,delevery_fee,
        search,setsearch,showsearch,setshowsearch,
        CartItems ,addtocart,getCartCount,updateQuantity,
        getCartAmount,navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider