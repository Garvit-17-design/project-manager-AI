const API_URL = 'http://localhost:5000/api/tasks';

export const fetchTasksByProject = async (projectId) => {
  try {
    const response = await fetch(`${API_URL}/project/${projectId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};
