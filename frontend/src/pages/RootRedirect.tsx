import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RootRedirect: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" replace />;
    return user.role === 'ADMIN' ? <Navigate to="/inventory" replace /> : <Navigate to="/home" replace />;
};

export default RootRedirect;