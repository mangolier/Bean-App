import React from 'react'
import { useAuth } from '../context/AuthContext'
import '../styles/TabBar.css'

interface Props { title: string; }
const TabBar: React.FC<Props> = ({ title }) => {
    const { user, logout } = useAuth()

    return (
        <div className='tab-bar top'>
            <div className='tab-left'>{title}</div>
            <div className='tab-right'>
                <span className='user-info'>
                    {user?.name || 'User'} ({user?.email || '---'})
                </span>
                <button onClick={logout} className='logout-btn'>Logout</button>
            </div>
        </div>
    );
};

export default TabBar;