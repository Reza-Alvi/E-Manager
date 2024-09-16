import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ handleSignOut }) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/profile-settings');
  };

  return (
    <div className="profile-menu bg-white shadow-lg rounded-md p-4 absolute right-0 mt-2">
      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleSettingsClick}>Settings</button>
      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default ProfileMenu;
