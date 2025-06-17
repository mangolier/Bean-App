import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CallbackHandler: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setToken } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('jwt', token);
            setToken(token);
            navigate('/');
        } else {
            navigate('/login');
        }
    }, [navigate, searchParams, setToken]);

    return <p>Logging you in...</p>;
};

export default CallbackHandler;