import axios from 'axios';
import React, { useState ,useEffect} from 'react'
import { toast } from 'react-toastify';
import { X } from "lucide-react";
import { currency } from '../App.jsx';
<X size={20} />


const _List = ({backenUrl , token}) => {
        
        const [List, setList] = useState([]);

        const fetchData = async()=>{
            try {
            const response = await axios.get(backenUrl + '/api/product/list',{headers:{token}})
          if(response.data.success){
            console.log(response.data)
            setList(response.data.products)
          }else{
            toast.error(response.data.message)
          }
          } catch (error) {
            toast.error(error.message)
          }
          
        }

        const handelList = async(id)=>{
          try {
            const response =   await axios.post(backenUrl + '/api/product/remove', {id},{headers:{token}})
              if(response.data.success){
                toast.success("Product removed")
               await fetchData()

              }else{
                toast.error(response.data.message);
              }
            } catch (error) {
            toast.error(error.message)
            
          }
          
      

        }

        useEffect(() => {
          fetchData()
          
        }, []);

  return (
    < >
      <p className='mb-2 text-2xl font-bold text'>ALL PRODUCTS LIST</p>
      <div className='flex flex-col gap-2'>

        <div className='grid grid-cols-[100px_2fr_1fr_100px_80px] gap-4 p-3 items-center text-sm font-semibold rounded-sm bg-slate-300 '>
          <p>Image</p>
          <p>Name</p>
          <p>Category</p>
          <p>Price</p>
          <p>Action</p>
        </div>

     

          {
            List.map((item , index)=>(
                 <div key={index} className='grid grid-cols-[100px_2fr_1fr_100px_80px] gap-4 p-3 border border-slate-300 items-center text-md'>
                <img  src={item.image[0]} width={'80px'} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
               <X onClick={()=>handelList(item._id)} className='cursor-pointer' size={20} />
              </div>
            ))
          }



      </div>
      
    </>
  )
}

export default _List
