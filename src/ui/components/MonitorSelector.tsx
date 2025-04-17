import React from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

interface MonitorSelectorProps {
  selectedMonitor: string;
  onselectedMonitor: (value: string) => void;
}

export const MonitorSelector: React.FC<MonitorSelectorProps> = ({
  selectedMonitor,
  onselectedMonitor,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-semibold mb-1">Select Monitor</label>
      <Select value={selectedMonitor} onValueChange={onselectedMonitor}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a monitor" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Monitor 1</SelectItem>
          <SelectItem value="2">Monitor 2</SelectItem>
          <SelectItem value="3">Monitor 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
