"use client";
import React, { useState } from "react";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Edit, TrashIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className={`w-full p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 ${cn(
        completed ? "opacity-50" : ""
      )}`}
    >
      <div className="flex flex-col gap-3">
        {/* Section supérieure: checkbox, titre et badge de priorité */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <Checkbox
              className="mt-1 cursor-pointer"
              id={`completed_task_${id}`}
              checked={completed}
              onCheckedChange={() => onComplete && onComplete(id)}
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
            </div>
          </div>
          <span
            className={`whitespace-nowrap text-sm px-2 py-1 rounded ${cn(
              priority === "high"
                ? "bg-red-100 text-red-600"
                : priority === "medium"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            )}`}
          >
            {priority}
          </span>
        </div>

        {/* Description avec possibilité de voir plus */}
        <div className="pl-8">
          <p
            className={`text-sm text-gray-500 break-words ${cn(
              isExpanded ? "" : "line-clamp-2"
            )}`}
          >
            {description}
          </p>
          {description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-blue-500 mt-1"
            >
              {isExpanded ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>

        {/* Boutons d'action */}
        <div className="flex flex-wrap justify-end gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
            onClick={() => onEditItem && onEditItem(id)}
          >
            <Edit />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
            onClick={() => onDeleteItem && onDeleteItem(id)}
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskItem;
