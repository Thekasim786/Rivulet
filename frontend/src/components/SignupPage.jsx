import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }
    try {
      const response = await fetch(`http://localhost:5500/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupInfo),
      });
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #183B4E, #67ae6e)',
      }}
    >
      <div
        style={{
          width: '320px',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#fff1d5',
          color: '#183B4E',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            marginBottom: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Signup
        </h1>
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor='name'
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px', // Added margin bottom for space between label and input
              }}
            >
              Name
            </label>
            <input
              onChange={handleChange}
              type='text'
              name='name'
              placeholder='Enter your name...'
              value={signupInfo.name}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #328e6e',
                borderRadius: '5px',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box', // Ensures padding does not overflow the input field width
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label
              htmlFor='email'
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px', // Added margin bottom for space between label and input
              }}
            >
              Email
            </label>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='Enter your email...'
              value={signupInfo.email}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #328e6e',
                borderRadius: '5px',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box', // Ensures padding does not overflow the input field width
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor='password'
              style={{
                display: 'block',
                fontSize: '14px',
                marginBottom: '8px', // Added margin bottom for space between label and input
              }}
            >
              Password
            </label>
            <input
              onChange={handleChange}
              type='password'
              name='password'
              placeholder='Enter your password...'
              value={signupInfo.password}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #328e6e',
                borderRadius: '5px',
                outline: 'none',
                fontSize: '14px',
                boxSizing: 'border-box', // Ensures padding does not overflow the input field width
              }}
            />
          </div>
          <button
            type='submit'
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#328e6e',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#183B4E')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#328e6e')}
          >
            Signup
          </button>
          <div style={{ marginTop: '15px', fontSize: '13px', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link
              to='/login'
              style={{
                color: '#328e6e',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Login
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;
