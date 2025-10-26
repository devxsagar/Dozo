import React, { useEffect, useRef, useState } from "react";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Ellipsis, Plus } from "lucide-react";
import AddNewTask from "./AddNewTask";
import TaskCard from "./TaskCard";
import BoardOptionsMenu from "./BoardOptionsMenu";

const Column = ({ label, color, tasks }) => {
  const [optionsMenu, setOptionsMenu] = useState(false);
  const [showAddNewTaskCard, setShowAddNewTaskCard] = useState(false);

  const optionsMenuRef = useRef();
  const ellipsisButtonRef = useRef();

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({ id: label });

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        optionsMenuRef.current &&
        !optionsMenuRef.current.contains(e.target) &&
        !ellipsisButtonRef.current.contains(e.target) // this will exclude the menu button
      ) {
        setOptionsMenu(false);
      }
    }

    if (optionsMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsMenu]);

  return (
    <section
      ref={setDroppableRef}
      className={`relative min-w-[350px] w-[350px] min-h-[600px] bg-bg-primary dark:bg-dark-bg-primary  ${
        isOver ? "bg-blue-50 border-blue-400" : "bg-bg-primary border-border"
      } border border-border rounded-md`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-3.5 pt-3.5 pb-5">
        {/* Task Header */}
        <div className="flex items-center gap-2">
          <div
            className="w-[10px] h-[10px] rounded-full"
            style={{ backgroundColor: color }}
          />
          <h2 className="text-sm font-medium capitalize">{label.trim()}</h2>
          <p className="px-2 py-0.5 rounded-sm text-xs bg-bg-secondary dark:bg-dark-bg-secondary">
            {tasks.length}
          </p>
        </div>
        {/* Add and Options Button */}
        <div className="relative flex items-center gap-3">
          <button
            className="p-1 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary rounded-md animate-hover cursor-pointer"
            onClick={() => setShowAddNewTaskCard(true)}
          >
            <Plus size={16} />
          </button>
          <button
            ref={ellipsisButtonRef}
            className="p-1 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary rounded-md animate-hover cursor-pointer"
            onClick={() => setOptionsMenu((prev) => !prev)}
          >
            <Ellipsis size={16} />
          </button>

          {/* Board Options Menu */}
          {optionsMenu && (
            <div ref={optionsMenuRef} className="absolute top-6 right-0 z-30">
              <BoardOptionsMenu label={label} />
            </div>
          )}
        </div>
      </div>

      {/* Tasks */}
      <div className="px-3.5 pt-3.5 flex flex-col gap-2 mb-20">
        {tasks.map((task, index) => {
          const {
            attributes,
            listeners,
            setNodeRef: setDraggableRef,
            transform,
            transition,
            isDragging,
          } = useDraggable({ id: `${label}:${task.id}` });

          const style = {
            transform: transform
              ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
              : undefined,
            transition,
            opacity: isDragging ? 0.5 : 1, // reduce opacity while dragging
            cursor: "grab",
          };

          return (
            <div
              key={task.id}
              className={`rounded-sm relative z-10`}
              ref={setDraggableRef}
              style={style}
              {...listeners}
              {...attributes}
            >
              <TaskCard
                label={label}
                task={task}
                index={index}
                setShowAddNewTaskCard={setShowAddNewTaskCard}
                isOver={isOver}
                setDraggableRef={setDraggableRef}
              />
            </div>
          );
        })}

        {isOver && (
          <div className="min-h-52 border-2 border-dashed border-blue-400 rounded-md bg-blue-50 dark:bg-dark-bg-secondary"></div>
        )}
      </div>

      {/* Footer - Add a task */}
      <div className="absolute bottom-0 border-t w-full px-4 py-4">
        <button
          className="flex w-full items-center gap-3 px-1.5 py-2 rounded-sm cursor-pointer hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary select-none text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:font-medium animate-hover"
          onClick={() => setShowAddNewTaskCard(true)}
        >
          <Plus size={12} />
          <p className="text-xs">Add a task</p>
        </button>
      </div>

      {showAddNewTaskCard && (
        <div className="fixed inset-0 z-20 w-screen h-screen bg-black/30">
          <AddNewTask
            label={label}
            setShowAddNewTaskCard={setShowAddNewTaskCard}
          />
        </div>
      )}
    </section>
  );
};

export default Column;
