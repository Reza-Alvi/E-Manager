import React, { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { FaSpinner } from 'react-icons/fa';

const SearchDropdown = ({ onSearch }) => {
    const [searchBy, setSearchBy] = useState('name');
    const [searchGender, setSearchGender] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [age, setAge] = useState('');
    const [category, setCategory] = useState('');
    const [salary, setSalary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const params = {};
            if (searchTerm) params[searchBy] = searchTerm;
            if (searchGender !== 'All') params.gender = searchGender;
            if (age) params.age = age;
            if (category) params.category = category;
            if (salary) params.salary = salary;

            const response = await axiosInstance.get('/api/employees/search', {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            console.log(response.data);
            onSearch(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <select value={searchBy} onChange={(e) => setSearchBy(e.target.value)} className="w-full p-1 border rounded">
                <option value="name">Search by Name</option>
                <option value="email">Search by Email</option>
            </select>
            <input
                type="text"
                placeholder={`Enter ${searchBy}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2 w-full p-1 border rounded"
            />
            <select value={searchGender} onChange={(e) => setSearchGender(e.target.value)} className="mt-2 w-full p-1 border rounded">
                <option value="All">All</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            <input
                type="number"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="mt-2 w-full p-1 border rounded"
            />
            <input
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full p-1 border rounded"
            />
            <input
                type="number"
                placeholder="Enter Salary"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="mt-2 w-full p-1 border rounded"
            />
            <button onClick={handleSearch} className="mt-2 w-full p-1 bg-blue-500 text-white rounded">
                {isLoading ? <FaSpinner className="animate-spin" /> : 'Search'}
            </button>
        </div>
    );
};

export default SearchDropdown;
