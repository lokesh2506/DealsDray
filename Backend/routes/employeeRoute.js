const express=require('express');
const isAuth = require('../Middleware/isAuth');
const uploadFile = require('../Middleware/multer');
const { addEmployee, updateEmployee,deleteEmployee, getAllEmployee, getEmpbyId } = require('../controller/employeeController');
const router=express.Router()

router.post('/register',isAuth,uploadFile,addEmployee);
router.put('/update',isAuth,uploadFile,updateEmployee);
router.delete('/delete/:f_Id',isAuth,deleteEmployee);
router.get('/all',isAuth,getAllEmployee)
router.get('/update/:f_Id',isAuth,getEmpbyId)


module.exports=router;