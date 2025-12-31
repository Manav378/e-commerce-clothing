import UserModels from "../models/Usermodels.js";

export const getUserData = async(req,res)=>{
    try {
        const {userId} = req.body;
        const user = await UserModels.findById(userId);
        if(!user) return res.status(404).json({message:"user not found" , success:false})

        return res.status(201).json({
            UserData:{
               name:user.name,
               isAccountVerified:user.isAccountVerified
            },
            sucess:true
        })
    } catch (error) {
        return res.status(401).json({message:error.message});
    }
}