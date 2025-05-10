// src/pages/ViewAll.js

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import './ViewAll.css';

function ViewAll() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjectDetails();
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setProject(response.data);
      document.title = `${response.data.title} | DIY Project Hub`;
    } catch (err) {
      console.error('Error fetching project details:', err);
      setError('Could not load project details.');
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      await axios.post(
        `http://127.0.0.1:8000/api/projects/${id}/rate/`,
        { score: rating },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Thanks for rating!');
    } catch (err) {
      console.error('Rating error:', err);
      if (err.response?.data?.detail) {
        setMessage(err.response.data.detail);
      } else {
        setMessage('An error occurred while submitting your rating.');
      }
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!project) return <p className="loading">Loading project...</p>;

  return (
    <div className="project-detail-container">
      <h1 className="page-title">{project.title}</h1>
      <p className="center-text"><strong style={{ color: '#6d28d9' }} >By:</strong> {project.owner_username || 'Unknown'}</p>

      {/* 👇 Category display */}
      {project.category_name && (
        <p className="center-text"><strong  style={{ color: '#6d28d9' }} >Category:</strong> {project.category_name}</p>
      )}

      <p className="date"> {new Date(project.created_at).toLocaleDateString()}</p>

      <section>
        <h3>Description</h3>
        <p>{project.description}</p>
      </section>

      <section>
        <h3>Materials Required</h3>
        <p>{project.materials}</p>
      </section>

      <section>
        <h3>Steps</h3>
          <ol>
          {project.steps
             .split('\n')
             .map(step => step.trim())
             .filter(step => step.length > 0) 
             .map((step, index) => {
              const cleanedStep = step.replace(/^\d+\.\s*/, '');
              return <li key={index}>{cleanedStep}</li>;
           })}
           </ol>
     </section>

      <div className="rating-section">
        <h3>Rate this project</h3>
        <div className="star-container">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <label key={starValue}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  className="star"
                  color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={28}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <button className="submit-rating-btn" onClick={handleRatingSubmit}>
          Submit Rating
        </button>
        {message && <p className="rating-message">{message}</p>}
      </div>

      {/* 👇 Discussion Link */}
      <div className="discussion-link-wrapper">
        <Link to={`/projects/${id}/discussion`} className="discussion-link">
          💬 Join the Discussion
        </Link>
      </div>
    </div>
  );
}

export default ViewAll;
