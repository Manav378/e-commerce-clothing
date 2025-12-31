import React, { useContext } from 'react'
import { useState , useEffect} from 'react'
import { ShopContext } from '../Context/ShopContext';
import ProductItem from './ProductItem.jsx';

const RelatedProducts = ({category , subCategory}) => {
    
    const [relatedProduct, setrelatedProduct] = useState([]);
    const {products} = useContext(ShopContext);
    useEffect(() => {
        let copyProduct = products.slice();
        if(products.length > 0){
    copyProduct = copyProduct.filter(
  item => item.category?.toLowerCase() === category.toLowerCase() &&
          item.subCategory?.toLowerCase() === subCategory.toLowerCase()
);
        }
       setrelatedProduct(copyProduct.slice(0,5));
        
    }, [products]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5  w-[90%] mx-auto mt-6'>

       {
        relatedProduct.map((item,key)=>(
            <ProductItem name={item.name} image={item.image} id={item._id} key={item._id} price={item.price} />
        ))
       }
        </div>
  )
}

export default RelatedProducts
