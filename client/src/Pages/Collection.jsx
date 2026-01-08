import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext.jsx";
import ProductItem from "../Components/ProductItem.jsx";
import Titel from "../Components/Titel.jsx";

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");


  useEffect(() => {
    let data = [...products];

    if (category.length > 0) {
      data = data.filter((p) => category.includes(p.category));
    }

    if (subcategory.length > 0) {
      data = data.filter((p) => subcategory.includes(p.subcategory));
    }

    if (showsearch && search) {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === "low-high") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high-low") {
      data.sort((a, b) => b.price - a.price);
    }

    setFiltered(data);
  }, [products, category, subcategory, search, showsearch, sortType]);

  const toggle = (value, state, setState) => {
    state.includes(value)
      ? setState(state.filter((i) => i !== value))
      : setState([...state, value]);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] px-4 sm:px-10 py-8">
     
      <Titel text1="EXPLORE" text2="COLLECTION" />

    
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-8 gap-4">
     
        <div className="flex flex-wrap gap-3">
          {["Men", "Women", "Kids"].map((cat) => (
            <button
              key={cat}
              onClick={() => toggle(cat, category, setCategory)}
              className={`px-4 py-1.5 rounded-full cursor-pointer border text-sm transition
              ${
                category.includes(cat)
                  ? "bg-black text-white border-black"
                  : "bg-white border-gray-300 text-gray-700 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}

          {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
            <button
              key={sub}
              onClick={() => toggle(sub, subcategory, setSubcategory)}
              className={`px-4 py-1.5 rounded-full border cursor-pointer text-sm transition
              ${
                subcategory.includes(sub)
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white border-gray-300 text-gray-700 hover:border-slate-800"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

    
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border px-4 py-2 rounded-md bg-white text-sm shadow-sm focus:outline-none"
        >
          <option value="relavent">Sort : Relevant</option>
          <option value="low-high">Price : Low → High</option>
          <option value="high-low">Price : High → Low</option>
        </select>
      </div>

   
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filtered.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-16">
          No products found 😕
        </p>
      )}
    </div>
  );
};

export default Collection;
