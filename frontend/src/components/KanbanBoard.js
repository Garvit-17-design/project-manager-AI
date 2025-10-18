import React, { useEffect, useState } from 'react';
import { fetchTasksByProject } from '../api/tasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const columns = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
};

const KanbanBoard = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from backend
  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchTasksByProject(projectId);
      setTasks(data);
      setLoading(false);
    };
    loadTasks();
  }, [projectId]);

  // Group tasks by status
const getTasksByColumn = (status) => {
  return tasks.filter((task) => task.status === status);
};


  // Handle drag event
  const handleDragEnd = async (result) => {
  const { source, destination, draggableId } = result;

  // Step 1: Check if destination exists
  if (!destination) {
    console.log("No destination — drag cancelled");
    return;
  }

  // Step 2: If no column change, return
  if (source.droppableId === destination.droppableId) {
    console.log("Same column — no update needed");
    return;
  }

  const draggedTaskId = draggableId;
  const newStatus = destination.droppableId;

  // Step 3: Update local state
  const updatedTasks = tasks.map((task) =>
    task._id === draggedTaskId ? { ...task, status: newStatus } : task
  );
  setTasks(updatedTasks);

  // Step 4: Update backend
  try {
    const response = await fetch(`http://localhost:5000/api/tasks/${draggedTaskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    const result = await response.json();
    console.log('Backend updated:', result);
  } catch (error) {
    console.error('Error updating task status:', error);
  }
};


  if (loading) return <p>Loading tasks...</p>;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div style={{
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      paddingBottom: '10px',
      gap: '1rem',
    }}>
        {Object.entries(columns).map(([columnId, columnName]) => (
          <Droppable droppableId={columnId} key={columnName}>
            {(provided) => (
              <div
                ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: '0 0 300px', // fixed width
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#f8f8f8',
              borderRadius: '8px',
              padding: '10px',
              minHeight: '400px',
              maxHeight: '80vh',
              overflowY: 'auto', // scroll tasks if too many
            }}
              >
                <h3 style={{ textAlign: 'center' }}>{columnName}</h3>
                {getTasksByColumn(columnId).map((task, index) => (
                  <Draggable draggableId={task._id} index={index} key={task._id}>
                    {(provided) => (
                      <div
                         ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: '#fff',
                      marginBottom: '10px',
                      padding: '10px',
                      borderRadius: '6px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      cursor: 'grab',
                      minHeight: '60px', // ✅ compact card height
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                      >
                        <strong>{task.title}</strong>
                        <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{task.description}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
