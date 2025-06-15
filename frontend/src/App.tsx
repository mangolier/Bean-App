import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import AppLayout from './layouts/AppLayout';
import CallbackHandler from './pages/CallbackHandler';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PortalLayout from "./layouts/PortalLayout";
import OrderPage from "./pages/OrderPage";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/oauth2/redirect" element={<CallbackHandler />} />
            <Route path="/error" element={<ErrorPage />} />

            <Route element={<AppLayout />}>
                <Route element={<PortalLayout />}>
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/orders" element={<OrderPage />} />
                </Route>
                <Route path="/home" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
        </Routes>
    );
};

export default App;