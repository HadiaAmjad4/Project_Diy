// src/layout/AppLayout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/TopBar'; 
import './AppLayout.css'; 

function AppLayout() {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/register', '/']; 

  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      {showNavbar && <Navbar />}
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
