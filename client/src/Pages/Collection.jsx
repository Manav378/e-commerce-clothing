import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../Components/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import ProductItem from "../Components/ProductItem.jsx";
import Titel from "../Components/Titel.jsx";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [isshow, setisshow] = useState(false);
  const [pro, setpro] = useState([]);
  const [category, setcategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [sorType, setsorType] = useState('revalent');
  useEffect(() => {
    setpro(products);
  }, [products]);

const productfilter = ()=>{
  let filproduct =[...products]
  if(category.length > 0 ){
     filproduct = filproduct.filter(item=>category.includes(item.category))
  }
  if(subCategory.length > 0 ){
     filproduct = filproduct.filter(item=>subCategory.includes(item.subCategory))
  }

      setpro(filproduct);
}

const optionfilter = ()=>{
       let fcopy =[...products]
switch(sorType){
  case 'low-high' :
   setpro(fcopy.sort((a,b)=>a.price-b.price));
   break;
  case 'high-low' :
   setpro(fcopy.sort((a,b)=>b.price-a.price));
   break;
    default:
      productfilter();
      break;

}

}
useEffect(() => {
 
optionfilter();
}, [sorType]); 


  useEffect(() => {
    productfilter();
 
  }, [category , subCategory , products ]);


  
  const toggleTypes = (e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=>prev.filter(item=>item != e.target.value))
    }else{
      setsubCategory(prev=>[...prev , e.target.value])
    }
  }

  const togglecategory = (e)=>{
    if(category.includes(e.target.value)){
      setcategory(prev=>prev.filter(item=>item != e.target.value))
    }else{
      setcategory(prev=>[...prev , e.target.value])
    }
  }

 

  return (
    <div className="w-full  min-h-screen border border-slate-300">
   <Titel text1={'ALL'} text2={'COLLECTION'} className=''/>

 <select onChange={(e)=>setsorType(e.target.value)}
  className="
    relative left-[10%] mt-3 sm:left-[61%] md:left-[70%] lg-[81%]
    border border-slate-300 
    rounded-lg 
    px-4 py-2 
    text-sm 
    font-medium 
    text-gray-700 
    bg-white 
    focus:outline-none 
    focus:ring-2 
    focus:ring-black 
    focus:border-black
    cursor-pointer
    hover:border-black
    transition-all
  "
>
  <option value="relavent">Sort by : Relevant</option>
  <option value="low-high">Sort by : Low → High</option>
  <option value="high-low">Sort by : High → Low</option>
</select>
  



      <div className="flex flex-col sm:flex-row">

        {/* ===== FILTER HEADER (MOBILE) ===== */}
        <div className="sm:hidden flex justify-between p-4 border-b w-full">
          <h2 className="text-xl font-semibold">Filters</h2>
          <img
            onClick={() => setisshow(!isshow)}
            className={`w-6 cursor-pointer transition-transform duration-300 ${
              isshow ? "rotate-90" : ""
            }`}
            src={assets.Dropdown}
            alt="toggle"
          />
        </div>

        {/* ===== FILTER SIDEBAR ===== */}
        <div
          className={`flex flex-col gap-y-6 p-4 w-full   sm:w-[300px] 
          border-r border-slate-300 bg-white
          ${isshow ? "block" : "hidden"} sm:block`}
        >
          <h2 className="hidden sm:block text-3xl font-bold mb-2">Filters</h2>

          {/* Categories */}
          <div className="border my-4 p-3 rounded-md">
            <h3 className="font-semibold mb-2">Categories</h3>
            {["Men", "Women", "Kids"].map(cat => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox"     checked={category.includes(cat)} value={cat} className="w-4 h-4" onChange={togglecategory}/> {cat}
              </label>
            ))}
          </div>

          {/* Types */}
          <div className="border p-3 rounded-md">
            <h3 className="font-semibold mb-2">Types</h3>
            {["Topwear", "Bottomwear", "Winterwear"].map(sub => (
              <label key={sub} className="flex items-center gap-2">
                <input type="checkbox"     checked={subCategory.includes(sub)}  value={sub} onChange={toggleTypes} className="w-4 h-4" /> {sub}
              </label>
            ))}
          </div>
        </div>

        {/* ===== PRODUCTS ===== */}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-6">
         
          {pro.map(item => (
            <ProductItem
              key={item._id}
              name={item.name}
              image={item.image}
              id={item._id}
              price={item.price}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Collection;
