import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import AddNewBoard from "./AddNewBoard";
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { handleDragAndDrop } from "@/store/board-slice";

const Board = () => {
  const data = useSelector((state) => state.board);
  const isBoardCardOpen = useSelector((state) => state.ui.isBoardCardOpen);

  const dispatch = useDispatch();
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (!over) return;

    const [sourceColumn, taskId] = active.id.split(":");
    const targetColumn = over.id;

    // const task = data[sourceColumn].tasks.find((t) => t.id === taskId);
    // if (!task) return;
    console.log(taskId, sourceColumn);
    console.log(taskId, targetColumn);
    dispatch(handleDragAndDrop({ sourceColumn, taskId, targetColumn }));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="relative px-1 py-5 flex gap-5 overflow-x-auto">
        {Object.keys(data).map((label) => {
          const uniqueID = crypto.randomUUID(); // generate unique id
          const { color, tasks } = data[label]; // destructuring object
          return (
            <Column key={uniqueID} label={label} color={color} tasks={tasks} />
          );
        })}

        {/* Add New Board Card */}
        {isBoardCardOpen && (
          <div className="fixed inset-0 z-20 w-screen h-screen bg-black/70">
            <AddNewBoard />
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default Board;
