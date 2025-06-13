import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ErrorPage.css';

const ErrorPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="error-container">
            <h1 className="error-title">Đã xảy ra lỗi hệ thống</h1>
            <p className="error-description">Vui lòng thử lại sau hoặc liên hệ bộ phận hỗ trợ.</p>
            <button className="error-button" onClick={() => navigate('/login')}>
                Quay lại đăng nhập
            </button>
        </div>
    );
};

export default ErrorPage;