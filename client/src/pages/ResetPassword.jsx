import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }
        
        setLoading(true);

        try {
            const response = await axios.post(`https://e-manager-api.vercel.app/auth/reset-password/${token}`, { password });
            setMessage(response.data.message);
            setShowModal(true);
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleYesClick = () => {
        closeModal();
        navigate('/login');
    }

    return (
        <div className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
            <div className='bg-[#d8feff] p-8 rounded-lg w-full max-w-sm shadow-md'>
                <h2 className='text-4xl font-bold mb-5'>Reset Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div className='flex flex-col relative'>
                        <label htmlFor='password' className='text-xl'>New Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-0 top-9 text-sm px-2 py-1 text-blue-500"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <div className='flex flex-col relative'>
                        <label htmlFor='confirmPassword' className='text-xl'>Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                        />
                        <button
                            type="button"
                            onClick={toggleConfirmPasswordVisibility}
                            className="absolute right-0 top-9 text-sm px-2 py-1 text-blue-500"
                        >
                            {showConfirmPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className={`bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1 flex justify-center items-center`}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                ></path>
                            </svg>
                        ) : (
                            'Reset Password'
                        )}
                    </button>
                </form>
                {message && <p className='text-center text-gray-700 mt-3'>{message}</p>}
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg w-full max-w-sm relative">
                        <button
                            className="absolute top-2 right-3 text-xl font-bold text-gray-700 hover:text-red-500"
                            onClick={closeModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Your password has been reset.</h2>
                        <p className="text-lg mb-6">Do you want to login?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                                onClick={handleYesClick}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700"
                                onClick={closeModal}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
