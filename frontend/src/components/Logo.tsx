import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Logo: React.FC = () => {
    const { pathname } = useLocation();

    const variants: Record<string, { width: string | number; top: string | number; left: string | number; x: string | number; y: string | number }> = {
        '/login': {
            width: '13rem',
            top: '50%',
            left: '50%',
            x: '0rem',
            y: '-19.75rem',
        },
        '/': {
            width: '2.6rem',
            top: 0,
            left: 0,
            x: 0,
            y: 0,
        }
    };

    return (
        <motion.img
            src="/assets/logo.jpg"
            alt="Logo"
            layoutId="site-logo"
            initial={{
                width: '13rem',
                top: '50%',
                left: '50%',
                x: '0rem',
                y: '-19.75rem',
            }}
            animate={variants[pathname] || variants['/']}
            transition={{ type: 'spring', stiffness: 200, damping: 40 }}
            style={{
                position: 'absolute',
                zIndex: 1000,
                cursor: 'pointer',
            }}
            onClick={() => window.location.pathname !== '/login' && window.history.back()}
        />
    );
}

export default Logo;