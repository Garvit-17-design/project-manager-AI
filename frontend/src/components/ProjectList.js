import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/project';

const ProjectList = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;

  if (projects.length === 0) return <p>No projects found.</p>;

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li
            key={project._id}
            style={{ cursor: 'pointer', marginBottom: '8px' }}
            onClick={() => onSelectProject(project)}
          >
            <strong>{project.name}</strong><br />
            <small>{project.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
