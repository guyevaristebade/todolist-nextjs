"use client";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: string;
  updatedAt: string;
}
const TaskList = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTaskList(data);
    };
    fetchTasks();
  }, []);

  if (taskList.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No tasks available.</p>
      </div>
    );
  }

  const handleToggleComplete = async (id: string) => {
    const updated = taskList.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTaskList(updated);

    await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: !taskList.find((t) => t.id === id)?.completed,
      }),
    });
  };

  const handleDelete = async (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  };

  const handleSave = async (
    id: string,
    updatedTask: { title: string; description: string; priority: string }
  ) => {
    const updatedList = taskList.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    setTaskList(updatedList as Task[]);
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTask),
    });
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {taskList.map((task) => (
        <TaskItem
          key={task.id}
          {...task}
          completed={task.completed}
          onComplete={() => handleToggleComplete(task.id)}
          onDeleteItem={() => handleDelete(task.id)}
          onEditItem={() => handleEdit(task)}
        />
      ))}

      {selectedTask && (
        <EditTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskList;
