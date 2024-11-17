const express=require('express');
const { registerUser, loginUser, myProfile, logoutUser } = require('../controller/loginController');
const isAuth = require('../Middleware/isAuth');
const router=express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/profile",isAuth,myProfile)
router.get("/logout",logoutUser)

module.exports=router;