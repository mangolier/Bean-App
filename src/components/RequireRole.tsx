import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
    role: 'ADMIN' | 'USER';
    redirectTo: string;
}

const RequireRole: React.FC<Props> = ({ role, redirectTo }) => {
    const { user, loading, token } = useAuth();

    if (loading || (token && !user)) return null;
    if (!user) return <Navigate to="/login" replace />;
    if (user.role !== role) return <Navigate to={redirectTo} replace />;
    return <Outlet />;
};

export default RequireRole;