import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <nav className="sidebar-menu">
                <NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>Nhập kho</NavLink>
                <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Đơn hàng</NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;