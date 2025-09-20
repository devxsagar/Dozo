import React from "react";
import { useSelector } from "react-redux";
import Column from "./Column";


const Board = () => {
 

  const data = useSelector((state) => state.board);

  return (
    <div className="relative px-1 py-5 flex gap-5 overflow-x-auto">
      {Object.keys(data).map((label) => {
        const uniqueID = crypto.randomUUID(); // generate unique id
        const { color, tasks } = data[label]; // destructuring object
        return (
          <Column key={uniqueID} label={label} color={color} tasks={tasks}/>
        );
      })}

      
    </div>
  );
};

export default Board;
