import React from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { deleteBoard } from "@/store/board-slice";
import { toast } from "sonner";
import { setEditBoardDetails, showBoardCard } from "@/store/ui-slice";

const BoardOptionsMenu = ({ label }) => {
  const dispatch = useDispatch();

  return (
    <div className="w-25 h-20 p-2 bg-bg-primary border border-border rounded">
      <button
        className="group w-full flex items-center gap-1.5 p-1 hover:bg-bg-secondary select-none animate-hover rounded"
        onClick={() => {
          dispatch(setEditBoardDetails(label));
          dispatch(showBoardCard(true));
        }}
      >
        <SquarePen
          size={16}
          className="opacity-80 group-hover:opacity-100 animate-hover"
        />
        <p className="text-sm opacity-80 group-hover:opacity-100 animate-hover">
          Edit
        </p>
      </button>

      <button
        className="group w-full flex items-center gap-1.5 p-1 hover:bg-bg-secondary select-none animate-hover rounded"
        onClick={() => {
          dispatch(deleteBoard(label));
          toast.success(`The board ${label.toLowerCase()} has been removed.`, {
            style: {
              background: "#bbf7d0",
              color: "black",
            },
          });
        }}
      >
        <Trash2
          size={16}
          className="opacity-80 group-hover:opacity-100 animate-hover"
        />
        <p className="text-sm opacity-80 group-hover:opacity-100 animate-hover">
          Delete
        </p>
      </button>
    </div>
  );
};

export default BoardOptionsMenu;
