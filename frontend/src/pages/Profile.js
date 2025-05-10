//src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import api from '../api';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get('users/profile/')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the user profile!", error);
      });
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile">
      <h1>{user.username}'s Profile</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio || 'No bio available'}</p>
      <p>Profile Picture:</p>
      {user.profile_picture ? (
        <img src={user.profile_picture} alt="Profile" />
      ) : (
        <p>No profile picture uploaded</p>
      )}
    </div>
  );
};

export default Profile;
