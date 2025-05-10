// src/pages/UserProfile.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserProfile.css';


function UserProfile() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    bio: '',
    profile_picture: ''
  });
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
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
        setBio(response.data.bio || '');
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token missing!');
      return;
    }

    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await axios.put('http://127.0.0.1:8000/api/users/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Profile updated successfully!');
      setUserData(response.data);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token missing!');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete your profile? This action is permanent.');
    if (!confirmed) return;

    try {
      await axios.delete('http://127.0.0.1:8000/api/users/profile/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Your profile has been deleted.');
      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (err) {
      console.error('Error deleting profile:', err);
    }
  };

  return (
    <div className="user-profile-page">
     
      <div className="user-profile-container">
        <h2>My Profile</h2>

        {/* Profile Picture Section */}
        <div className="profile-picture-section">
          <img
            src={
              userData.profile_picture
                ? `http://127.0.0.1:8000${userData.profile_picture}` // Use user picture if available
                : '/default-profile.jpg' // Default profile picture if none exists
            }
            alt="Profile"
            className="profile-picture"
          />
          {bio && <p className="profile-bio-caption">{bio}</p>}
        </div>

        {/* Profile Update Form */}
        <form onSubmit={handleSubmit} className="user-profile-form">
          <div>
            <label>Username:</label>
            <input type="text" value={userData.username} disabled />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={userData.email} disabled />
          </div>
          <div>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div>
            <label htmlFor="profile-picture">
              Choose Profile Picture
            </label>
            <input
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setProfilePicture(e.target.files[0]);
                }
              }}
            />
          </div>
          <button type="submit">Update Profile</button>
        </form>

        {/* Delete Profile Button */}
        <p className="delete-profile-text" onClick={handleDelete}>
          Delete Profile
        </p>
      </div>
    </div>
  );
}

export default UserProfile;
