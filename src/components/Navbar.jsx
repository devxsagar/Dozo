import React, { useState } from "react";
import { Kanban, Moon, Plus, Search, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { Toaster } from "./ui/sonner";
import { useDispatch } from "react-redux";
import { showBoardCard } from "@/store/ui-slice";

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();

  return (
    <nav className="px-1 py-4 max-lg:flex max-lg:flex-col max-md:gap-4 max-lg:gap-8">
      {/* Logo */}
      <div className="w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-1 text-xl font-medium">
          <span>
            <Kanban strokeWidth={3} />
          </span>
          Dozo
        </a>

        {/* Search Box & Theme Toggle */}
        <div className="flex items-center gap-8 max-md:gap-4">
          {/* Theme */}
          <button
            className="group/theme p-1 hover:bg-bg-secondary dark:hover:bg-dark-bg-secondary  hover:rounded-full animate-hover"
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <Moon
                className="cursor-pointer opacity-70 group-hover/theme:opacity-100 animate-hover"
                size={22}
              />
            ) : (
              <Sun
                className="cursor-pointer opacity-70 group-hover/theme:opacity-100 animate-hover"
                size={22}
              />
            )}
          </button>
          {/* search box only for large screen */}
          {/* <div className="relative flex items-center gap-1 max-lg:hidden">
            <Search className="absolute left-3  " size={16} />
            <Input
              className="lg:w-[300px] pl-8 "
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="search tasks here..."
            />
          </div> */}
          {/* Add Board */}
          <Button onClick={() => dispatch(showBoardCard(true))} className="cursor-pointer" >
            <Plus /> Add a board
          </Button>
        </div>
      </div>

      {/* search box only for mobile screen */}
      {/* <div className="relative flex items-center gap-1 lg:hidden">
        <Search className="absolute left-3  " size={16} />
        <Input
          className="lg:w-full pl-8 "
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search tasks here..."
        />
      </div> */}

      <Toaster position="top-center" />
    </nav>
  );
};

export default Navbar;
