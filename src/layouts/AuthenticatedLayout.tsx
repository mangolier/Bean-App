import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { motion, Variants  } from 'framer-motion';
import { useApp } from "../context/AppContext";
import { useAuth } from '../context/AuthContext';
import '../styles/AuthenticatedLayout.css';

const authenticatedVariants: Variants = {
    loading: { display: 'flex' },
    loaded: { display: 'flex' },
}

const AuthenticatedLayout: React.FC = () => {
    const { token, loading } = useAuth();
    const { phase } = useApp();

    if (loading) return <div>Loading...</div>;
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <motion.div className="authenticated-layout"
             variants={authenticatedVariants}
             animate={phase}
        >
            <div className="content-area">
                <Outlet />
            </div>
        </motion.div>
    );
};

export default AuthenticatedLayout;