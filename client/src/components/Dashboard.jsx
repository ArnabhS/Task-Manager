"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TaskList from '@/components/TaskList';
import TaskFormModal from '@/components/TaskForm';
import EditTaskFormModal from '@/components/EditTaskForm';

export default function Dashboard({ userId }) {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [showTaskFormModal, setShowTaskFormModal] = useState(false);
  const [showEditTaskFormModal, setShowEditTaskFormModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks', { withCredentials: true });
        setTasks(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/login');
        }
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/user/${userId}`, { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push('/login');
        }
      }
    };

    fetchTasks();
    fetchUser();
  }, [router, userId]);

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task, {
        withCredentials: true
      });
      setTasks([...tasks, response.data]);
      setShowTaskFormModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask, {
        withCredentials: true
      });
      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
      setShowEditTaskFormModal(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        withCredentials: true
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  const completeTask = async (id) => {
    try {
      const task = tasks.find(task => task._id === id);
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { ...task, completed: !task.completed },
        {
          withCredentials: true
        }
      );
      setTasks(tasks.map(task => (task._id === id ? { ...task, completed: !task.completed } : task)));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push('/login');
      }
    }
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setShowEditTaskFormModal(true);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-64 bg-gray-800 text-white p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div>
            {user ? (
              <>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm">{user.email}</p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
       
        <button
          onClick={() => {
            localStorage.removeItem('token');
            router.push('/login');
          }}
          className="mt-8 w-full py-2 px-4 bg-red-600 rounded hover:bg-red-700"
        >
          Sign Out
        </button>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">All Tasks</h1>
          <button
            onClick={() => setShowTaskFormModal(true)}
            className="py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-700"
          >
            + Add New Task
          </button>
        </div>
        <TaskList tasks={tasks} onEdit={handleEditTask} onDelete={deleteTask} onComplete={completeTask} />
      </main>
      {showTaskFormModal && (
        <TaskFormModal
          onClose={() => setShowTaskFormModal(false)}
          onSave={addTask}
        />
      )}
      {showEditTaskFormModal && selectedTask && (
        <EditTaskFormModal
          onClose={() => setShowEditTaskFormModal(false)}
          onSave={(updatedTask) => updateTask(selectedTask._id, updatedTask)}
          task={selectedTask}
        />
      )}
    </div>
  );
}
