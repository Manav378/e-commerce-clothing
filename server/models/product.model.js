import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    price:{type:Number , required:true},
    image:{type:Array , required:true},
    category:{type:String , required:true},
    subcategory:{type:String , required:true},
    size:{type:Array , required:true},
    bestseller:{type:Boolean},
    date:{type:Number , required:true}
})

// Explicitly use the existing MongoDB collection "products"
const productModel = mongoose.models.product || mongoose.model("product", ProductSchema, "products")

export default productModel
