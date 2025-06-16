import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import TabBar from '../components/TabBar';
import '../styles/AuthenticatedLayout.css';

const AuthenticatedLayout: React.FC = () => {
    const { token, loading } = useAuth();
    const { setPhase } = useApp();

    if (loading) return <div>Loading...</div>;
    if (!token) {
        setPhase('initial')
        return <Navigate to="/login" replace />;
    }
    else {
        setPhase('entered');
    }

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