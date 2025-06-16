import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import '../styles/TabBar.css';
const TabBar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="tab-bar top">
            <div className="tab-left">
                <motion.img
                    src="/assets/logo.jpg"
                    alt="Logo"
                    layoutId="site-logo"
                    initial={false}
                    animate={{
                        width: '2.6rem',
                        top: 0,
                        left: '5rem',
                        rotate: [0, 360],
                        transition: {duration: 1, ease: 'easeInOut'},
                    }}
                    style={{ position: 'absolute', zIndex: 1000, cursor: 'pointer' }}
                    onClick={() => window.location.pathname !== '/login' && window.history.back()}
                />
            </div>
            <div className="tab-right">
                <span className="user-info">{user?.name || 'User'} ({user?.email || '---'})</span>
                <button onClick={logout} className="logout-btn">Logout</button>
            </div>
        </div>
    );
};

export default TabBar;