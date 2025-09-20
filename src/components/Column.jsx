import React, { useState } from "react";
import { Ellipsis, Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import AddNewTask from "./AddNewTask";

const Column = ({ label, color, tasks }) => {
  const [showAddTask, setShowAddTask] = useState(false);

  return (
    <section className="relative min-w-[350px] w-[350px] min-h-[600px] bg-bg-primary border border-border rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3.5 pt-3.5 pb-5">
        {/* Task Header */}
        <div className="flex items-center gap-2">
          <div
            className="w-[10px] h-[10px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <h2 className="text-sm font-medium capitalize">{label.trim()}</h2>
          <p className="px-2 py-0.5 rounded-sm text-xs bg-bg-secondary">
            {tasks.length}
          </p>
        </div>
        {/* Options and Add Icon */}
        <div className="flex items-center gap-3">
          <button
            className="p-1 hover:bg-bg-secondary rounded-md transition-all duration-200 ease-linear"
            onClick={() => setShowAddTask((prev) => !prev)}
          >
            <Plus size={16} />
          </button>
          <span className="p-1 hover:bg-bg-secondary rounded-md transition-all duration-200 ease-linear">
            <Ellipsis size={16} />
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="px-3.5 pt-3.5 flex flex-col gap-2 mb-20">
        {tasks.map((task) => {
          return <TaskCard label={label} key={task.id} task={task} />;
        })}
      </div>

      {/* Footer - Add a task */}
      <div className="absolute bottom-0 border-t w-full px-4 py-4">
        <button
          className="flex w-full items-center gap-3 px-1.5 py-2 rounded-sm cursor-pointer hover:bg-bg-secondary select-none text-text-secondary hover:text-text-primary hover:font-medium transition-all duration-200 ease-linear"
          onClick={() => setShowAddTask((prev) => !prev)}
        >
          <Plus size={12} />
          <p className="text-xs">Add a task</p>
        </button>
      </div>

      {showAddTask && (
        <div className="fixed inset-0 z-20 w-screen h-screen bg-black/70">
          <AddNewTask setShowAddTask={setShowAddTask} label={label} />
        </div>
      )}
    </section>
  );
};

export default Column;
