import React, { useContext, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contextApi/contextProvider';


const Login = ({value}) => {
  const [userName,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const navigate = useNavigate();
  const {btnLoading,LoginUser,isAuth,RegisterUser}=useContext(AppContext);

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(value!=='new'){
        LoginUser(userName,password,navigate);
    }
    else{
        RegisterUser(userName,password,navigate);
    }
  }

  return (
    <>
    <div className=' w-screen h-full flex justify-center items-center mt-10'>
        <div className='max-w-md w-full p-8'>
          <h2 className='text-3xl font-semibold text-center mb-8'>
            {
            value!=='new'?`Login to DealsDray`:'Register to DealsDray' 
        }
          </h2>
          <form action="" className='mt-8' onSubmit={(e)=>handleSubmit(e)}>
            <div className='flex flex-col mb-4'>
              <label className='mb-1 font-medium text-sm '>Username</label>
              <input type="text" placeholder='Username' className='p-3 rounded-md bg-gray-800 border text-white border-gray-700 focus:outline-none focus:border-gray-600 ' required onChange={(e)=>setUserName(e.target.value)} value={userName} />
            </div>          
            <div className='flex flex-col mb-4'>
              <label className='mb-1 font-medium text-sm '>Password</label>
              <input type="password" placeholder='Password' className='p-3 rounded-md bg-gray-800 border text-white border-gray-700 focus:outline-none focus:border-gray-600 ' required onChange={(e)=>setPassword(e.target.value)} value={password} />
            </div>
            <div className=' flex  justify-center '>
            {
                value!=='new'?
                <Link  to={'/register'}>don't have a account?</Link>:
                <Link  to={'/'}>already have a account?</Link>
            }
            </div>
            <button disabled={btnLoading} className='w-full bg-blue-600 p-3 rounded-full mt-5' >{
              btnLoading?"Please Wait..." : value!=='new'?"Login":"Register"
              }</button>
          </form>
        </div>
    </div></>
  )
}

export default Login