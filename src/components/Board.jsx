import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";
import AddNewBoard from "./AddNewBoard";

const Board = () => {
  const data = useSelector((state) => state.board);
  const isBoardCardOpen = useSelector((state) => state.ui.isBoardCardOpen);

  return (
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
  );
};

export default Board;
