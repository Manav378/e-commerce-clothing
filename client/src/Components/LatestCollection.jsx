import React, { useContext } from 'react'
import { ShopContext } from './ShopContext'
import Titel from './Titel'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    console.log(products)
  return (
    <div className='my-10'>
        <div className='text-center py-2 px-3 '>
            <Titel text1={"LATEST"} text2={'COLLECTIONS'}/>
        </div>
    
    </div>
  )
}

export default LatestCollection
