import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import RequireRole from './components/RequireRole';

import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import ContentLayout from './layouts/ContentLayout';
import PortalLayout from "./layouts/PortalLayout";

import InventoryPage from './pages/InventoryPage';
import CallbackHandler from './pages/CallbackHandler';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import AppLayout from './layouts/AppLayout';
import OrderPage from "./pages/OrderPage";
import RootRedirect from './pages/RootRedirect';
import LoginPage from "./pages/LoginPage";


const App: React.FC = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/oauth2/redirect" element={<CallbackHandler />} />
                <Route element={<AppLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/error" element={<ErrorPage />} />

                    <Route element={<AuthenticatedLayout />}>
                        <Route path="/" element={<RootRedirect />} />
                        <Route element={<RequireRole role="ADMIN" redirectTo="/home" />}>
                            <Route element={<PortalLayout />}>
                                <Route index element={<Navigate to="/inventory" replace />} />
                                <Route element={<ContentLayout title="Nhập kho" />}>
                                    <Route path="inventory" element={<InventoryPage />} />
                                </Route>
                                <Route element={<ContentLayout title="Đơn hàng" />}>
                                    <Route path="orders" element={<OrderPage />} />
                                </Route>
                            </Route>
                        </Route>
                        <Route element={<RequireRole role="USER" redirectTo="/inventory" />}>
                            <Route element={<ContentLayout title="Trang chủ" />}>
                                <Route path="home" element={<HomePage />} />
                            </Route>
                        </Route>
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

export default App;