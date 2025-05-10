// src/components/TopBar.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './TopBar.css';

function TopBar() {
  const [userData, setUserData] = useState({
    username: '',
    bio: '',
    profile_picture: '',
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Access token missing!');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

 
  const handleProfileClick = () => {
    document.querySelector('.profile-img').classList.add('profile-clicked');
    setTimeout(() => {
      navigate('/dashboard'); 
    }, 1000);
  };

  return (
    <div className="topbar-container">
      <div className="topbar-left">
        <img
          src={
            userData.profile_picture
              ? `http://127.0.0.1:8000${userData.profile_picture}` 
              : '/default-profile.jpg' 
          }
          alt="Profile"
          className="profile-img"
          onClick={handleProfileClick}
        />
        <div className="user-info">
          <span className="username">{userData.username}</span>
          {userData.bio && (
            <span className="bio">
              <strong><em><u>{userData.bio}</u></em></strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;
