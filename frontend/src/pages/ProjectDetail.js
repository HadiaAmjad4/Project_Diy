// Handles Deatil of project title,description,material required, steps
// src/pages/ProjectDetail.js


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/projects/${id}/`);
        setProject(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <p>Loading project details...</p>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
      <p>{project.description}</p>
      <h3>Materials:</h3>
      <ul>
        {project.materials.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>
      <h3>Steps:</h3>
      <ol>
        {project.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default ProjectDetail;
