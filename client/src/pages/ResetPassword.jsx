import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`https://e-manager-api.vercel.app/auth/reset-password/${token}`, { password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

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
                    <button type="submit" className='bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1'>
                        Reset Password
                    </button>
                </form>
                {message && <p className='text-center text-gray-700 mt-3'>{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
