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
        window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorize/google`
    };

    useEffect(() => {
        if (phase === 'initial') {
            setPhase('waiting')
        }
    }, [phase, setPhase])

    return (
        <motion.div
            className='login-card'
            /*variants={{
                initial: {transform: 'rotateX(180deg)', background: 'transparent'},
                waiting: {transform: 'rotateX(0deg)', background: '#CFBB65', transition: {delay: 1, duration: 1}}
            }}
            initial="initial"
            animate={phase}*/
        >
            <form onSubmit={handleEmailLogin} className='login-form'>
                <input type='username' name='username' placeholder='Tài khoản của bạn' className='login-input' required/>
                <input type='password' name='password' placeholder='Mật khẩu' className='login-input' required/>
                <button type='submit' className='btn-primary'>Đăng nhập</button>
                <button className='btn-google' onClick={handleGoogleLogin}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/google.png`}
                        alt='Google logo'
                    />
                    <span>Đăng nhập bằng Google</span>
                </button>
            </form>
            <p className="forgot-password">
                <a href="#">Quên mật khẩu?</a>
            </p>
            <div className="footer-text">
                <p>
                    Chào mừng bạn đến với thế giới cá viên chiên và trà tắc!
                </p>
            </div>
        </motion.div>
    );
};

export default LoginPage;