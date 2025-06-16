import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';

const CallbackHandler: React.FC = () => {
    const navigate = useNavigate();
    const { setToken } = useAuth();
    const { setPhase } = useApp();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');

        if (token) {
            localStorage.setItem('jwt', token);
            setToken(token);
            setPhase('entered');
            const timer = setTimeout(() => {
                navigate('/', { replace: true });
            }, 10000);
            return () => clearTimeout(timer);
        } else {
            setPhase('initial');
            navigate('/login');
        }
    }, [navigate, setToken]);

    return <p>Logging you in...</p>;
};

export default CallbackHandler;