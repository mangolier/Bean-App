import React, { useEffect } from 'react'
import { motion, } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
import { useApp } from '../context/AppContext'
import { useAuth } from '../context/AuthContext'
import '../styles/LoginPage.css'

const LoginPage: React.FC = () => {
    const navigate = useNavigate()
    const {setToken} = useAuth()
    const { phase, setPhase } = useApp()

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const username = (form.elements.namedItem('username') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value
        try {
            const data = await login({username, password})
            localStorage.setItem('jwt', data.accessToken)
            setToken(data.accessToken)
            setPhase('entering')
            navigate('/', {replace: true})
        } catch (err) {
            console.error('Login failed:', err)
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorize/google'
    };

    useEffect(() => {
        if (phase === 'initial') {
            setPhase('waiting')
        }
    }, [phase, setPhase])

    return (
        <motion.div
            className='login-card'
            variants={{
                initial: {transform: 'rotateX(180deg)', background: 'transparent'},
                waiting: {transform: 'rotateX(0deg)', background: '#CFBB65', transition: {delay: 1, duration: 1}}
            }}
            initial="initial"
            animate={phase}
        >
            <br/>
            <form onSubmit={handleEmailLogin} className='login-form'>
                <input type='username' name='username' placeholder='Username' className='login-input' required/>
                <input type='password' name='password' placeholder='Mật khẩu' className='login-input' required/>
                <button type='submit' className='login-button'>Đăng nhập</button>
            </form>
            <div className='divider'>Hoặc</div>
            <button className='google-btn' onClick={handleGoogleLogin}>
                <img
                    src='https://developers.google.com/identity/images/g-logo.png'
                    alt='Google logo'
                />
                Đăng nhập với Google
            </button>
        </motion.div>
    );
};

export default LoginPage;