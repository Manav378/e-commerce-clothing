import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import Titel from './Titel'
import ProductItem from './ProductItem'
import { useState,useEffect } from 'react'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [latestProduct, setlatestProduct] = useState([]);
    useEffect(() => {
      setlatestProduct(products.slice(0,10));
    }, [products]);
  return (
    <div className={``} >
        <div className='text-center py-2 px-3 '>
            <Titel text1={"LATEST"} text2={'COLLECTIONS'}/>
            <p className='w-3/4 text-xs sm:text-sm m-auto md:text-base text-gray-700 cormorant'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, exercitationem?</p>
        </div>


       {/*Rendering prducts */}

        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5  w-[90%] mx-auto mt-6'>

       {
        latestProduct.map((item,key)=>(
            <ProductItem name={item.name} image={item.image} id={item._id} key={item._id} price={item.price} />
        ))
       }
        </div>
    
    </div>
  )
}

export default LatestCollection
