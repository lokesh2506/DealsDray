const jwt=require('jsonwebtoken');
const Login = require('../models/loginSchema');


const isAuth=async(req,res,next)=>{
    try {
        
        const token=req.cookies.token;

        if(!token){
            return res.status(403).json({
                message:"Please Login"
            })
        }

        const decodeData=jwt.verify(token,process.env.SIGNATURE)
        
        if(!decodeData){
            return res.status(403).json({
                message:"token expires"
            })
        }
        
        req.user=await Login.findOne({f_userName:decodeData.userName});
        
        next()
    } catch (error) {
        res.status(500).json({
            message:"please Login..."
        })
    }
}

module.exports=isAuth