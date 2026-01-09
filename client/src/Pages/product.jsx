import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Titel from '../Components/Titel.jsx'
import RelatedProducts from "../Components/RelatedProducts.jsx";
import { toast } from "react-toastify";

const Product = () => {
  const { ProductId } = useParams();
  const { products, currency, addtocart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setsize] = useState('');

  useEffect(() => {
    if (!products.length) return;

    const foundProduct = products.find(
      (item) => item._id === ProductId
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [ProductId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 cormorant">

      <div className="flex flex-col sm:flex-row gap-10 sm:gap-12">

       
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-4">

        
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18%] gap-2">
            {productData.image?.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[22%] sm:w-full sm:mb-3 cursor-pointer rounded-lg border border-gray-200 hover:border-black transition-all"
                alt=""
              />
            ))}
          </div>

       
          <div className="w-full sm:w-[80%] rounded-2xl overflow-hidden shadow-xl">
            <img src={image} className="w-full object-cover rounded-2xl" alt="" />
          </div>

        </div>

      
        <div className="flex-1 flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 cormorant">{productData.name}</h1>

          <div className="flex items-center gap-1 mt-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.Star} width={'12px'} alt="" />
            ))}
            <img src={assets.half_star} width={'14px'} alt="" />
            <span className="text-gray-700 ml-2">(122)</span>
          </div>

          <p className="mt-3 text-2xl sm:text-3xl text-gray-900 font-bold cormorant">
            {currency}{productData.price}
          </p>

          <p className="mt-2 text-gray-600 text-base leading-7 cormorant">{productData.description}</p>

       
          <p className="mt-4 text-lg font-semibold cormorant">Select Size</p>
          <div className="flex flex-wrap gap-3 mt-2">
            {productData.size?.map((item, index) => (
              <button
                key={index}
                onClick={() => setsize(item)}
                className={`px-4 py-2 sm:px-3 sm:py-2 rounded-lg cursor-pointer border transition-all
                  ${item === size ? 'border-gold text-gold font-semibold' : 'border-gray-300 text-gray-700 hover:border-black'}
                  cormorant`}
              >
                {item}
              </button>
            ))}
          </div>

    
          <button
            onClick={() => {
              if (!size) {
                toast.info("Please select a size before adding to cart!");
                return;
              }
              addtocart(productData._id, size);
              toast.success("Product added to cart!");
            }}
            className="w-full sm:w-[60%] cursor-pointer bg-black text-white py-3 mt-6 tracking-wide rounded-lg hover:bg-gray-900 transition cormorant font-semibold"
          >
            ADD TO CART
          </button>

        
          <div className="mt-6 space-y-2 text-gray-700 cormorant">
            <p>✔ 100% Original Product</p>
            <p>✔ Cash on Delivery Available</p>
            <p>✔ Easy Returns within 7 Days</p>
          </div>
        </div>

      </div>

    
      <div className="mt-20 mb-20 border-t pt-10">
        <div className="flex gap-8 items-center border-b pb-3 text-sm font-semibold cormorant">
          <button className="text-black border-b-2 border-black pb-2">Description</button>
          <button className="text-gray-400 hover:text-black transition">Reviews (122)</button>
        </div>

        <div className="mt-6 max-w-5xl text-gray-600 leading-7 space-y-4 cormorant">
          <p>
            An e-commerce website is an online platform that enables users to buy and
            sell products or services through the internet. It allows businesses to
            showcase their products digitally and reach customers globally.
          </p>

          <p>
            These platforms typically include detailed product information such as
            images, pricing, available sizes or colors, and return policies. Each
            product usually has a dedicated page designed to provide a smooth and
            informative shopping experience.
          </p>
        </div>
      </div>

    
      <Titel text1={'RELATED'} text2={'PRODUCTS'} />
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />

    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
