
// src/pages/ExploreProjects.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import './ProjectList.css';

function ExploreProjects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Explore Projects | DIY Project Hub';
    fetchProjects();
    fetchCategories(); 
  }, []);

  const fetchProjects = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/api/projects/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const allProjects = response.data;
      setProjects(allProjects);
      setFilteredProjects(allProjects);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    }
  };

  const fetchCategories = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/api/categories/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const allCategories = response.data.map((c) => c.name).filter(Boolean);
      setCategories(['All', ...allCategories]);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((p) => p.category_name === category);
      setFilteredProjects(filtered);
    }
  };

  const handleProjectClick = (id) => {
    navigate(`/view-all/${id}`);
  };

  const chunkSize = 3;
  const visibleCategories = categories.slice(
    currentCategoryIndex,
    currentCategoryIndex + chunkSize
  );

  const showPrevious = () => {
    setCurrentCategoryIndex((prev) => Math.max(0, prev - chunkSize));
  };

  const showNext = () => {
    if (currentCategoryIndex + chunkSize < categories.length) {
      setCurrentCategoryIndex((prev) => prev + chunkSize);
    }
  };

  return (
    <div className="project-list-container">
      <h1 className="page-title">🌍 Explore DIY Projects</h1>

      {/* Category Navigation */}
      <div className="category-nav">
        <span
          className="nav-arrow-text"
          onClick={showPrevious}
          style={{ visibility: currentCategoryIndex === 0 ? 'hidden' : 'visible' }}
        >
          &#8592;
        </span>

        <div className="category-list">
          {visibleCategories.map((cat) => (
            <span
              key={cat}
              className={`category-item ${
                selectedCategory === cat ? 'active-category' : ''
              }`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </span>
          ))}
        </div>

        <span
          className="nav-arrow-text"
          onClick={showNext}
          style={{
            visibility:
              currentCategoryIndex + chunkSize >= categories.length
                ? 'hidden'
                : 'visible',
          }}
        >
          &#8594;
        </span>
      </div>

      {error && <p className="error">{error}</p>}

      {filteredProjects.length === 0 ? (
        <p className="no-projects">Couldn't find any project in this category.</p>
      ) : (
        <ul className="project-list">
          {filteredProjects.map((project) => {
            const avg = project.average_rating;
            const rounded = Math.round(avg || 0);

            return (
              <li
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project.id)}
                style={{ cursor: 'pointer' }}
              >
                <h3 className="project-title">{project.title}</h3>
                <p className="project-owner">
                  <strong>By:</strong> {project.owner_username || 'Unknown'}
                </p>
                {project.category_name && (
                  <p className="project-category">
                    <strong>Category:</strong> {project.category_name}
                  </p>
                )}
                <p className="project-description">{project.description}</p>
                <p className="project-date">
                  <em>
                    Created: {new Date(project.created_at).toLocaleDateString()}
                  </em>
                </p>

                <div className="average-rating">
                  {avg > 0 ? (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          color={i < rounded ? '#ffc107' : '#e4e5e9'}
                          size={18}
                        />
                      ))}
                      <span className="avg-score">({avg.toFixed(1)})</span>
                    </>
                  ) : (
                    <span className="no-rating">No ratings yet</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ExploreProjects;
