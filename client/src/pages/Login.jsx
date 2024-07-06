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
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if (success) {
                localStorage.setItem('token', jwtToken);
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
        <div className='container'>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <h1>Sign in</h1>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label htmlFor='email'>Email</label>
                            <input
                                onChange={handleChange}
                                type='email'
                                name='email'
                                placeholder='Enter E-mail Address*'
                                value={loginInfo.email}
                            />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <input
                                onChange={handleChange}
                                type='password'
                                name='password'
                                placeholder='Enter your password...'
                                value={loginInfo.password}
                            />
                        </div>
                        <button type='submit'>Login</button>
                        <span>Create an account? <Link to="/signup">Signup</Link></span>
                    </form>
                </>
            )}
        </div>
    );
}

export default Login;
