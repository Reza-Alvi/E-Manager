import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            alert('Name, email, and password are required');
            return;
        }
        setIsLoading(true);
        try {
            const url = "http://localhost:8080/auth/signup";
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
        <div className='container'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSignup}>
                        <div>
                            <label htmlFor='name'>Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='name'
                                autoFocus
                                placeholder='Enter your name...'
                                value={signupInfo.name}
                            />
                        </div>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter your email...'
                                value={signupInfo.email}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={signupInfo.password}
                            />
                        </div>
                        <button type='submit'>Signup</button>
                        <span>Already have an account? <Link to="/login">Sign in</Link></span>
                    </form>
                </>
            )}
        </div>
    );
}

export default Signup;
