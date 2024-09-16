import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Profile = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile', {
                    headers: { Authorization: localStorage.getItem('accessToken') }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axiosInstance.put('/auth/profile', user, {
                headers: { Authorization: localStorage.getItem('accessToken') }
            });
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded"
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="mt-2 w-full p-2 border rounded"
            />
            <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Save Changes
            </button>
        </div>
    );
};

export default Profile;
