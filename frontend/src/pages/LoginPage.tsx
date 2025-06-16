import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [, setLoading] = useState(false);
    const [ready, setReady] = useState(false);
    const { setToken } = useAuth();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        try {
            const data = await login({ email, password });
            localStorage.setItem('jwt', data.access_token);
            setToken(data.access_token);
            navigate('/', { replace: true });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => setReady(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    };

    return (
        <div className="page">
            <div className="login-form-container">
                <motion.div
                    className="login-header"
                    initial={{ top: '50%', transform: 'translateY(-50%)' }}
                    animate={{ top: 0, transform: 'translateY(-50%)', transition: { delay: 1, duration: 0.8 } }}
                    style={{ position: 'absolute', zIndex: 1000 }}
                >
                    <motion.h1
                        className="login-title"
                        layoutId="login-title"
                        initial={{ opacity: 0, transform: 'translateX(100%) translateY(75%)' }}
                        animate={{ opacity: 1, transform: 'translateX(0) translateY(75%)', transition: { delay: 0.2, duration: 0.8 } }}
                    >
                        Đăng nhập vào
                    </motion.h1>
                    <motion.img
                        src="/assets/logo.jpg"
                        alt="Logo"
                        className="login-logo"
                        initial={{ transform: 'translateX(-50%)' }}
                        animate={{ transform: 'translateX(0)', transition: {delay: 0.2, duration: 0.8, ease: 'easeInOut'} }}
                        onClick={() => window.location.pathname !== '/login' && window.history.back()}
                    />
                </motion.div>
                <div className={ready ? 'login-card' : 'login-card-before'}>
                    <br/>
                    <form onSubmit={handleEmailLogin} className="login-form">
                        <input type="email" name="email" placeholder="Email" className="login-input" required />
                        <input type="password" name="password" placeholder="Mật khẩu" className="login-input" required />
                        <button type="submit" className="login-button">Đăng nhập</button>
                    </form>
                    <div className="divider">Hoặc</div>
                    <button className="google-btn" onClick={handleGoogleLogin}>
                        <img
                            src="https://developers.google.com/identity/images/g-logo.png"
                            alt="Google logo"
                        />
                        Đăng nhập với Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;