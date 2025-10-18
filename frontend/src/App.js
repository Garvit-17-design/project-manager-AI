import React, { useState } from 'react';
import ProjectList from './components/ProjectList';
import KanbanBoard from './components/KanbanBoard';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={{ padding: '20px' }}>
      {!selectedProject ? (
        <ProjectList onSelectProject={setSelectedProject} />
      ) : (
        <div>
          <button onClick={() => setSelectedProject(null)}>Back to Projects</button>
          <h1>{selectedProject.name}</h1>
          <p>{selectedProject.description}</p>
          <KanbanBoard projectId={selectedProject._id} />
        </div>
      )}
    </div>
  );
}

export default App;
