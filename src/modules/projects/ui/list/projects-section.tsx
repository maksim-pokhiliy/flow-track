"use client";

import { Role } from "@prisma/client";

import { EmptyState, Stack } from "@app/components/layout";
import { Typography } from "@app/components/ui";

import type { ProjectDTO } from "../../model";

import { ProjectItemRow } from "./project-item-row";

type Props = {
  projects: ProjectDTO[];
  userRole: Role;
  onRename: (project: ProjectDTO) => void;
  onArchive: (project: ProjectDTO) => void;
  onDelete: (project: ProjectDTO) => void;
};

export function ProjectsSection({ projects, userRole, onRename, onArchive, onDelete }: Props) {
  const activeProjects = projects.filter((p) => !p.isArchived);
  const archivedProjects = projects.filter((p) => p.isArchived);

  return (
    <Stack spacing={8}>
      <Stack spacing={4}>
        <Typography variant="h3">Active projects</Typography>

        <ul className={`divide-y ${activeProjects.length > 0 && "rounded-sm border"}`}>
          {activeProjects.length === 0 ? (
            <EmptyState
              title="No active projects"
              description={
                archivedProjects.length > 0
                  ? "All projects are archived. Create a new one or restore from archived."
                  : "Create your first project to start tracking time."
              }
            />
          ) : (
            activeProjects.map((project) => (
              <li key={project.id}>
                <ProjectItemRow
                  project={project}
                  userRole={userRole}
                  onRename={() => onRename(project)}
                  onArchive={() => onArchive(project)}
                  onDelete={() => onDelete(project)}
                />
              </li>
            ))
          )}
        </ul>
      </Stack>

      {archivedProjects.length > 0 && (
        <Stack spacing={4}>
          <Typography variant="h3">Archived projects</Typography>

          <ul className="divide-y rounded-sm border opacity-60">
            {archivedProjects.map((project) => (
              <li key={project.id}>
                <ProjectItemRow
                  project={project}
                  userRole={userRole}
                  onRename={() => onRename(project)}
                  onArchive={() => onArchive(project)}
                  onDelete={() => onDelete(project)}
                />
              </li>
            ))}
          </ul>
        </Stack>
      )}
    </Stack>
  );
}
