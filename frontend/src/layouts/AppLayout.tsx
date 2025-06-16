import React, { useEffect } from 'react';
import { motion, Variants  } from 'framer-motion';
import { Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext'
import LoginForm from '../components/LoginForm';
import '../styles/AppLayout.css';

const logoVariants: Variants = {
    initial: { width: '12rem', x: '-50%' },
    waiting: { transform: 'translateX(0)', transition: { delay: 0.2, duration: 0.8 } },
    entered: { width: '12rem', x: '-50%', transition: { delay: 0.9, duration: 0.1 } },
    exiting: { width: '2.4rem', transition: { delay: 1, duration: 0.8 } },
}

const containerVariants: Variants = {
    initial: { },
    waiting: { },
    entered: { maxWidth: '100%', transition: { delay: 0.9, duration: 0.1 } },
    exiting: { maxWidth: '100%' }
}

const titleVariants: Variants = {
    initial: { opacity: 0, x: '100%' },
    waiting: { opacity: 1, x: 0, transition: { delay: 0.2, duration: 0.8 } },
    entered: { opacity: 0, x: '100%', transition: { delay: 0.9, duration: 0.1 } },
    exiting: { display: 'none' },
}

const AppLayout: React.FC = () => {
    const { pathname } = useLocation();
    const { phase, setPhase, reset } = useApp()

    useEffect(() => {
        if (pathname === '/login') {
            reset()
            setPhase('waiting')
        } else {
            setPhase('exiting')
        }
    }, [pathname, setPhase, reset])

    return (
        <div className="app-layout">
            <motion.div
                className="app-container"
                variants={containerVariants}
                animate={phase}
            >
                <motion.div
                    className="logo-container"
                    animate={{ top: 0, transition: { delay: 1, duration: 0.8, ease: "easeInOut" } }}
                    style={{ position: 'absolute', zIndex: 1000 }}
                >
                    <motion.h1
                        className="login-title"
                        layoutId="login-title"
                        variants={titleVariants}
                        initial="initial"
                        animate={phase}
                    >
                        Đăng nhập vào
                    </motion.h1>
                    <motion.img
                        src="/assets/logo.jpg"
                        alt="Logo"
                        className="logo"
                        layoutId="site-logo"
                        variants={logoVariants}
                        initial="initial"
                        animate={phase}
                        onClick={() => window.location.pathname !== '/login' && window.history.back()}
                    />
                </motion.div>
                <LoginForm />
                <Outlet />
            </motion.div>
        </div>
    );
};

export default AppLayout;