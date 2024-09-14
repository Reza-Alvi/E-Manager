import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEllipsisV } from 'react-icons/fa';
import { useState } from 'react';

const EmployeeCard = ({ employee }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    await axios.delete(`https://e-manager-api.vercel.app/api/employees/${employee._id}`, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    });
    window.location.reload();
  };

  const handleEdit = () => {
    navigate(`/edit-employee/${employee._id}`);
  };

  const handleDetails = () => {
    navigate(`/employee-details/${employee._id}`);
  };

  return (
    <div className="relative bg-white p-4 rounded-lg shadow-md w-72 z-10">
      <div className="absolute top-2 right-2">
        <FaEllipsisV
          className="text-gray-600 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        />
        {showMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-20">
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleDetails}
            >
              Details
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <img src={employee.photo} alt="Employee" className="w-full rounded-lg mb-4" />
      <p className="text-center text-gray-700 mb-2">Name: {employee.name}</p>
      <p className="text-center text-gray-700 mb-2">Category: {employee.category}</p>
      <p className="text-center text-gray-700 mb-2">Contacts: {employee.contacts}</p>
      <p className="text-center text-gray-700 mb-4">Salary: {employee.salary}</p>
    </div>
  );
};

export default EmployeeCard;