// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch tasks when component mounts
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/task", { method: "GET" });
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      setError("Failed to fetch tasks");
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle) return;
    try {
      await fetch("/api/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTaskTitle }),
      });
      setNewTaskTitle("");
      fetchTasks(); // Refresh task list
    } catch (error) {
      setError("Failed to add task");
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await fetch("/api/task", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchTasks(); // Refresh task list
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const handleToggleCompleted = async (id: number) => {
    try {
      await fetch("/api/task", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchTasks(); // Refresh task list
    } catch (error) {
      setError("Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Todo List</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="New task title"
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded-md"
          >
            <span
              className={`cursor-pointer ${
                task.completed ? "line-through text-gray-500" : "text-black"
              }`}
              onClick={() => handleToggleCompleted(task.id)}
            >
              {task.title}
            </span>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
