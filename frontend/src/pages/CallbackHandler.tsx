import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CallbackHandler: React.FC = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('jwt', token);
            setToken(token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [navigate, setToken]);

    return <p>Logging you in...</p>;
};

export default CallbackHandler;