import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showWelcomePopup, setShowWelcomePopup] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            alert('Email and password are required');
            return;
        }
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', loginInfo);
            const { success, message, accessToken, refreshToken, error } = response.data;
            if (success) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                
                // Show popup on successful login
                setShowWelcomePopup(true);
                setTimeout(() => {
                    navigate('/'); // Navigate after showing popup
                }, 3000); // Adjust delay as needed
            } else if (error) {
                const details = error?.details[0].message;
                alert(details);
            } else {
                alert(message);
            }
        } catch (err) {
            console.error('Login error:', err);
            alert('Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const closePopup = () => {
        setShowWelcomePopup(false);
    };

    return (
        <div className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
            {isLoading ? (
                <div className="text-xl font-semibold">Loading...</div>
            ) : (
                <div className='bg-[#d8feff] p-8 rounded-lg w-full max-w-sm shadow-md'>
                    <h1 className='text-4xl font-bold mb-5'>Sign in</h1>
                    <form onSubmit={handleLogin} className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-xl'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter E-mail Address*'
                                value={loginInfo.email}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                                autoComplete="email" // Allow autofill for email
                            />
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor='password' className='text-xl'>Password</label>
                            <input
                                onChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                                autoComplete="current-password" // Allow autofill for password
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-0 top-9 text-sm px-2 py-1 text-blue-500"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <Link to="/forgot-password" className="text-right text-blue-500 hover:text-blue-700 text-sm mt-1">
                            Forgot Password?
                        </Link>
                        <button type='submit' className='bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1'>
                            Login
                        </button>
                        <span className='text-center text-gray-600 text-sm mt-4'>Create an account? <Link to="/signup" className='text-blue-500 hover:text-blue-700'>Signup</Link></span>
                    </form>
                </div>
            )}
            {showWelcomePopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <h2 className="text-2xl font-bold">Welcome to E-Manager!</h2>
                        <p className="mt-2">It's a web-based management app designed to help you streamline your tasks and manage your projects effectively.</p>
                        <p className="mt-2">Stay organized and enhance your productivity with our intuitive tools.</p>
                        <p className="mt-4">We are thrilled to have you on board!</p>
                        <button onClick={closePopup} className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
