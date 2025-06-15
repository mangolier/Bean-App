import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import RequireRole from './components/RequireRole';

import AppLayout from './layouts/AppLayout';
import PortalLayout from "./layouts/PortalLayout";

import InventoryPage from './pages/InventoryPage';
import CallbackHandler from './pages/CallbackHandler';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OrderPage from "./pages/OrderPage";
import RootRedirect from './pages/RootRedirect';


const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth2/redirect" element={<CallbackHandler />} />
            <Route path="/error" element={<ErrorPage />} />

            <Route element={<AppLayout />}>
                <Route path="/" element={<RootRedirect />} />
                <Route element={<RequireRole role="ADMIN" redirectTo="/home" />}>
                    <Route element={<PortalLayout />}>
                        <Route index element={<Navigate to="/inventory" replace />} />
                        <Route path="inventory" element={<InventoryPage />} />
                        <Route path="orders" element={<OrderPage />} />
                    </Route>
                </Route>
                <Route element={<RequireRole role="USER" redirectTo="/inventory" />}>
                    <Route path="home" element={<HomePage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default App;