import React, { useContext } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router-dom'
import Login from './Pages/Login'
import Home from './Pages/Home'
import { Toaster } from 'react-hot-toast'
import Loading from './Components/Loading'
import { AppContext } from './contextApi/contextProvider'
import { useQuery } from '@tanstack/react-query'
import Header from './Components/Header'
import EmployeeList from './Pages/EmployeeList'
import EmployeeCreate from './Pages/EmployeeCreate'
import { EmployeeContext } from './contextApi/Employee'
import EmployeeUpdate from './Pages/EmployeeUpdate'


const App = () => {
  const {FetchUser,isAuth}=useContext(AppContext)

   const { data, isLoading, error } =useQuery ({
    queryKey: ["FetchUser"],
    queryFn:FetchUser,
  });
  


  return (
   <>
   
   {
    isLoading? <Loading/>:
   <>
    <Header/>
   <Routes>
    <Route path='/' element={isAuth?<Home/>:<Login  />}/>
    <Route path='/register' element={<Login value={"new"}/>}/>
    <Route path='/list' element={<EmployeeList />}/>
    <Route path='/create' element={<EmployeeCreate/>}/>
    <Route path='/update/:id' element={<EmployeeUpdate/>}/>
    
   </Routes>
   </>
  
   }
   <Toaster
          position="top-center"
          reverseOrder={false}
      />
   </>
  )
}

export default App