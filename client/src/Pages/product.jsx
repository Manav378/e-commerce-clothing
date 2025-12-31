import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import Titel from '../Components/Titel.jsx'
import RelatedProducts from "../Components/RelatedProducts.jsx";

const Product = () => {
  const { ProductId } = useParams();
  const { products,currency,addtocart, CartItems} = useContext(ShopContext);

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
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">

        {/* LEFT - Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">

          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:w-[18%]">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className="w-[24%] sm:w-full sm:mb-3 cursor-pointer"
                alt=""
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img src={image} className="w-full" alt="" />
          </div>

        </div>

        {/* RIGHT - Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.Star} width={'11px'} alt="" />
            <img src={assets.Star} width={'11px'} alt="" />
            <img src={assets.Star} width={'11px'} alt="" />
            <img src={assets.Star} width={'11px'} alt="" />
            <img src={assets.half_star} width={'14px'} alt="" />
            <div className="text-black">(122)</div>
          </div>

          <p className="mt-4 text-xl sm:text-2xl lg:text-3xl font-semibold">{currency}{productData.price}</p>

          <p className="mt-2 text-sm sm:text-base lg-text-lg text-gray-500">{productData.description}</p>



          <p className="mt-3 font-bold text-2xl">Product Size</p>
          <div className="flex items-center gap-3">
            {
              productData.sizes.map((item, index) => (
                <button onClick={() => setsize(item)} key={index} className={` w-[15vw] h-[8vh] md:w-[5vw] md:h-[5vh] lg:w-[4vw] lg:h-[8vh] sm:w-[6vw] sm:h-[8vh] bg-slate-200 mt-3 cursor-pointer ${item === size ? ' border-2 border-orange-500' : ''}`}>{item}</button>
              ))

            }

          </div>

          {/* ADD TO CART */}
          <button onClick={()=>addtocart(productData._id ,size)} className="w-[40%] cursor-pointer bg-black text-white py-3 mt-6 tracking-wide hover:opacity-90 transition my-3">
            ADD TO CART
          </button>

          {/* QUICK INFO */}
          <div className="mt-6 space-y-2 text-sm text-gray-600 ">
            <p>✔ 100% Original product</p>
            <p>✔ Cash on Delivery available</p>
            <p>✔ Easy returns within 7 days</p>
          </div>
        </div>

      </div>





      <div className="mt-20 mb-20 border-t pt-10">

        {/* Tabs Header */}
        <div className="flex gap-8 items-center  border-b pb-3 text-sm font-medium">
          <button className="text-black border-b-2 border-black pb-2">
            Description
          </button>
          <button className="text-gray-400 hover:text-black transition">
            Reviews (122)
          </button>
        </div>

        {/* Description Content */}
        <div className="mt-6 max-w-5xl text-sm text-gray-600 leading-7 space-y-4">
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


      <Titel text1={'RELATED'} text2={'PRODUCTS'}  />
           

           <RelatedProducts category={productData.category}  
  subCategory={productData.subCategory} />

    </div>





  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
