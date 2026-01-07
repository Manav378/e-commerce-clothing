import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ backendUrl, token }) => {

  const [image1, setimage1] = useState(false);
  const [image2, setimage2] = useState(false);
  const [image3, setimage3] = useState(false);
  const [image4, setimage4] = useState(false);


  const [name, setName] = useState("");
  const [description, setdescription] = useState('');
  const [price, setprice] = useState('');
  const [category, setcategory] = useState("Men");
  const [subcategory, setsubcategory] = useState("Topwear");
  const [bestseller, setbestseller] = useState(false);
  const [sizes, setsizes] = useState([]);

  const onSubmithandeler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()



      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subcategory", subcategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: { token } })

      if(response.data.success){
        toast.success("Product Added")
        setName('')
        setdescription('')
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        setprice('')
       
      
      
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmithandeler} className="flex flex-col gap-4 w-full font-sans px-2 sm:px-6">

   

      {/* Upload Images */}
      <div>
        <p className="mb-2 font-medium font-display">Upload Image</p>
        <div className="flex flex-wrap gap-3">

          <label htmlFor="image1">
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setimage1(e.target.files[0])}
            />
            <img src={!image1 ? assets.upload : URL.createObjectURL(image1)} className="w-20 cursor-pointer" />
          </label>

          <label htmlFor="image2">
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setimage2(e.target.files[0])}
            />
            <img src={!image2 ? assets.upload : URL.createObjectURL(image2)} className="w-20 cursor-pointer" />
          </label>

          <label htmlFor="image3">
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setimage3(e.target.files[0])}
            />
            <img src={!image3 ? assets.upload : URL.createObjectURL(image3)} className="w-20 cursor-pointer" />
          </label>

          <label htmlFor="image4">
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setimage4(e.target.files[0])}
            />
            <img src={!image4 ? assets.upload : URL.createObjectURL(image4)} className="w-20 cursor-pointer" />
          </label>

        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 font-display">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full sm:max-w-md border rounded-sm border-slate-300 p-3"
          type="text"
          placeholder="Type here..."
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 font-display">Product description</p>
        <textarea
          onChange={(e) => setdescription(e.target.value)}
          value={description}
          className="w-full sm:max-w-md border rounded-sm border-slate-300 p-3"
          rows={4}
          placeholder="Write content here..."
          required
        />
      </div>

      {/* Category / Subcategory / Price */}
      <div className="flex flex-col sm:flex-row gap-4">

        <div>
          <p className="mb-2 font-display">Product category</p>
          <select onChange={(e) => setcategory(e.target.value)} value={category} className="border p-2 rounded">

            <option>Men</option>
            <option>Women</option>
            <option>Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-display">Product Subcategory</p>
          <select onChange={(e) => setsubcategory(e.target.value)} value={subcategory} className="border p-2 rounded">
            <option>Topwear</option>
            <option>Bottomwear</option>
            <option>Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-display">Product Price</p>
          <input onChange={(e) => setprice(e.target.value)}
            value={price}
            className="border p-2 rounded w-32"
            type="number"
            placeholder="25"
          />
        </div>

      </div>

      {/* Product Sizes */}
      <div>
        <p className="mb-2 font-display">Product Sizes</p>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map(size => (
            <div
              key={size}
              onClick={() => setsizes(prev => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size])}
              className={`w-10 h-10 ${sizes.includes(size) ? "bg-black text-white" : "bg-slate-200"} flex items-center justify-center cursor-pointer rounded`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 items-center font-display">
        <input onChange={() => setbestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>



      <button
        type="submit"
        className="mt-4 bg-black text-white px-6 py-3 rounded-sm 
             hover:bg-neutral-900 transition-all duration-200
             w-full sm:w-fit cursor-pointer font-display"
      >
        ADD PRODUCT
      </button>
    </form>
  )
}

export default Add
