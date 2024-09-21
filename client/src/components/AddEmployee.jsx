import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    age: '',
    gender: '',
    nationality: '',
    address: '',
    contacts: '',
    category: '',
    salary: '',
    photo: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    if (e.target.name === 'photo') {
      setEmployee({ ...employee, [e.target.name]: e.target.files[0] });
    } else {
      setEmployee({ ...employee, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in employee) {
      if (key === 'photo' && employee[key]) {
        formData.append(key, employee[key], employee[key].name);
      } else {
        formData.append(key, employee[key]);
      }
    }
  
    try {
      setLoading(true);
      await axiosInstance.post('/api/employees', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      navigate('/home');
    } catch (error) {
      console.error('Error uploading employee data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center h-screen">
      {loading && (
        <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={`bg-white p-4 rounded-lg shadow-md w-80 ${loading ? 'filter blur-sm' : ''}`}
      >
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={employee.age}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={employee.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={employee.nationality}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={employee.address}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="email"
          name="contacts"
          placeholder="Contacts"
          value={employee.contacts}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={employee.category}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 px-4 text-sm hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
