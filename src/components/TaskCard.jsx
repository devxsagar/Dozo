import { deleteTask } from "@/store/board-slice";
import { setEditTaskCard } from "@/store/ui-slice";
import { Calendar, SquarePen, Trash2 } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";

const TaskCard = ({ label, task, index, setShowAddNewTaskCard }) => {
  const dispatch = useDispatch();
  const { id, priority, title, description, dueDate, assignee } = task;

  const handleDeleteButton = (label, id) => {
    dispatch(deleteTask({ label, id }));
  };

  return (
    <div className="min-h-52 border border-border p-3 rounded-sm flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p
            className={`text-xxs px-1 py-0.5 rounded-sm uppercase ${
              priority === "high" && "bg-high-priority text-text-high-priority"
            } ${
              priority === "medium" &&
              "bg-medium-priority text-text-medium-priority"
            } ${
              priority === "low" && "bg-low-priority text-text-low-priority"
            } font-medium`}
          >
            {priority}
          </p>
          {dueDate && (
            <span className="flex items-center gap-1 text-xxs text-text-secondary">
              <Calendar size={12} />
              <p>{dueDate}</p>
            </span>
          )}
        </div>

        {/* Task and Description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium leading-5 capitalize">{title}</h3>
          <p className="text-xs text-text-secondary text-wrap max-w-full leading-4.5">
            {description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-text-secondary text-wrap max-w-full capitalize">
          Assignee: {assignee}
        </p>
        <div className="flex items-center gap-3">
          <button
            className="p-1 rounded-full hover:bg-bg-secondary transition-all duration-200 ease-linear"
            onClick={() => {
              dispatch(setEditTaskCard({ index, label }));
              setShowAddNewTaskCard(true)
            }}
          >
            <SquarePen size={16} />
          </button>
          <button
            className="p-1 rounded-full hover:bg-bg-secondary transition-all duration-200 ease-linear"
            onClick={() => handleDeleteButton(label, id)}
          >
            <Trash2 size={16} color="#fb2c36" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
