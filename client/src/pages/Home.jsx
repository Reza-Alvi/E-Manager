import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchDropdown';
import Navbar from '../components/Navbar';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get('/api/employees',{
            headers:{
              Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        if (res.data && Array.isArray(res.data)) {
          setEmployees(res.data);
        } else {
          setEmployees([]);
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
        setEmployees([]);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (searchResults) => {
    setEmployees(searchResults);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
   
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {employees.length > 0 ? (
            employees.map(employee => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No employees found.</p>
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate('/add-employee')}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Employee
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
