const jwt=require('jsonwebtoken');

const generateToken=(userName,res)=>{
    const token=jwt.sign({userName},process.env.SIGNATURE,{expiresIn:'1d'})
    res.cookie('token',token,{
        maxAge:1 * 24 * 60 * 60 *1000,
        httpOnly:true,
        sameSite:"Strict",
        secure: process.env.NODE_ENV === 'production',
    })
    res.cookie("userName",userName,{
        
            maxAge:1 * 24 * 60 * 60 *1000,
            httpOnly:true,
            sameSite:"Strict",
            secure: process.env.NODE_ENV === 'production',
        
    });
    

}

module.exports=generateToken;