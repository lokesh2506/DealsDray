const Employee = require("../models/employeeSchema");
const  getDataurl = require("../utils/URIgenerator");
const cloudinary=require('cloudinary')

const addEmployee=async(req,res)=>{
   try {
    const {f_Name,f_Email,f_Mobile,f_Designation,f_gender,f_Course}=req.body
    const file = req.file;
    if(!f_Name||!f_Email||!f_Mobile||!f_Designation||!f_gender||!f_Course||!file){
        return res.status(400).send({
            message:'Please fill all the feilds'
        })
    }

    const validateUser = await Employee.findOne({ $or: [{ f_Email }, { f_Mobile }] });
    if(validateUser){
        return res.status(400).send({message:"Employee Already Exists"})
    }
    const mobileRegex = /^[0-9]{10}$/; 
            if (!mobileRegex.test(f_Mobile)) { 
                return res.status(400).send({
                    message: 'Invalid mobile number format'
                });
            }
    
    const fileUrl = getDataurl(file)

    const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);
    
    const lastEmployee = await Employee.findOne().sort({ f_Id: -1 });
    const f_Id = lastEmployee ? lastEmployee.f_Id + 1 : 1;

    console.log(f_Id)
    await Employee.create({
        f_Id,
        f_Name,
        f_Email,
        f_Mobile,
        f_Designation,
        f_gender,
        f_Course,
        f_Image: {
            id: cloud.public_id,
            url: cloud.secure_url,
          },
        f_Createdate:Date.now()
    })
    res.status(201).send({
        message:"Employee Created Successfully",
    })

   } catch (error) {
    console.log("Employee Registration Error:",error);
    res.status(400).send({
        message:"Register Error"
    })
   }

}


const updateEmployee = async (req, res) => {
    try {
        const { f_Id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
        const file = req.file;
        
       console.log("fid",f_Id)
        if ( !f_Id ||!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
            return res.status(400).send({
                message: 'Please fill all the fields'
            });
        }

        
        const employee = await Employee.findOne({ f_Id });
        console.log("emp",employee)
        if (!employee) {
            return res.status(404).send({ message: "Employee Not Found" });
        }

        const mobileRegex = /^[0-9]{10}$/; 
            if (!mobileRegex.test(f_Mobile)) { 
                return res.status(400).send({
                    message: 'Invalid mobile number format'
                });
            }

        
        let f_Image = employee.f_Image
        ; 
        if (file) {
            const fileUrl = getDataurl(file);
            const cloud = await cloudinary.v2.uploader.upload(fileUrl.content);
            f_Image = {
                id: cloud.public_id,
                url: cloud.secure_url,
            };
        }

        
        await Employee.updateOne({ f_Id }, {
            f_Name,
            f_Email,
            f_Mobile,
            f_Designation,
            f_gender,
            f_Course,
            f_Image,
            
        });

        res.status(200).send({
            message: "Employee Updated Successfully"
        });

    } catch (error) {
        console.log("Employee Update Error:", error);
        res.status(400).send({
            message: "Update Error"
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const { f_Id } = req.params;  

        
        if (!f_Id) {
            return res.status(400).send({
                message: 'Employee ID is required'
            });
        }

        
        const employee = await Employee.findOne({ f_Id });
        
       
        if (!employee) {
            return res.status(404).send({ message: "Employee Not Found" });
        }

        
        await Employee.deleteOne({ f_Id });

        
        res.status(200).send({
            message: "Employee Deleted Successfully"
        });

    } catch (error) {
        console.log("Employee Deletion Error:", error);
        res.status(400).send({
            message: "Deletion Error"
        });
    }
};

const getAllEmployee=async(req,res)=>{
    try {
        const data=await Employee.find();
        
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "Getting Employee Error",
        });
    }
}

const getEmpbyId=async(req,res)=>{
    try {
        const id=req.params.f_Id
       
        const data=await Employee.findOne({f_Id:id})
        
        res.status(200).send(data)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: " Employee Error",
            error
        });
    }
}

module.exports = {
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployee, 
    getEmpbyId
};

