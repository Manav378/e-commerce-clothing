import express from 'express'
import { addproduct, ListProducts, removeProduct, singleProduct } from '../Controllers/product.controller.js'
import upload from '../Middelware/Multer.js'
import adminAuth from '../Middelware/Adminauth.js'
const ProductRouter = express.Router()


ProductRouter.post("/add",upload.fields([{name:'image1' , maxCount:1},{name:'image2' , maxCount:1},{name:'image3' , maxCount:1},{name:'image4' , maxCount:1}]),adminAuth, addproduct)
ProductRouter.get("/list" ,adminAuth, ListProducts)
ProductRouter.post("/remove" ,adminAuth, removeProduct)
ProductRouter.post("/single" ,adminAuth, singleProduct)

export default ProductRouter;