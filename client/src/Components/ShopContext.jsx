import { createContext } from "react";
import { products } from "../assets/assets";

import React from "react";

export const ShopContext = createContext();

const currency = '₹';
const delevery_fee = 10;



const ShopContextProvider = (props)=>{
    const value = {
        products,currency,delevery_fee
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider