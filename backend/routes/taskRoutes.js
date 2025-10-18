const express = require('express');
const router = express.Router();

const {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

router.get('/project/:projectId', getTasksByProject);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router; 