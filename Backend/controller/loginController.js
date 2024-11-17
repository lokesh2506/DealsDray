const bcrypt=require('bcrypt');
const Login = require('../models/loginSchema');
const generateToken = require('../utils/generateToken');
const registerUser=async(req,res)=>{
    try {
        const userCount = await Login.findOne().sort({ f_sno: -1 });
    const f_sno = userCount ? userCount.f_sno + 1 : 1;
        
        const{f_userName,f_Pwd}=req.body;

        if( !f_userName || !f_Pwd){
            return res.status(400).send("Missing UserName/Password")
        }
        
        let User=await Login.findOne({f_userName});

        if(User){
            return res.status(400).send({message:'User Already Exist'})
        }

        const hashPassword=await bcrypt.hash(f_Pwd,10)

         User=await Login.create({
            f_sno,
            f_userName,
            f_Pwd:hashPassword
         })
         generateToken(f_userName,res);
         res.status(200).send({
            message:"Successfully Register",
            usename:User.f_userName
         })
         

    } catch (error) {
        console.log("Registeration Error :",error);
        res.status(400).json({
            message:"Registeration Error",
            error
        })
    }
}

const loginUser=async(req,res)=>{
    try {
        const{f_userName,f_Pwd}=req.body;

        if( !f_userName || !f_Pwd){
            return res.status(400).send("Missing UserName/Password")
        }
        
        const User=await Login.findOne({f_userName});
        
        if(!User){
            return res.status(400).send({message:'Invalid UserName'})
        }

        const comparePassword=await bcrypt.compare(f_Pwd,User.f_Pwd)

        if(!comparePassword){
            return res.status(400).send({message:'Wrong Password'}) 
        }
         generateToken(f_userName,res);

         res.status(200).send({
            message:"Successfully Login",
            usename:User.f_userName
         })
        

    } catch (error) {
        console.log("Login Error :",error);
        res.status(400).json({
            message:"Login Error"
        })
    }
}

const myProfile=async (req,res)=>{
   try {
     const User =await Login.findOne({f_userName:req.user.f_userName})
     res.send({
        message:"Welcome Back...",
        username:User.f_userName
     })
   } catch (error) {
    console.log("Myprofile error:",error)
   }
}

const logoutUser=async(req,res)=>{
    try {
        res.cookie("token","",{
            maxAge:0,
            httpOnly:true,
            sameSite:"Strict",
            secure: process.env.NODE_ENV === 'production'

        })
        res.send({
            message:"Logout Successfully"
        })
    } catch (error) {
        console.log("Logout Error:",error);
    }
}

module.exports={
    loginUser,
    myProfile,
    logoutUser,
    registerUser
}