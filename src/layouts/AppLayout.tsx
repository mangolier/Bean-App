import React from 'react'
import { motion, Variants  } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import '../styles/AppLayout.css'

/*const containerVariants: Variants = {
    initial: { },
    waiting: { },
    entering: { maxWidth: '100%', height: '100%', transition: { duration: 1.6, ease: "easeInOut" } },
    entered: { maxWidth: '100%', height: '100%' },
    loading: { maxWidth: '100%', height: '100%' },
    loaded: { maxWidth: '100%', height: '100%' }
}*/

const logoVariants: Variants = {
    initial: { x: '-50%', transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } },
    waiting: { x: 0, transition: { delay: 0.2, duration: 0.8, ease: "easeInOut" } },
    entering: { x: '-50%', transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } },
    entered: { x: '-50%', transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } },
    loading: { x: '-50%', transition: { delay: 0.8, duration: 0.8, ease: "easeInOut" } },
    loaded: { }
}

/*const logoContainerVariants: Variants = {
    initial: { x: '-50%', y: '-50%', maxWidth: '20rem', width: '100%', rotate: -360, transition: { duration: 0.8, ease: "easeInOut" } },
    waiting: { x: '-50%', y: '-180%', maxWidth: '20rem', width: '100%', transition: { delay: 1, duration: 0.8, ease: "easeInOut" } },
    entering: { x: '-50%', y: '-50%', maxWidth: '20rem', width: '100%', transition: { duration: 0.8, ease: "easeInOut" } },
    entered: { top: 0, left: '0.8rem', x: 0, y: 0, maxWidth: '20rem', width: '100%', scale: 0.5, rotate: -360, transition: { duration: 0.8, ease: "easeInOut" } },
    loading: { top: 0, left: '0.8rem', x: 0, y: 0, maxWidth: '20rem', width: '100%', scale: 0.5, rotate: -360, transition: { duration: 0.8, ease: "easeInOut" } },
    loaded: { top: 0, left: '0.8rem', x: 0, y: 0, maxWidth: '20rem', width: '100%', scale: 0.5, rotate: -360 }
}*/

const AppLayout: React.FC = () => {
    const { phase, getInitial, /*setPhase*/ } = useApp()

    return (
        <div className="app-layout">
            <motion.div
                className="app-container"
               /* variants={containerVariants}
                initial={getInitial()}
                animate={phase}
                onAnimationComplete={(v) => {
                    if (v === 'entering') setPhase('entered');
                    else if (v === 'entered') setPhase('loading');
                    else if (v === 'loading') setPhase('loaded');
                }}*/
            >
                <motion.img
                    src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
                    alt="Logo"
                    className="logo"
                    variants={logoVariants}
                    initial={getInitial()}
                    animate={phase}
                    onClick={() => window.location.pathname !== '/login' && window.history.back()}
                />
                <Outlet />
            </motion.div>
        </div>
    );
};

export default AppLayout;