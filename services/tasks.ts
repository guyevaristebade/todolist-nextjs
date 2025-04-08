import { axiosInstance } from "@/lib/instance";
import { TaskData } from "@/types/tasks";

export const getTasks = async () => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const updateTask = async (id: string, task: TaskData) => {
  const response = await axiosInstance.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};

export const toggleTaskCompletion = async (id: string, completed: boolean) => {
  const response = await axiosInstance.patch(`/tasks/${id}`, { completed });
  return response.data;
};

export const createTask = async (task: TaskData) => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};
