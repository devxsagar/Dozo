import React from "react";
import { Ellipsis, Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const Column = ({ label, color, tasks }) => {
  return (
    <section className="relative min-w-[350px] w-[350px] min-h-[600px] border border-[var(--color-border)] rounded-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3.5 pt-3.5 pb-5">
        {/* Task Header */}
        <div className="flex items-center gap-2">
          <div className="w-[10px] h-[10px] rounded-full" style={{backgroundColor: color}} />
          <h2 className="text-sm font-medium capitalize">{label.trim()}</h2>
          <p className="px-2 py-0.5 rounded-sm text-xs bg-bg-secondary">
            {tasks.length}
          </p>
        </div>
        {/* Options and Add Icon */}
        <div className="flex items-center gap-3">
          <span className="p-1 hover:bg-bg-secondary rounded-md transition-all duration-200 ease-linear">
            <Plus size={16} />
          </span>
          <span className="p-1 hover:bg-bg-secondary rounded-md transition-all duration-200 ease-linear">
            <Ellipsis size={16} />
          </span>
        </div>
      </div>

      {/* Tasks */}
      <div className="px-3.5 pt-3.5 flex flex-col gap-2 mb-20">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task}/>;
        })}
      </div>

      {/* Footer - Add a task */}
      <div className="absolute bottom-0 border-t w-full px-4 py-4">
        <div className="flex items-center gap-3 px-1.5 py-2 rounded-sm cursor-pointer hover:bg-bg-secondary select-none text-text-secondary hover:text-text-primary hover:font-medium transition-all duration-200 ease-linear">
          <Plus size={12} />
          <p className="text-xs">Add a task</p>
        </div>
      </div>
    </section>
  );
};

export default Column;
