"use client";

import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { cn } from "@/lib/utils";

interface DatePickerWithPresetsProps {
  date?: Date; // Changed from 'selected' to 'date'
  onSelect?: (date: Date | undefined) => void;
}

export function DatePickerWithPresets({
  date: selectedDate, // Renamed prop here for internal usage
  onSelect,
}: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date | undefined>(selectedDate);
  const [open, setOpen] = React.useState(true);

  React.useEffect(() => {
    setDate(selectedDate);
  }, [selectedDate]);

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate);
    setOpen(false);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="flex w-auto flex-col space-y-2 p-2"
      >
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={handleDateSelect} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
