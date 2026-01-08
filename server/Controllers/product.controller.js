import {v2 as cloudinary} from 'cloudinary'

productModel
import productModel from '../models/product.model.js'

// function for add product ✅
export const addproduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subcategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

   const images = [image1, image2, image3, image4].filter((item)=>item != undefined)

  let imagesUrl = await Promise.all(
    images.map(async(item)=>{
      let result = await cloudinary.uploader.upload(item.path , {resource_type:'image'});
      return result.secure_url;
    })
  )

  const ProdutData = {
      name,
      description,
      price:Number(price),
      image: imagesUrl,
      category,
      subcategory,
      size: JSON.parse(sizes),
      bestseller:bestseller === "true" ,
      date:Date.now()
  };

  // console.log(ProdutData);

  const product = new productModel(ProdutData);
  await product.save();

    res.json({success:true, message:"Product added"} );
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// function for list product ✅
export const ListProducts = async (req, res) => {
    try {
        const products = await productModel.find({}); // ye MongoDB se data laega
        console.log(products); // debug ke liye console me check karo
        res.json({ success: true, products }); // frontend me ye jaayega
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// function for Remove product ✅
export const removeProduct = async (req, res) => {
   try {
     await productModel.findByIdAndDelete(req.body.id);
     res.json({success:true , meessage:"Products Deleted Successfully"})
   } catch (error) {
      res.json({ success: false, message: error.message });
   }

};

// function for Single product ✅
export const singleProduct = async (req, res) => {
  try {
      const {productId} = req.body;

  const product = await productModel.findById(productId);

  res.status(201).json({success:true , message:product});
  } catch (error) {
      res.json({ success: false, message: error.message });
  }

  
};
