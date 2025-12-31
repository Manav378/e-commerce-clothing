import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import { assets } from '../assets/assets.js'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const SearchBar = () => {

    const {search,setsearch,showsearch,setshowsearch} = useContext(ShopContext)
    const [visible, setvisible] = useState(false);
    const location = useLocation()

    useEffect(() => {
      if(location.pathname.includes('Collection')){
        setvisible(true);
      }else{
        setvisible(false);
      }
   
    }, [location]);




  return  showsearch && visible ? (
    <div className='w-full h-[15vh] bg-gray-50 '>
        <div className='flex items-center justify-center gap-3'>
        <div className=' top-4 w-[66vw] sm:w-[45vw] h-[7vh] border border-gray-400 mt-6 rounded-full flex items-center justify-end'>
        <input className='w-full h-full rounded-full  border-none outline-none ml-3' value={search} onChange={(e)=>setsearch(e.target.value)} type="text" placeholder='  Search Bar' />
        <img className='mr-3  cursor-pointer'  width={'22px'} src={assets.Searchicon} alt="" />
        </div>
        <img className='mt-6 cursor-pointer' onClick={()=>setshowsearch(false)} width={'22px'} src={assets.Cross} alt="" />
                
        </div>
    </div>
  ) : null
}

export default SearchBar
