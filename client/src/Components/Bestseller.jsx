import React, { useContext } from 'react'
import { ShopContext } from './ShopContext'
import { useEffect,useState } from 'react';
import Titel from './Titel';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';

const Bestseller = ({open}) => {

    const {products} = useContext(ShopContext);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item)=>item.bestseller)
        setbestseller(bestproduct.slice(0,5))
    }, []);
  return (
    <div className={`my-6 transition-all duration-800 ${open ? "translate-x-[-200%]" : "translate-x-0" }`}>
      <div className='text-sm md:text-5xl lg:text-7xl text-gray-500 '>
        <Titel text1={'BEST'} text2={'SELLER'}/>
          <p className='w-3/4 text-xs sm:text-sm m-auto md:text-base text-center text-gray-700 cormorant'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, exercitationem?</p>
      </div>



      {/*Rendering bestseller produts */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4 gap-y-3 '>

        {
            bestseller.map((item , index)=>(
                <ProductItem key={item._id} name={item.name} price={item.price} id={item._id} image={item.image}/>
            ))
        }
        </div>


            {/* Policy Section — Fully Responsive */}
      <section className="features flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-28 lg:gap-48 xl:gap-60 my-12 w-full">

        {/* 1st Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.exchange} className="w-8 md:w-12" alt="Easy Exchange" />
          </div>
          <h3 className="text-sm md:text-lg font-semibold">Easy Exchange Policy</h3>
          <p className="text-gray-500 text-xs md:text-sm">
            We offer hassle free exchange policy
          </p>
        </div>

        {/* 2nd Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.returnPolicy} className="w-8 md:w-12" alt="Return Policy" />
          </div>
          <h3 className="text-sm md:text-lg font-semibold">7 Days Return Policy</h3>
          <p className="text-gray-500 text-xs md:text-sm">
            We provide 7 days free return policy
          </p>
        </div>

        {/* 3rd Policy */}
        <div className="feature-box text-center w-[60%] sm:w-[30%] md:w-[200px]">
          <div className="flex items-center justify-center mb-3">
            <img src={assets.support} className="w-8 md:w-12" alt="Customer Support" />
          </div>
          <h3 className="text-sm md:text-lg font-semibold">Best customer support</h3>
          <p className="text-gray-500 text-xs md:text-sm">
            We provide 24/7 customer support
          </p>
        </div>

      </section>


    </div>
  )
}

export default Bestseller
