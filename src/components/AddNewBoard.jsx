import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import ColorPicker from "./ColorPicker";
import { removeBoard } from "@/store/add-new-board-slice";
import { addNewBoard } from "@/store/board-slice";

const AddNewBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState("#ff0000");

  const data = useSelector((state) => state.board);
  const dispatch = useDispatch();

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();

    // if board is present then it will not create the board with same name
    if (data[boardName.trim().toLowerCase()]) {
      toast.error("Board already exists.", {
        style: {
          background: "#f14445",
          color: "white",
        },
      });
      return;
    }

    dispatch(addNewBoard({ boardName, color }));
    toast.success("Board created successfully!", {
      style: {
        background: "#bbf7d0",
        color: "black",
      },
    });
    dispatch(removeBoard(false));
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[250px] bg-bg-primary border border-border py-2.5 rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 pt-2 pb-5 border-b border-border">
        <h4 className="text-base font-medium">Add New Board</h4>
        <X
          size={18}
          className="opacity-60 hover:opacity-100 transition-all duration-200 ease-linear"
          onClick={() => dispatch(removeBoard(false))}
        />
      </div>

      {/* Form */}
      <form className="px-4 pt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <span className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Board name</Label>
          <Input
            name="title"
            type="text"
            required
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="bg-bg-body border-[#d1d5dc]"
          />
        </span>

        <span className="flex flex-col gap-1.5">
          <ColorPicker color={color} setColor={setColor} />
        </span>

        <span className="flex gap-2 justify-end items-center">
          <Button
            variant="outline"
            onClick={() => dispatch(removeBoard(false))}
          >
            Cancel
          </Button>
          <Button variant="default" type="submit">
            Add Board
          </Button>
        </span>
      </form>
    </div>
  );
};

export default AddNewBoard;
