import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TabBar from '../components/TabBar';
import '../styles/AppLayout.css';

const AppLayout: React.FC = () => {
    const { token, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="app-layout">
            <TabBar />
            <img
                src='/assets/logo.jpg'
                alt='Logo'
                className="logo-after"
            />
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;