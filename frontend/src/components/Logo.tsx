import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Logo: React.FC = () => {
    const { pathname } = useLocation();
    const controls = useAnimation();

    useEffect(() => {
        if (pathname === '/login') {
            controls.start({
                width: '13rem',
                top: '10rem',
                left: '50%',
                transition: {duration: 1, ease: 'easeInOut'},
            }).then(() => {
                controls.stop()
            });
        } else {
            controls
                .start({
                    width: '2.6rem',
                    top: 0,
                    left: '5rem',
                    transition: {duration: 1, ease: 'easeInOut'},
                })
                .then(() => {
                    controls.stop()
                });
        }
    }, [pathname, controls]);

    const initialProps = pathname === '/login'
        ? {
            width: '2.6rem',
            top: 0,
            left: '5rem',
        }
        : {
            width: '13rem',
            top: '10rem',
            left: '50%',
        };


    return (
        <motion.img
            src="/assets/logo.jpg"
            alt="Logo"
            layoutId="site-logo"
            initial={initialProps}
            animate={controls}
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