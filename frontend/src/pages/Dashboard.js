// src/pages/Dashboard.js

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import TopBar from '../components/TopBar';


function Dashboard() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('currentUser');
  let user = null;

  try {
    user = JSON.parse(userString);
  } catch (e) {
    console.error('Failed to parse user data:', e);
  }

  useEffect(() => {
    document.title = 'Dashboard | DIY Project Hub';
    if (!user) navigate('/login');
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-page-wrapper">
    <TopBar />
      <div className="dashboard-container">
        <div className="logout-link" onClick={handleLogout}>Logout</div>
        <h1 className="dashboard-title">Ignite Your Imagination</h1>
        <p className="dashboard-subtitle">Start exploring or share your next DIY masterpiece!</p>

        <div className="dashboard-links">
          <Link to="/explore" className="dashboard-link"> Explore Projects</Link>
          <Link to="/create-project" className="dashboard-link"> Upload New Project</Link>
          <Link to="/projects" className="dashboard-link"> My Projects</Link>
          <Link to="/profile" className="dashboard-link">My Profile</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
