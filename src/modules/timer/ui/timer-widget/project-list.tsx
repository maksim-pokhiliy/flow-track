"use client";

import { useState } from "react";

import { Stack } from "@app/components/layout";
import { ScrollArea } from "@app/components/ui";
import type { ProjectDTO } from "@app/modules/projects/model";

import { TimeEntryDTO } from "../../model";

import { ProjectItem } from "./project-item";

type ProjectListProps = {
  projects: ProjectDTO[];
  onProjectSelect: (project: TimeEntryDTO["project"]) => void;
  onTaskSelect: (project: TimeEntryDTO["project"], task: TimeEntryDTO["task"]) => void;
  currentProject: TimeEntryDTO["project"] | null;
  currentTask: TimeEntryDTO["task"] | null;
};

export function ProjectList({
  projects,
  currentProject,
  currentTask,
  onProjectSelect,
  onTaskSelect,
}: ProjectListProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(() => {
    if (currentProject && currentTask) {
      return new Set([currentProject.id]);
    }

    return new Set();
  });

  const toggleProjectExpanded = (projectId: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);

      if (next.has(projectId)) {
        next.delete(projectId);
      } else {
        next.add(projectId);
      }

      return next;
    });
  };

  return (
    <ScrollArea className="h-100">
      <Stack spacing={2} className="p-2">
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            isExpanded={expandedProjects.has(project.id)}
            isSelected={project.id === currentProject?.id}
            selectedTaskId={currentTask?.id ?? null}
            onProjectSelect={() => onProjectSelect(project)}
            onTaskSelect={(task) => onTaskSelect(project, task)}
            onToggleExpand={() => toggleProjectExpanded(project.id)}
          />
        ))}
      </Stack>
    </ScrollArea>
  );
}
