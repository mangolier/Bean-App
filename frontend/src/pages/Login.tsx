import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [, setLoading] = useState(false);
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
            navigate('/home', { replace: true });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google';
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <img
                    src="./assets/logo.jpg"
                    alt="Drink illustratio"
                    className="drink-image"
                />
                <h1 className="login-title">Đăng nhập vào</h1>
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
    );
};

export default Login;