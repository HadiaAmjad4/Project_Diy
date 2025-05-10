
// src/pages/CreateProject.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CreateProject.css';

function CreateProject() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    materials: '',
    steps: '',
    category: '',
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.project !== undefined;
  const projectId = location.state?.project?.id;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/projects/categories/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err.response?.data || err.message);
        setError('Failed to fetch categories.');
      }
    };

    fetchCategories();

    if (isEditMode) {
      setFormData({
        title: location.state.project.title || '',
        description: location.state.project.description || '',
        materials: location.state.project.materials || '',
        steps: location.state.project.steps || '',
        category: location.state.project.category || '',
      });
    }
  }, [isEditMode, location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    try {
      if (isEditMode) {
        await axios.put(`http://127.0.0.1:8000/api/projects/${projectId}/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post('http://127.0.0.1:8000/api/projects/', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      navigate('/projects');
    } catch (err) {
      console.error(`${isEditMode ? 'Update' : 'Create'} Project Error:`, err.response?.data || err.message);
      setError(`Failed to ${isEditMode ? 'update' : 'create'} project.`);
    }
  };

  return (
    <div className="centered-page">
      <div className="create-project-container">
        <h2 className="create-project-title">{isEditMode ? 'Edit Project' : 'Create New Project'}</h2>
        {error && <p className="create-project-error">{error}</p>}
        <form onSubmit={handleSubmit} className="create-project-form">
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-input"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <textarea
            name="materials"
            placeholder="Materials Needed"
            value={formData.materials}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <textarea
            name="steps"
            placeholder="Step-by-step Instructions"
            value={formData.steps}
            onChange={handleChange}
            required
            className="form-textarea"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-input"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button type="submit" className="submit-button">
            {isEditMode ? 'Update' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
