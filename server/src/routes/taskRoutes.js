const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getTask } = require('../controllers/taskController.js');

const router = express.Router();

router.get('/tasks',getTasks);
router.get('/tasks/:id',getTask);
router.post('/tasks',createTask);
router.put('/tasks/:id',  updateTask);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
