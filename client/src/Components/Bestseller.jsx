import React, { useContext } from 'react'
import { ShopContext } from './ShopContext'
import { useEffect,useState } from 'react';
import Titel from './Titel';
import ProductItem from './ProductItem';
import { assets } from '../assets/assets';

const Bestseller = () => {

    const {products} = useContext(ShopContext);
    const [bestseller, setbestseller] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item)=>item.bestseller)
        setbestseller(bestproduct.slice(0,5))
    }, []);
  return (
    <div className={`my-6 `}>
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


 


    </div>
  )
}

export default Bestseller
