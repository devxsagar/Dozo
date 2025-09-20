import React from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePicker = ({ date, setDate }) => {
  const handleSelect = (selectedDate) => {
    if (selectedDate) {
      setDate(format(selectedDate, "yyyy/MM/dd")); // save in yyyy/MM/dd
    }
  };


  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-full justify-start text-left bg-bg-body font-normal"
        >
          <CalendarIcon />
          {date ? format(date, "yyyy/MM/dd") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
