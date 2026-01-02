import jwt from 'jsonwebtoken'


const adminAuth = async(req,res,next)=>{
    try {
        const {token} = req.headers;
        if(!token) return res.json({success:false,message:"Not Authorized Login Again"} )
        const tokendecode = jwt.verify(token , process.env.JWT_TOKEN)
        if(tokendecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD ){
            return res.json({success:false,message:"Not Authorized Login Again"} )
        }
        next();
    } catch (error) {
        return res.json({sucess:false , message:error.message});
    }
}

export default adminAuth;