import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-divider"/>
            <nav className="sidebar-menu">
                <ul>
                    <li>
                        <NavLink to="/inventory" className={({ isActive }) => isActive ? 'active' : ''}>Nhập kho</NavLink>
                    </li>
                    <li>
                        <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Đơn hàng</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;