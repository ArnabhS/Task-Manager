const Task = require('../models/taskModel.js');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({
      title,
      description,
      userId: req.user._id
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
   
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getTasks, updateTask, deleteTask, getTask };
