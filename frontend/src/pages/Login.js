// src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = { username, password };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/token/obtain/', credentials);
      console.log('Login successful', response.data);

      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      if (response.data.user) {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
      } else {
        localStorage.setItem('currentUser', JSON.stringify({ username }));
      }

      navigate('/dashboard');
    } catch (error) {
      if (error.response) {
        
        if (error.response.status === 401) {
          const errorData = error.response.data;

    
          if (errorData.detail && errorData.detail === 'No active account found with the given credentials') {
            setErrorMessage("User doesn't exist");
          } else if (errorData.detail && errorData.detail === 'No matching credentials') {
            setErrorMessage("Password is incorrect");
          } else {
            setErrorMessage("Something went wrong. Please try again.");
          }
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        console.error('Login failed', error.response.data);
      } else {
        setErrorMessage('Login error. Please try again.');
        console.error('Login error', error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

      
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="register-link">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default Login;