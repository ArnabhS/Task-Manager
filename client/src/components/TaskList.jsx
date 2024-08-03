import React from 'react';
import Stopwatch from './Stopwatch';

export default function TaskList({ tasks, onEdit, onDelete, onComplete, onUpdate }) {
  const calculateScore = (rating, points) => {
    if (rating && points) return (rating * points) / 5;
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-full mx-auto">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-black">{task.title}</h2>
          <p className="text-black">{task.description}</p>
          {task.points && <p className="text-black">Points: {task.points}</p>}
          <p className="text-black">Score: {task.completed ? calculateScore(task.rating, task.points) : 0}</p>
          <Stopwatch
            startTime={task.startTime}
            elapsedTime={task.elapsedTime}
            onUpdate={(update) => onUpdate(task._id, update)}
          />
          <div className="flex flex-col gap-3 md:gap-0 mt-2 md:flex-row">
            <button
              onClick={() => onComplete(task._id)}
              className={`py-1 px-2 rounded ${task.completed ? 'bg-green-500' : 'bg-red-500'} text-white`}
            >
              {task.completed ? 'Completed' : 'Incomplete'}
            </button>
            <button onClick={() => onEdit(task._id)} className="ml-2 py-1 px-2 bg-blue-500 text-white rounded">
              Edit
            </button>
            <button onClick={() => onDelete(task._id)} className="ml-2 py-1 px-2 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
