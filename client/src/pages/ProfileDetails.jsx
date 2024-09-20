import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ProfileDetails = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        profilePicture: '',
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');
    const [message, setMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
                });
                const data = response.data;
                setUser({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                    gender: data.gender || '',
                    phoneNumber: data.phoneNumber || '',
                    email: data.email || '',
                    profilePicture: data.profilePicture || '',
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchUserData();
    }, [navigate]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('profilePicture', selectedFile);
    
        setIsUploading(true);
        try {
            const response = await axiosInstance.put('/auth/profile-details', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            setUser(prevUser => ({
                ...prevUser,
                profilePicture: response.data.user.profilePicture || prevUser.profilePicture
            }));
            setMessage('Profile picture updated successfully!');
            setSelectedFile(null);
            setPreview('');
            setShowModal(false);
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            setMessage('Failed to upload profile picture.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Profile Details</h2>
            {message && <p className="mb-4 text-green-600">{message}</p>}
            <div className="space-y-6">
                <div className="flex items-center justify-center">
                    <div onClick={() => setShowModal(true)} className="cursor-pointer">
                        {user.profilePicture ? (
                            <img
                                src={user.profilePicture}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 shadow-lg">
                                <span className="text-gray-700">No Image</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="mt-1 text-lg text-gray-900">{`${user.firstName} ${user.lastName}`}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <p className="mt-1 text-lg text-gray-900">{user.dateOfBirth}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                        <p className="mt-1 text-lg text-gray-900 capitalize">{user.gender}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <p className="mt-1 text-lg text-gray-900">{user.phoneNumber}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>
                </div>
            </div>

            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Upload Profile Picture</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-800">
                                &times;
                            </button>
                        </div>
                        <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" />
                        {preview && (
                            <div className="mt-4">
                                <img src={preview} alt="Preview" className="w-32 h-32 rounded-full object-cover mx-auto shadow-md" />
                            </div>
                        )}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleUpload}
                                disabled={isUploading || !selectedFile}
                                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 focus:outline-none ${(!selectedFile || isUploading) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isUploading ? 'Uploading...' : 'Upload'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
