"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Stack } from "@app/components/layout";
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/components/ui";
import { useProjects } from "@app/modules/projects/api";
import { useWorkspaceStore } from "@app/shared/store";

interface TimeFiltersProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  projectFilter: string | null;
  onProjectFilterChange: (projectId: string | null) => void;
}

export function TimeFilters({
  dateRange,
  onDateRangeChange,
  projectFilter,
  onProjectFilterChange,
}: TimeFiltersProps) {
  const { currentWorkspaceId } = useWorkspaceStore();
  const { data: projects = [] } = useProjects(currentWorkspaceId);

  return (
    <Stack direction="row" spacing={3} align="center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="default">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={(range) => {
              if (range?.from) {
                onDateRangeChange({
                  from: range.from,
                  to: range.to ?? range.from,
                });
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select
        value={projectFilter ?? "all"}
        onValueChange={(v) => onProjectFilterChange(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="All projects" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All projects</SelectItem>
          {projects.map((project) => (
            <SelectItem key={project.id} value={project.id}>
              {project.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Stack>
  );
}
