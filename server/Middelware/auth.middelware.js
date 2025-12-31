import jwt from "jsonwebtoken"


const authMiddelware = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token) return res.status(404).json({message:"Missing token" , sucess:false});
        try {
             const tokenDecoded = jwt.verify(token , process.env.JSON_TOKEN);

    if(tokenDecoded.id){
        req.body.userId = tokenDecoded.id;
    }else{
        return res.status(404).json({
            message:"User is not Authorized login again!",
            success:false
        })
    }
        } catch (error) {
            res.status(401).json(message.error);
        }
        next();
   
}

export default authMiddelware;