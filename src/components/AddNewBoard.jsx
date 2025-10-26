import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import ColorPicker from "./ColorPicker";
import { closeBoardCard, setEditBoardDetails } from "@/store/ui-slice";
import { addNewBoard, editBoard } from "@/store/board-slice";

const AddNewBoard = () => {
  const [boardName, setBoardName] = useState("");
  const [color, setColor] = useState("#ff0000");

  const data = useSelector((state) => state.board);
  const editBoardName = useSelector((state) => state.ui.editBoardDetails.label);
  const dispatch = useDispatch();

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

    if (editBoardName) {
      dispatch(editBoard({ editBoardName, boardName, color }));
      dispatch(setEditBoardDetails(""));
      toast.success("Board updated successfully!", {
        style: {
          background: "#bbf7d0",
          color: "black",
        },
      });
    } else {
      dispatch(addNewBoard({ boardName, color }));
      toast.success("Board created successfully!", {
        style: {
          background: "#bbf7d0",
          color: "black",
        },
      });
    }
    dispatch(closeBoardCard(false));
  };

  useEffect(() => {
    if (!editBoardName || !data) return;

    const editBoardPreviousColor = data[editBoardName].color;

    setBoardName(editBoardName);
    setColor(editBoardPreviousColor);
  }, [editBoardName]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[390px] sm:w-[380px] md:w-[440px] md:max-w-[440px] md:h-[250px] bg-bg-primary dark:bg-dark-bg-primary border border-border py-2.5 rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 pt-2 pb-5 border-b border-border">
        <h4 className="text-base font-medium">Add New Board</h4>
        <X
          size={18}
          className="opacity-60 hover:opacity-100 transition-all duration-200 ease-linear cursor-pointer"
          onClick={() => {
            dispatch(closeBoardCard(false));
            dispatch(setEditBoardDetails(""));
          }}
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
            className="cursor-pointer"
            variant="outline"
            onClick={() => {
              dispatch(closeBoardCard(false));
              dispatch(setEditBoardDetails(""));
            }}
          >
            Cancel
          </Button>
          <Button variant="default" type="submit" className="cursor-pointer">
            {editBoardName ? "Edit Board" : "Add Board"}
          </Button>
        </span>
      </form>
    </div>
  );
};

export default AddNewBoard;
