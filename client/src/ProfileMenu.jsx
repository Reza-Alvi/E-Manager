import React, { useState } from "react";
import { handleError, handleSuccess } from '../utils';
import { Link, useNavigate } from 'react-router-dom'
import { Icons } from "react-toastify";
const ProfileMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout');
    setTimeout(() => {
        navigate('/login');
    }, 100)
}

  return (
    <div className="profile-menu">
    
      <button className="profile-menu-button">Profile</button>
      <div className="profile-menu-options">
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
    </div>
  );
};
export default ProfileMenu;