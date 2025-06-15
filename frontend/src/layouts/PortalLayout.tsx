import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import '../styles/PortalLayout.css';

const PortalLayout: React.FC = () => {
    return (
        <div className="portal-layout">
            <Sidebar />
            <div className="page-content">
                <Outlet />
            </div>
        </div>
    );
};

export default PortalLayout;