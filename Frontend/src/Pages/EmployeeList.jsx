import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { EmployeeContext } from '../contextApi/Employee';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const EmployeeList = () => {
    const navigate=useNavigate()
    const { fetchData } = useContext(EmployeeContext);
    const [title] = useState(['Sno', 'Image', 'Name', 'Email', 'Mobile No', 'Designation', 'Gender','Course', 'Create Date', 'Action']);
    
    const { data, isLoading, error } = useQuery({
        queryKey: ["Fetch-Data"],
        queryFn: fetchData,
    });

    const employees = data || [];

   
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5; 
    const totalEmployees = employees.length;
    const totalPages = Math.ceil(totalEmployees / pageSize); 

    const [sortField, setSortField] = useState('f_Name'); 
    const [sortOrder, setSortOrder] = useState('asc'); 

    const handleSortFieldChange = (e) => {
        setSortField(e.target.value);
    };

    
    const handleSortOrderChange = (e) => {
        setSortOrder(e.target.value);
    };

    
    const sortedEmployees = [...employees].sort((a, b) => {
        let valueA = a[sortField];
        let valueB = b[sortField];

        
        if (sortField === 'f_Createdate') {
            valueA = new Date(valueA);
            valueB = new Date(valueB);
        }

       
        if (sortOrder === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
            return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
    });

   
    const indexOfLastEmployee = currentPage * pageSize;
    const indexOfFirstEmployee = indexOfLastEmployee - pageSize;
    const currentEmployees = sortedEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

   
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

const deleteEmployee=async(id)=>{
   try {
     const {data}=await axios.delete(`employee/delete/${id}`)
    if(data){
        toast.success(data.message)
    }
    window.location.reload()
   } catch (error) {
    console.log(Error)
   }
}

    return (
        <div className='p-3'>
            <div className='flex justify-between px-5'>
                <h2 className='text-2xl'>Create Employee</h2>
                <div className='flex items-center'>
                    
                    <h2 className='mx-10'>
                        {isLoading ? 'Loading...' : `Total count: ${totalEmployees}`}
                    </h2>
                    <Link to={'/create'}><button className='bg-green-500 px-6 py-3 rounded-full'>Create Employee</button></Link>
                </div>
            </div>

       
            {error && <div className="text-red-500">{`Error: ${error.message}`}</div>}

           
            <div className="my-4">
                <label className="mr-4">Sort by: </label>
                <select value={sortField} onChange={handleSortFieldChange} className="p-2 border bg-gray-500 text-white border-gray-300 rounded">
                    <option value="f_Name">Name</option>
                    <option value="f_Email">Email</option>
                    <option value="f_Mobile">Mobile No</option>
                    <option value="f_Designation">Designation</option>
                    <option value="f_Course">Course</option>
                    <option value="f_Createdate">Create Date</option>
                </select>
                <label className="ml-4 mr-4">Order: </label>
                <select value={sortOrder} onChange={handleSortOrderChange} className="p-2 border  bg-gray-500 text-white border-gray-300 rounded">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>

           
            {!isLoading && !error && (
                <div>
                    <div className='grid grid-cols-10 mb-5'>
                        {
                            title.map((value, index) => (
                                <h2 key={index}>{value}</h2>
                            ))
                        }
                    </div>
                    {currentEmployees.map((value) => (
                        <div className="grid grid-cols-10 mb-5" key={value.f_Id}>
                            <h2>{value.f_Id}</h2>
                            <img src={value.f_Image.url} className='w-10' alt="Employee" />
                            <h2>{value.f_Name}</h2>
                            <h2>{value.f_Email}</h2>
                            <h2>{value.f_Mobile}</h2>
                            <h2>{value.f_Designation}</h2>
                            <h2>{value.f_gender}</h2>
                            <h2>{value.f_Course}</h2>
                            <h2>{value.f_Createdate}</h2>
                            <div className='flex'>
                                <button className='bg-blue-600 rounded-2xl px-5 py-1' onClick={()=>navigate(`/update/${value.f_Id}`)}>Edit</button>
                                <button className='bg-red-600 rounded-2xl px-5 py-1'onClick={()=>deleteEmployee(value.f_Id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            
            <div className="flex justify-center mt-5">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l-md disabled:bg-gray-500"
                >
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r-md disabled:bg-gray-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default EmployeeList;
