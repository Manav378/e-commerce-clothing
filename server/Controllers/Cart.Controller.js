import UserModels from "../models/Usermodels.js"


export const addToCart = async(req , res)=>{
    try {
        const {  itemId , size} = req.body;
         const userId = req.userId
        const userData = await UserModels.findById(userId)
      let cartData = await userData.cartData 

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        await UserModels.findByIdAndUpdate(userId, { cartData })


        res.json({success:true , message:"Added To Cart"})
    } catch (error) {
         res.json({success:false , message:error.message})
    }
}
export const updateCart = async(req, res) => {
    try {
        const {  itemId, size, quantity } = req.body;
        const userId = req.userId

        const user = await UserModels.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.cartData) user.cartData = {};

        const qty = Number(quantity);

        if (qty === 0) {
            if (user.cartData[itemId]) {
                delete user.cartData[itemId][size];
                if (Object.keys(user.cartData[itemId]).length === 0) {
                    delete user.cartData[itemId];
                }
            }
        } else {
            if (!user.cartData[itemId]) user.cartData[itemId] = {};
            user.cartData[itemId][size] = qty;
        }

        user.markModified("cartData");
        await user.save();

        res.json({ success: true, cartData: user.cartData });

    } catch (error) {
        console.log("UPDATE CART ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getuserCart = async(req , res)=>{
    try {
        const userId = req.userId
        const userData = await UserModels.findById(userId)
        let cartData = await userData.cartData;

        res.json({success:true,message:cartData})



    } catch (error) {
            res.json({success:false , message:error.message})
    }
}