import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile', {
                    headers: { Authorization: localStorage.getItem('accessToken') }
                });
                setUser({
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    dateOfBirth: response.data.dateOfBirth.split('T')[0] || '',
                    gender: response.data.gender || '',
                    phoneNumber: response.data.phoneNumber || '',
                    email: response.data.email || '',
                    password: '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/auth/profile', user, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage('Failed to update profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={user.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700">Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Leave blank to keep the same password"
                            className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-blue-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
