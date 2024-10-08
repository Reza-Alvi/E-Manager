import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { firstName, lastName, dateOfBirth, gender, phoneNumber, email, password, confirmPassword } = signupInfo;
        if (!firstName || !lastName || !dateOfBirth || !gender || !phoneNumber || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const url = "https://e-manager-api.vercel.app/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                setTimeout(() => {
                    navigate('/login');
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
                    <h1 className='text-4xl font-bold mb-5'>Sign Up</h1>
                    <form onSubmit={handleSignup} className='flex flex-col gap-3'>
                        <div className='flex flex-col'>
                            <label htmlFor='firstName' className='text-xl'>First Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='firstName'
                                placeholder='Enter your first name...'
                                value={signupInfo.firstName}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='lastName' className='text-xl'>Last Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='lastName'
                                placeholder='Enter your last name...'
                                value={signupInfo.lastName}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='dateOfBirth' className='text-xl'>Date of Birth</label>
                            <input
                                onChange={handleChange}
                                type='date'
                                name='dateOfBirth'
                                value={signupInfo.dateOfBirth}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='gender' className='text-xl'>Gender</label>
                            <select
                                onChange={handleChange}
                                name='gender'
                                value={signupInfo.gender}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            >
                                <option value='' disabled>Select Gender</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                            </select>
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='phoneNumber' className='text-xl'>Phone Number</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='phoneNumber'
                                placeholder='Enter your phone number...'
                                value={signupInfo.phoneNumber}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='email' className='text-xl'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email...'
                                value={signupInfo.email}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor='password' className='text-xl'>Password</label>
                            <input
                                onChange={handleChange}
                                type={isPasswordVisible ? 'text' : 'password'}
                                name='password'
                                placeholder='Enter your password...'
                                value={signupInfo.password}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className='absolute right-2 top-10 text-sm text-blue-500 hover:text-blue-700'
                            >
                                {isPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className='flex flex-col relative'>
                            <label htmlFor='confirmPassword' className='text-xl'>Confirm Password</label>
                            <input
                                onChange={handleChange}
                                type={isConfirmPasswordVisible ? 'text' : 'password'}
                                name='confirmPassword'
                                placeholder='Confirm your password...'
                                value={signupInfo.confirmPassword}
                                className='w-full text-xl p-2 border-none outline-none border-b border-black placeholder:italic placeholder:text-sm'
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                                className='absolute right-2 top-10 text-sm text-blue-500 hover:text-blue-700'
                            >
                                {isConfirmPasswordVisible ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <button type='submit' className='bg-red-500 text-white text-lg rounded p-2 cursor-pointer my-1'>
                            Signup
                        </button>
                        <span className='text-center text-gray-600 text-sm mt-4'>Already have an account? <Link to="/login" className='text-blue-500 hover:text-blue-700'>Sign in</Link></span>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Signup;
