const express=require('express')
require('dotenv').config();
const cookieParser=require('cookie-parser')
const cors=require('cors')
const cloudinary=require('cloudinary');
const path=require('path')


const app=express()

// MongoDB connection
const MongoDB=require('./Database/db')
MongoDB()


//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
  }));


cloudinary.v2.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API,
    api_secret:process.env.CLOUD_SECRET
})
// importing Routes
const loginRoute=require('./routes/loginRoutes')
const employeeRoute=require('./routes/employeeRoute')

// using Routes
app.use("/user",loginRoute)
app.use("/employee",employeeRoute)

// Backend port 
const port=process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`Server is running in the http://localhost:${port}`)
})