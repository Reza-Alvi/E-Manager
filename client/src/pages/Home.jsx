import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import EmployeeCard from '../components/EmployeeCard';
import SearchBar from '../components/SearchDropdown';
import Navbar from '../components/Navbar';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (searchResults) => {
    setEmployees(searchResults);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {loading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <Navbar onSearch={handleSearch} />
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap gap-4">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <EmployeeCard key={employee._id} employee={employee} />
            ))
          ) : (
            <p className="text-center w-full text-gray-600">No employees found.</p>
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
