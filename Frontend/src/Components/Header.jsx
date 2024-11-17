import React, { useContext } from 'react';
import logo from '../assets/Deals_Dray_logo.jpg';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../contextApi/contextProvider';

const Header = () => {
  const { isAuth ,Username,LogoutUser} = useContext(AppContext);

  
  const headerItems = [
    { path: "/", element: "Home" },
    { path: "/list", element: "Employee List" }
  ];

  return (
    
      <div className='p-5 h-[10%] w-[100%] flex justify-between items-center  '>
      <Link to={'/'}><img src={logo} className='h-full object-cover w-12 rounded-full ' alt="Company Logo" /></Link>
       
          {headerItems.map((item,index) => (
            isAuth  ? ( 
              <NavLink 
                key={item.path+index} 
                to={item.path} 
                className={({isActive}) => (isActive ? 'text-gray-400 border-x-0 border-t-0 border-b-2 border-blue-500 ' : 'hover:text-gray-500')}
              >
                {item.element}
              </NavLink>
            ) : null
          ))}
          {isAuth?<>
            <h3>{Username}</h3>
            <button className='bg-red-600 py-2 px-5 rounded-full' onClick={LogoutUser}> Logout</button>
          </>:null}
       
      </div>
  );
}

export default Header;
