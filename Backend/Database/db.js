const mongoose = require("mongoose")


const connectDB=async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URL,{
        dbName:"DealsDary",
    })
    console.log("DB connected successfully")
 } catch (error) {
    console.log("DB Connection Error",error)
 }
}
module.exports=connectDB;