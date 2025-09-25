import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Login() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const response = await fetch(`${backendUrl}/auth/login`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });

            const result = await response.json();
            const { success, message, jwtToken, name, isAdmin, error } = result;

            if (success) {
                handleSuccess(message);

                // Store token + user info
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('isAdmin', isAdmin); // new field

                // Redirect based on isAdmin
                setTimeout(() => {
                    if (isAdmin) {
                        navigate('/admin');
                    } else {
                        navigate('/homepage');
                    }
                }, 1000);

            } else if (error) {
                handleError(error?.details[0]?.message);
            } else {
                handleError(message);
            }
        } catch (err) {
            handleError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(to bottom right, #183B4E, #67ae6e)'
        }}>
            <div style={{
                width: '320px',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                backgroundColor: '#fff1d5',
                textAlign: 'left',
                color: '#183B4E'
            }}>
                <h1 style={{
                    fontSize: '26px',
                    marginBottom: '20px',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}>Login</h1>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '18px' }}>
                        <label htmlFor='email' style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            style={{
                                width: 'calc(100% - 20px)',
                                padding: '10px',
                                border: '1px solid #90c67c',
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                marginLeft: '10px',
                                marginRight: '10px',
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor='password' style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            style={{
                                width: 'calc(100% - 20px)',
                                padding: '10px',
                                border: '1px solid #90c67c',
                                borderRadius: '4px',
                                outline: 'none',
                                fontSize: '14px',
                                backgroundColor: '#fff',
                                marginLeft: '10px',
                                marginRight: '10px',
                            }}
                        />
                    </div>

                    <button type='submit' style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#328e6e',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        transition: 'background-color 0.3s'
                    }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#67ae6e'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#328e6e'}
                    >
                        Login
                    </button>

                    <div style={{ marginTop: '15px', fontSize: '13px', textAlign: 'center' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#183B4E', textDecoration: 'underline' }}>
                            Signup
                        </Link>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
