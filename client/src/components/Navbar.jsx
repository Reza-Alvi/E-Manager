import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import ProfileMenu from '../pages/ProfileMenu';
import axiosInstance from '../utils/axiosInstance';
import SearchDropdown from './SearchDropdown';
import logo from '../assets/emanager.png'; 

function Navbar({ onSearch }) {
  const [sidebar, setSidebar] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/auth/profile');
        const { firstName, lastName, profilePicture } = response.data;
        setUserName(`${firstName} ${lastName}`);
        setProfilePic(profilePicture);
      } catch (error) {
        console.log("Error fetching profile data", error);
      }
    };
    fetchProfileData();
  }, []);

  const showSidebar = () => setSidebar(!sidebar);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearchClick = () => {
    setIsSearchMenuOpen(!isSearchMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <>
      <IconContext.Provider value={{ color: 'red' }}>
        <div className="flex justify-between items-center w-full h-[50px] bg-[#060b26]">
          <div className="flex items-center">
            <Link to="#" className="ml-2 text-2xl bg-none">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <img src={logo} alt="E-Manager Logo" className="h-full ml-2" style={{ height: '80px', width: 'auto' }} />
          </div>
          <div className="flex-grow text-center text-orange-500 font-bold text-xl">
            <span className="font-extrabold text-2xl tracking-wide">E-Manager</span>
          </div>
          <div className="flex items-center ml-auto">
            <div className="relative z-50">
              <FaSearch className="text-white cursor-pointer mx-2" onClick={handleSearchClick} />
              {isSearchMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4">
                  <SearchDropdown onSearch={onSearch} />
                </div>
              )}
            </div>
            <div className="relative z-50">
              {profilePic ? (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="text-white cursor-pointer mx-2"
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  onClick={handleProfileClick}
                />
              ) : (
                <FaIcons.FaUserCircle className="text-white cursor-pointer mx-2" onClick={handleProfileClick} />
              )}

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                  <div
                    className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => navigate('/profile-details')}
                  >
                    Profile
                  </div>
                  <div
                    className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => navigate('/profile')}
                  >
                    Settings
                  </div>
                  <div
                    className="py-2 px-4 cursor-pointer hover:bg-gray-200"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <nav
          className={`${
            sidebar ? 'left-0 duration-[350ms]' : 'left-[-100%]'
          } fixed top-0 flex justify-center transition-all duration-[850ms] bg-[#0f101a] w-[250px] h-[100vh] z-50`}
        >
          <ul className="w-full" onClick={showSidebar}>
            <li className="flex justify-start items-center w-full h-[80px] bg-[#060b26]">
              <Link to="#" className="ml-2 text-2xl bg-none">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => (
              <li key={index} className="flex justify-start items-center h-[60px] list-none py-2 px-4">
                <Link
                  to={item.path}
                  className="text-[#f5f5f5] text-[18px] w-[95%] h-full flex items-center px-4 rounded-md hover:bg-[#e07b0e] no-underline"
                >
                  {item.icon}
                  <span className="ml-4">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
