"use client";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";
import {
  useDeleteTask,
  useGetTasks,
  useToggleTaskCompletion,
  useUpdateTask,
} from "@/hooks/tasks";
import { toast } from "sonner";

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
  const { data: tasks } = useGetTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: toggleTaskCompletion } = useToggleTaskCompletion();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  if (taskList && taskList.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No tasks available.</p>
      </div>
    );
  }

  const handleToggleComplete = async (id: string) => {
    const task = taskList.find((t) => t.id === id);
    if (!task) return;
    const completed = !task.completed;
    toggleTaskCompletion(
      { id, completed },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
        },
        onError: (error) => {
          toast.error("Failed to update task");
          console.error("Error updating task:", error);
        },
      }
    );
  };

  const handleDelete = async (id: string) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    // await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    deleteTask(id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
      },
      onError: (error) => {
        toast.error("Failed to delete task");
        console.error("Error deleting task:", error);
      },
    });
  };

  const handleSave = (
    id: string,
    updatedTask: { title: string; description: string; priority: string }
  ) => {
    updateTask(
      { id, task: updatedTask },
      {
        onSuccess: (updatedTaskFromServer) => {
          // Mettre à jour la liste des tâches localement
          const updatedList = taskList.map((task) =>
            task.id === id ? { ...task, ...updatedTaskFromServer } : task
          );
          setTaskList(updatedList);

          toast.success("Task updated successfully");
          setIsModalOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to update task");
          console.error("Error updating task:", error);
        },
      }
    );
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      {taskList &&
        taskList.map((task) => (
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
          onSave={(id, updatedTask) => handleSave(id, updatedTask)}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default TaskList;
