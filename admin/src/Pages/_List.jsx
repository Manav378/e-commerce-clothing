import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { X } from "lucide-react"
import { currency } from '../App.jsx'

const _List = ({ backendUrl, token }) => {

  const [List, setList] = useState([])

  const fetchData = async () => {
    try {
      const response = await axios.get(
        backendUrl + '/api/product/list',
        { headers: { token } }
      )

      if (response.data.success) {
        setList(response.data.products)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handelList = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/product/remove',
        { id },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success("Product removed")
        fetchData()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <p className='mb-4 text-2xl font-bold font-display'>ALL PRODUCTS LIST</p>

     
      <div className='hidden md:grid grid-cols-[100px_2fr_1fr_100px_80px] gap-4 p-3 font-semibold bg-slate-300 rounded'>
        <p className='font-display'>Image</p>
        <p className='font-display'>Name</p>
        <p className='font-display'>Category</p>
        <p className='font-display'>Price</p>
        <p className='font-display'>Action</p>
      </div>

  
      <div className='flex flex-col gap-4 mt-2'>
        {
          List.map((item, index) => (
            <div
              key={index}
              className='
                border border-slate-400 rounded-lg p-3
                flex flex-col gap-3
                md:grid md:grid-cols-[100px_2fr_1fr_100px_80px] md:items-center
              '
            >
            
              <div className='flex justify-center md:justify-start'>
                <img
                  src={item.image[0]}
                  className='w-24 h-24 object-cover rounded'
                  alt=""
                />
              </div>

              
              <p className='font-semibold text-lg md:text-base font-display'>
                {item.name}
              </p>

        
              <p className='text-sm text-gray-600 font-display'>
                {item.category}
              </p>

           
              <p className='font-semibold font-display'>
                {currency}{item.price}
              </p>

             
              <div className='flex justify-end md:justify-center'>
                <X
                  size={22}
                  className='cursor-pointer text-black-500 hover:scale-110 transition'
                  onClick={() => handelList(item._id)}
                />
              </div>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default _List
