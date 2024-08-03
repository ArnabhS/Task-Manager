const Task = require('../models/taskModel.js');
const User= require('../models/userModel.js')
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};
// score = (rating*points)/5
const createTask = async (req, res) => {
  const { title, description,points} = req.body;
  const userId = req.user._id
    console.log(userId)
  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const taskCount = await Task.countDocuments({ userId })+1;
    console.log(taskCount)
    if (taskCount > 5 && !user.subscription) {
      return res.status(403).json({ error: 'Subscription required to add more than 5 tasks' });
    }

    const newTask = new Task({ userId, title, description, points });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, rating, points, startTime, elapsedTime } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, rating, points, startTime, elapsedTime },
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



module.exports = { createTask, getTasks, updateTask, deleteTask, getTask};
