import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeContext } from "../contextApi/Employee";
import { useQuery } from "@tanstack/react-query";

const EmployeeUpdate= () => {
    const {updateEmployee,btnLoading,updateFetch} =useContext(EmployeeContext)
    const {id}=useParams()

    const {data,isLoading,error}=useQuery({
        queryKey:['Update'],
        queryFn:()=>updateFetch(id),
    })
    console.log(data,isLoading,error)


    const navigate = useNavigate();

    const [f_Name, setName] = useState("");
    const [f_Email, setEmail] = useState("");
    const [f_Mobile, setMobile] = useState("");
    const [f_Designation, setDesignation] = useState("");
    const [f_gender, setGender] = useState("");
    const [f_Course, setCourse] = useState([]);
    const [f_Image, setFile] = useState(null);
    const [role] = useState(["HR", "Manager", "Sales"]);
  
    const fileChangeHandler = (e) => {
      const file = e.target.files[0];
      setFile(file);
    };
  
    const handleCourseChange = (event) => {
      const { value } = event.target;
      setCourse(prev =>
        prev.includes(value) ? prev.filter(course => course !== value) : [...prev, value]
      );
    };
  
    const handlePrevent = (e) => {
      e.preventDefault();
      const formData = new FormData();
  
      formData.append("f_Name", f_Name);
      formData.append("f_Email", f_Email);
      formData.append("f_Mobile", f_Mobile);
      formData.append("f_Designation", f_Designation);
      formData.append("f_gender", f_gender);
      formData.append("f_Course", f_Course);
      formData.append("file", f_Image);
  
      updateEmployee(formData);
    };
  
  




  return (
    <div className="p-2">
      <div className="flex justify-between ">
        <h2 className="text-2xl font-bold mb-6 mt-6">Update Employee Details</h2>
       
      </div>

      <div className="max-w-full  ">
        <form className="bg-[#181818] p-6 rounded-lg shadow-lg" onSubmit={(e)=>handlePrevent(e)}  encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="auth-input"
              value={f_Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              placeholder="Email"
              className="auth-input"
              value={f_Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-8">
            <label className="block text-sm font-medium mb-1">Mobile No</label>
            <input
              type="text"
              placeholder="Mobile No"
              className="auth-input"
              value={f_Mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <select
            className="auth-input mb-4"
            value={f_Designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="">Choose Designation</option>
            {role.map((val, i) => (
              <option value={val} key={i}>
                {val}
              </option>
            ))}
          </select>

        

          <div>
            <label className="block text-sm font-medium mb-4 mx-2">Gender</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="Male"
                  className="mx-2"
                  checked={f_gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  className="mx-2"
                  checked={f_gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-4 ">Course</label>
            <label>
              <input
                type="checkbox"
                value="MCA"
                className="mx-2"
                checked={f_Course.includes("MCA")}
                onChange={handleCourseChange}
                
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BCA"
                className="mx-2"
                checked={f_Course.includes("BCA")}
                onChange={handleCourseChange}
                
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                value="BSC"
                className="mx-2"
                checked={f_Course.includes("BSC")}
                onChange={handleCourseChange}
                
              />
              BSC
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image</label>
            <input
                name="file"
              type="file"
               accept="image/*"
              className="auth-input"
              onChange={fileChangeHandler}
              
            />
            <p>.jpg/.png only accepted</p>
          </div>

          <button
            disabled={btnLoading}
            className="bg-blue-600 py-3 rounded-full mt-5 px-7"
            style={{ width: "100px" }}
          >
            {btnLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeUpdate;
