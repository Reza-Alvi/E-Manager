import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://e-manager-api.vercel.app/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
            setMessage(errorMessage);
        } finally {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setMessage('');  
    };

    return (
        <div className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
            <div className='bg-[#d8feff] p-8 rounded-lg w-full max-w-sm shadow-md'>
                <h2 className='text-4xl font-bold mb-5'>Forgot Password</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
                    <div className='flex flex-col'>
                        <label htmlFor='email' className='text-xl'>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                        />
                    </div>
                    <button type="submit" className='bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1'>
                        Send Reset Link
                    </button>
                </form>
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white rounded-lg p-6 max-w-sm w-full relative">
                            <button onClick={closeModal} className="absolute top-2 right-2 text-xl">&times;</button>
                            <h3 className="text-2xl font-semibold mb-4">Message</h3>
                            <p className="text-lg">{message}</p>
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
