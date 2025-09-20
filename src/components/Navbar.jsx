import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Kanban, Moon, Search, Sun } from "lucide-react";

const Navbar = () => {
  const [input, setInput] = useState("");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="px-1 py-4 max-md:flex max-md:flex-col max-md:gap-4">
      {/* Logo */}
      <div className="w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-1 text-xl font-medium">
          <span>
            <Kanban strokeWidth={3} />
          </span>
          Dozo
        </a>

        {/* Search Box & Theme Toggle */}
        <div className="flex items-center gap-8">
          {/* search box only for large screen */}
          <div className="relative flex items-center gap-1 max-md:hidden">
            <Search className="absolute left-3  " size={16} />
            <Input
              className="lg:w-[300px] pl-8 "
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="search tasks here..."
            />
          </div>

          {/* Theme */}
          <button className="group/theme p-1 hover:bg-bg-secondary  hover:rounded-full transition-all duration-200 ease-linear" onClick={() => setToggle((prev) => !prev)}>
            {toggle ? (
              <Moon
                className="cursor-pointer hover:opacity-70 duration-200 transition-all ease-linear"
                size={22}
              />
            ) : (
              <Sun
                className="cursor-pointer group-hover/theme:opacity-70 duration-200 transition-all ease-linear"
                size={22}
              />
            )}
          </button>
        </div>
      </div>

      {/* search box only for mobile screen */}
      <div className="relative flex items-center gap-1 md:hidden">
        <Search className="absolute left-3  " size={16} />
        <Input
          className="lg:w-full pl-8 "
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="search tasks here..."
        />
      </div>
    </nav>
  );
};

export default Navbar;
