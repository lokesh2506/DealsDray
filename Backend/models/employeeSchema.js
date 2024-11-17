const  mongoose=require('mongoose');
const Schema=new mongoose.Schema({
    f_Id:{
        type:Number,
        required:true,
        unique:true
    },
    f_Name:{
        type:String,
        required:true,
        
    },
    f_Email:{
        type:String,
        required:true,
        unique:true,
    },
    f_Mobile:{
        type:String,
        required:true,
        unique:true
    },
    f_Designation:{
        type:String,
        required:true,
    },
    f_gender:{
        type:String,
        required:true,
    },
    f_Course:{
        type:Array,
        required:true,
    },
    f_Image:{
        id:String,
        url:String,
        
    },
    f_Createdate:{
        type:Date,
    }
},{
    timestamps:true
})

const Employee=mongoose.model('Employee',Schema)

module.exports=Employee;