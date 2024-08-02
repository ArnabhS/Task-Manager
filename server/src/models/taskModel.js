const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  rating:{
    type:Number,
   min:0,
   max:5
  },
  points:{
    type:Number,
    min:0,
    max:100
  },
  startTime:{
    type:Date
  },
  elaspedTime:{
    type:Number
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
