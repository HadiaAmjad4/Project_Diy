// src/pages/Home.js

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  useEffect(() => {
    document.title = 'Home | DIY Project Hub';
  }, []);

  return (
    <div className="home-container">
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="hero-section">
        <h1 className="hero-title">Welcome to DIY Hub</h1>
        <p className="hero-subtitle">
          Your go-to platform for sharing and exploring DIY projects!
        </p>
        <div className="cta-buttons">
          <Link to="/register" className="cta-btn">
            Register
          </Link>
          <Link to="/login" className="cta-btn">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

