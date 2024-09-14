import React, { useState } from 'react';
import axios from 'axios';
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
      await axios.post('https://e-manager-api.vercel.app/api/employees', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error uploading employee data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md w-80">
        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={employee.age}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={employee.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={employee.nationality}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={employee.address}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="email"
          name="contacts"
          placeholder="Contacts"
          value={employee.contacts}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={employee.category}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded py-2 px-4 text-sm hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddEmployee;