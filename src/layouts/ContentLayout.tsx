import React from 'react';
import { Outlet } from 'react-router-dom';
import TabBar from "../components/TabBar";
import '../styles/PortalLayout.css';

interface Props { title: string; }
const ContentLayout: React.FC<Props> = ({ title }) => {
    return (
        <div className="content-layout">
            <TabBar title={title} />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default ContentLayout;