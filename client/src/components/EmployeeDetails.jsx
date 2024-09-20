import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/api/employees/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          }
        });
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gray-100">
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return <div className="text-center mt-10">No employee details found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <img
            src={employee.photo}
            alt={employee.name}
            className="w-100 h-50 mb-4"
          />
          <h1 className="text-4xl font-bold mb-4">{employee.name}</h1>
        </div>
        <div className="mt-6">
          <p className="text-lg"><strong>Age:</strong> {employee.age}</p>
          <p className="text-lg"><strong>Gender:</strong> {employee.gender}</p>
          <p className="text-lg"><strong>Nationality:</strong> {employee.nationality}</p>
          <p className="text-lg"><strong>Address:</strong> {employee.address}</p>
          <p className="text-lg"><strong>Category:</strong> {employee.category}</p>
          <p className="text-lg"><strong>Contacts:</strong> {employee.contacts}</p>
          <p className="text-lg"><strong>Salary:</strong> {employee.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
