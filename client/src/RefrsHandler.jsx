import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';

function RefrshHandler({ setIsAuthenticated }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const refreshAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');
                const storedRefreshToken = localStorage.getItem('refreshToken');
                if (storedToken && storedRefreshToken) {
                    const response = await axios.post('https://e-manager-api.vercel.app/auth/refresh-token', { refreshToken: storedRefreshToken });
                    if (response.data.accessToken) {
                        localStorage.setItem('token', response.data.accessToken);
                        setIsAuthenticated(true);
                        if (location.pathname === '/' ||
                            location.pathname === '/login' ||
                            location.pathname === '/signup'
                        ) {
                            navigate('/home', { replace: false });
                        }
                    }
                }
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        };
        refreshAuth();
    }, [location, navigate, setIsAuthenticated]);

    return (
        null
    )
}

export default RefrshHandler