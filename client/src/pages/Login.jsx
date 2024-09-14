import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

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
            const url = "https://e-manager-api.vercel.app/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, accessToken, refreshToken, name, error } = result;
            if (success) {
                localStorage.setItem('token', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('loggedInUser', name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                const details = error?.details[0].message;
                alert(details);
            } else if (!success) {
                alert(message);
            }
        } catch (err) {
            alert(err);
        } finally {
            setIsLoading(false);
        }
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
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='password' className='text-xl'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <button type='submit' className='bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1'>
                            Login
                        </button>
                        <span className='text-center text-gray-600 text-sm mt-4'>Create an account? <Link to="/signup" className='text-blue-500 hover:text-blue-700'>Signup</Link></span>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Login;
