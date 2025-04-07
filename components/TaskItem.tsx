"use client";
import React from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  onComplete?: (id: string) => void;
  onDeleteItem?: (id: string) => void;
  onEditItem?: (id: string) => void;
}

const TaskItem = ({
  id,
  title,
  description,
  priority,
  completed,
  onComplete,
  onDeleteItem,
  onEditItem,
}: TaskItemProps) => {
  return (
    <Card
      className={`w-full p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row sm:items-center gap-4 ${
        completed ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <Checkbox
          id={`completed_task_${id}`}
          checked={completed}
          onCheckedChange={() => onComplete && onComplete(id)}
        />
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:ml-auto items-center gap-2">
        <span
          className={`text-sm px-2 py-1 rounded ${
            priority === "high"
              ? "bg-red-100 text-red-600"
              : priority === "medium"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {priority}
        </span>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onEditItem && onEditItem(id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => onDeleteItem && onDeleteItem(id)}
        >
          Delete
        </button>
      </div>
    </Card>
  );
};

export default TaskItem;
