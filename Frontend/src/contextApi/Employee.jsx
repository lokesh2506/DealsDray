import axios from "axios";
import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const createEmployee = async (formData) => {
    try {
      setBtnLoading(true);
      const { data } = await axios.post("/employee/register", formData);
      setBtnLoading(false);
      window.location.reload();
      toast.success(data?.message);
    } catch (error) {
      console.error("Employee creation Error:", error);
      setBtnLoading(false);
      toast.error(
        error?.response?.data?.message ||
          (error?.response?.data.includes("Invalid file type.")
            ? "Invalid File Type"
            : null)
      );
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/employee/all");
      return response?.data;
    } catch (error) {
      console.error("Fetch Error", error);
      return error;
    }
  };

  const updateEmployee = async (formData) => {
    try {
      setBtnLoading(true);
      const { data } = await axios.put("/employee/update", formData);
      setBtnLoading(false);
      toast.success(data?.message);
    } catch (error) {
      console.error("Employee Update Error:", error);
      setBtnLoading(false);
      toast.error(
        error?.response?.data?.message ||
          (error?.response?.data.includes("Invalid file type.")
            ? "Invalid File Type"
            : null)
      );
    }
  };

  const updateFetch = async (id) => {
    try {
      const response = await axios.get(`employee/update/${id}`);
      console.log("id",id,response)
    return response?.data;
    } catch (error) {
      console.error("Error fetching employee data:", error);
      return error;
    }
  };

  return (
    <EmployeeContext.Provider
      value={{ createEmployee, btnLoading, fetchData, updateEmployee, updateFetch }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
