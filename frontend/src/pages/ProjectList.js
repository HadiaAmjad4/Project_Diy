// src/pages/ProjectList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectList.css';
import { useNavigate } from 'react-router-dom';

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/my-projects/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleDelete = async (projectId) => {
    const confirm = window.confirm('Are you sure you want to delete this project?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/projects/${projectId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projects.filter((project) => project.id !== projectId));
    } catch (err) {
      console.error('Failed to delete project:', err);
      setError('Failed to delete project');
    }
  };

  const handleEdit = (project) => {
    navigate('/create-project', { state: { project } });
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  return (
    <div className="project-list-container">
      <div className="top-bar">
        <button
          className="create-project-link"
          onClick={() => {
            const token = localStorage.getItem('accessToken');
            if (token) {
              navigate('/create-project');
            } else {
              alert('Please log in to create a project.');
              navigate('/login');
            }
          }}
        >
          Create Project
        </button>
        <span className="logout-text" onClick={handleLogout}>
          Logout
        </span>
      </div>

      <h2 className="page-title">My Projects</h2>

      {error && <p className="error">{error}</p>}

      {projects.length === 0 ? (
        <p className="no-projects">No projects found.</p>
      ) : (
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-card">
              <h3>{project.title}</h3>

              {/* Display Category */}
              {project.category && (
                <p><strong>Category:</strong> {project.category_name}</p>
              )}

              <p><strong>Description:</strong> {project.description}</p>
              <p><strong>Materials:</strong> {project.materials}</p>

              <div style={{ textAlign: 'center' }}>
                <p><strong>Steps:</strong></p>
                <ol style={{ display: 'inline-block', textAlign: 'left', paddingLeft: '1rem' }}>
                  {project.steps
                    .split(/\d+\.\s*/)
                    .filter((step) => step.trim() !== '')
                    .map((step, index) => (
                      <li key={index}>{step.trim()}</li>
                    ))}
                </ol>
              </div>

              <p>
                <em>Created at:</em>{' '}
                {project.created_at ? new Date(project.created_at).toLocaleString() : 'Not available'}
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '10px' }}>
                <p
                  onClick={() => handleEdit(project)}
                  style={{
                    cursor: 'pointer',
                    color: '#555',
                    textDecoration: 'underline',
                  }}
                >
                  Edit
                </p>
                <p
                  onClick={() => handleDelete(project.id)}
                  style={{
                    cursor: 'pointer',
                    color: '#555',
                    textDecoration: 'underline',
                  }}
                >
                  Delete
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProjectList;
