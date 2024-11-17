import { createContext, useState } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'


export const AppContext=createContext();
export const ContextProvider=({children})=>{
const [Username,setUserName]=useState('');
const [btnLoading,setBtnLoading]=useState(false);
const [isAuth,setIsAuth]=useState(false)

const LoginUser=async(name,password,navigate)=>{
    try {
        setBtnLoading(true);
        const {data}=await axios.post('/user/login',{f_userName:name,f_Pwd:password});
        setBtnLoading(false);
        setIsAuth(true);
        toast.success(data?.message)
        setUserName(name)
    } catch (error) {
        setBtnLoading(false);
        setIsAuth(false);
        console.log("Login Error :",error)
        toast.error(error?.response?.data?.message)
    }
}

const RegisterUser=async(name,password,navigate)=>{
    try {
        setBtnLoading(true);
        const {data}=await axios.post('/user/register',{f_userName:name,f_Pwd:password});
        setBtnLoading(false);
        setIsAuth(true);
        toast.success(data?.message)
        setUserName(name)
    } catch (error) {
        setBtnLoading(false);
        setIsAuth(false);
        console.log("Login Error :",error)
        toast.error(error?.response?.data?.message)
    }
}
    const LogoutUser=async()=>{
        try {
            const{data}=await axios.get("/user/logout");
            setIsAuth(false);
            toast.success(data.message)
        } catch (error) {
            console.log("Logout error",error)
        }
    }


    const FetchUser=async()=>{
        try {
            const {data}=await axios.get("/user/profile");
            setIsAuth(true);
            setUserName(data.username)
          
            return data;
        } catch (error) {
            console.log("Error :",error);
            setIsAuth(false);
            return {error:'Failed to fetch user data'}
        }
    }
    
    return (
        <AppContext.Provider value={{btnLoading,LoginUser,isAuth,Username,RegisterUser,LogoutUser,FetchUser}}>
            {children}
        </AppContext.Provider>
    )
}