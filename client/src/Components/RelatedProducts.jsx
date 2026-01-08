import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem.jsx";

const normalize = (str) =>
  str?.toString().trim().toLowerCase();

const RelatedProducts = ({ category, subcategory, productId }) => {
  const { products } = useContext(ShopContext);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    if (!products?.length || !category) {
      setRelatedProduct([]);
      return;
    }

    const filteredProducts = products.filter(item =>
      item._id !== productId &&
      normalize(item.category) === normalize(category) &&
      (!subcategory ||
        normalize(item.subcategory || "") === normalize(subcategory))
    );

    setRelatedProduct(filteredProducts.slice(0, 5));
  }, [products, category, subcategory, productId]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 w-[90%] mx-auto mt-6">
      {relatedProduct.map(item => (
        <ProductItem
          key={item._id}
          id={item._id}
          name={item.name}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

export default RelatedProducts;
