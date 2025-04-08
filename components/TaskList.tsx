"use client";
import { useCallback, useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import EditTaskModal from "./EditTaskModal";
import {
  useDeleteTask,
  useGetTasks,
  useToggleTaskCompletion,
  useUpdateTask,
} from "@/hooks/use-tasks";
import { toast } from "sonner";
import { TaskData } from "@/types/tasks";

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
  const { data: tasks, isLoading } = useGetTasks();
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();
  const { mutate: toggleTaskCompletion } = useToggleTaskCompletion();

  useEffect(() => {
    setTaskList(tasks);
  }, [tasks]);

  // useCallback est utilisé pour mémoriser la fonction handleToggleComplete
  // afin d'éviter de la recréer à chaque rendu, ce qui peut améliorer les performances
  // surtout si cette fonction est passée en tant que prop à des composants enfants
  // qui pourraient se re-rendre inutilement.
  // De plus, useCallback permet de s'assurer que la fonction a toujours les mêmes dépendances
  // (taskList et toggleTaskCompletion) et ne sera recréée que si l'une de ces dépendances change.
  // Cela permet d'éviter des appels API inutiles et de garantir que la fonction
  // a toujours accès aux valeurs les plus récentes de taskList et toggleTaskCompletion.
  const handleToggleComplete = useCallback(
    async (id: string) => {
      if (taskList.length === 0) return;
      const task = taskList.find((t) => t.id === id);
      if (!task) return;
      const completed = !task.completed;
      toggleTaskCompletion(
        { id, completed },
        {
          onSuccess: () => {
            toast.success("Task updated successfully");
          },
          onError: () => {
            toast.error("Failed to update task");
          },
        }
      );
    },
    [taskList, toggleTaskCompletion]
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">Chargement...</p>
      </div>
    );
  }

  if (taskList && taskList.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-gray-500">No tasks available.</p>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    deleteTask(id, {
      onSuccess: () => {
        toast.success("Task deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete task");
      },
    });
  };

  const handleSave = (id: string, updatedTask: TaskData) => {
    updateTask(
      { id, task: updatedTask },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setIsModalOpen(false);
        },
        onError: () => {
          toast.error("Failed to update task");
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
