import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/TabBar.css';
const TabBar: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    return (
        <div className="tab-bar top">
            <div className="tab-left">
                <img src="/assets/logo.jpg" alt="Logo" onClick={() => navigate('/home')} className="logo-after" />
            </div>
            <div className="tab-right">
                <span className="user-info">{user?.name || 'User'} ({user?.email || '---'})</span>
                <button onClick={logout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default TabBar;