import { X } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { Textarea } from "./ui/textarea";
import { addTask } from "@/store/board-slice";
import { closeTaskCard } from "@/store/ui-slice";

const AddNewTask = ({ label }) => {
  const [date, setDate] = useState();
  const [priority, setPriority] = useState("medium");
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    assignee: "",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.board);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTask({ label, taskDetails, date, priority }));
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[390px] sm:w-[380px] md:w-[440px] md:max-w-[440px] md:h-[580px] bg-bg-primary border border-border py-2.5 rounded">
      {/* Header */}
      <div className="flex items-center justify-between px-2.5 pt-2 pb-5 border-b border-border">
        <h4 className="text-base font-medium">Add New Task</h4>
        <X
          size={18}
          className="opacity-60 hover:opacity-100 transition-all duration-200 ease-linear"
          onClick={() => dispatch(closeTaskCard(false))}
        />
      </div>

      <form className="px-4 pt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {/* Title */}
          <span className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Title</Label>
            <Input
              name="title"
              type="text"
              required
              className="bg-bg-body border-[#d1d5dc]"
              value={taskDetails.title}
              onChange={(e) => {
                const { name, value } = e.target;
                setTaskDetails((prev) => ({
                  ...prev,
                  [name]: value, // ✅ update only this field
                }));
              }}
            />
          </span>

          {/* Description */}
          <span className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Description</Label>
            <Textarea
              name="description"
              type="text"
              required
              value={taskDetails.description}
              onChange={(e) => {
                const { name, value } = e.target;
                setTaskDetails((prev) => ({ ...prev, [name]: value }));
              }}
              className="bg-bg-body border-[#d1d5dc] h-20 resize-none"
            />
          </span>

          {/* Priority */}
          <span className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Priority</label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-full bg-bg-body">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">high</SelectItem>
                <SelectItem value="medium">medium</SelectItem>
                <SelectItem value="low">low</SelectItem>
              </SelectContent>
            </Select>
          </span>

          {/* Due Date */}
          <span className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Due date</label>
            <DatePicker date={date} setDate={setDate} />
          </span>

          {/* Assignee */}
          <span className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium">Assignee</Label>
            <Input
              name="assignee"
              type="text"
              required
              value={taskDetails.assignee}
              onChange={(e) => {
                const { name, value } = e.target;
                setTaskDetails((prev) => ({ ...prev, [name]: value }));
              }}
              className="bg-bg-body border-[#d1d5dc]"
            />
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <Button
            variant="outline"
            onClick={() => dispatch(closeTaskCard(false))}
          >
            Cancel
          </Button>
          <Button type="submit">Add Task</Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;
