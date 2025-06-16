import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TabBar from '../components/TabBar';
import '../styles/AuthenticatedLayout.css';

const AuthenticatedLayout: React.FC = () => {
    const { token, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!token) return <Navigate to="/login" replace />;

    return (
        <div className="authenticated-layout">
            <TabBar />
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthenticatedLayout;