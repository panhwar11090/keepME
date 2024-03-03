import React from "react";
import { useNavigate } from "react-router-dom"
function Header() {
  const logo = (
    <img
      src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
      alt="logo"
    />

    
  );
  const navigate = useNavigate()
  const handleLogout = () => {
    // Clear token or perform any necessary logout actions
    // For example, you can remove token from local storage
    localStorage.removeItem('token');

    // Navigate to login page
    // eslint-disable-next-line react-hooks/rules-of-hooks
    navigate('/login');
  };
  return (
    <div className="bg-white ml-0 mt-0 px-10 py-2 shadow-md flex flex-row items-center" style={{width:"100%"}}>
      <div className="flex items-center">
        {logo}
        <h1 className="text-gray-700 text-xl font-semibold">Keep</h1>
      </div>
      <button 
        className="bg-yellow-200 text-gray-700 px-4 py-2 rounded hover:bg-yellow-300 focus:outline-none" style={{marginLeft:"90%"}}
        onClick={handleLogout}
      >Logout</button>
      
    </div>
  );
}

export default Header;