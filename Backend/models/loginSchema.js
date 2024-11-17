const mongoose=require('mongoose');


const loginSchema= new mongoose.Schema({
    f_sno:{
        type:Number,
        required:true,
        unique:true,
    },
    f_userName:{
        type:String,
        required:true,
        unique:true,
    },
    f_Pwd:{
        type:String,
        required:true
    }
})

const Login=mongoose.model('Login',loginSchema)

module.exports=Login