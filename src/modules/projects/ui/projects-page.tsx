"use client";

import { Role } from "@prisma/client";
import { useParams } from "next/navigation";
import { useState } from "react";

import { ContentSection, EmptyState, QueryWrapper } from "@app/components/layout";
import { useWorkspaces } from "@app/modules/workspaces/api";

import { useDeleteProject, useProjects, useUpdateProject } from "../api";
import type { ProjectDTO } from "../model";

import { CreateProjectForm } from "./create-project-form";
import { DeleteProjectDialog } from "./delete-project-dialog";
import { ProjectsSection } from "./projects-section";
import { UpdateProjectDialog } from "./update-project-dialog";

export function ProjectsPage() {
  const params = useParams();
  const workspaceId = params["workspaceId"] as string;

  const { data: workspaces } = useWorkspaces();
  const { data: projects, isLoading, error } = useProjects(workspaceId);

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<ProjectDTO | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProjectDTO | null>(null);

  const workspace = workspaces?.find((ws) => ws.id === workspaceId);
  const userRole = workspace?.role ?? Role.MEMBER;

  const handleRename = (project: ProjectDTO) => {
    setUpdateTarget(project);
    setUpdateOpen(true);
  };

  const handleArchive = (project: ProjectDTO) => {
    updateProject({
      workspaceId,
      projectId: project.id,
      input: { isArchived: !project.isArchived },
    });
  };

  const handleDelete = (project: ProjectDTO) => {
    setDeleteTarget(project);
    setDeleteOpen(true);
  };

  const closeDialogs = () => {
    setUpdateOpen(false);
    setDeleteOpen(false);
    setUpdateTarget(null);
    setDeleteTarget(null);
  };

  return (
    <>
      <QueryWrapper
        isLoading={isLoading}
        loadingText="Loading projects..."
        error={error}
        data={projects}
        isEmpty={(data) => data.length === 0}
        renderEmpty={
          <ContentSection title="Projects" subtitle="Organize your work into projects">
            <CreateProjectForm workspaceId={workspaceId} />

            <EmptyState
              title="No projects yet"
              description="Create your first project to start tracking time"
            />
          </ContentSection>
        }
      >
        {(projectsList) => (
          <ContentSection title="Projects" subtitle="Organize your work into projects">
            <CreateProjectForm workspaceId={workspaceId} />

            <ProjectsSection
              projects={projectsList}
              userRole={userRole}
              onRename={handleRename}
              onArchive={handleArchive}
              onDelete={handleDelete}
            />
          </ContentSection>
        )}
      </QueryWrapper>

      {updateTarget && (
        <UpdateProjectDialog
          open={updateOpen}
          onOpenChange={(open) => (open ? setUpdateOpen(true) : closeDialogs())}
          projectName={updateTarget.name}
          onSubmit={(input) => {
            updateProject(
              {
                workspaceId,
                projectId: updateTarget.id,
                input,
              },
              { onSuccess: closeDialogs },
            );
          }}
          isSubmitting={isUpdating}
        />
      )}

      {deleteTarget && (
        <DeleteProjectDialog
          open={deleteOpen}
          onOpenChange={(open) => (open ? setDeleteOpen(true) : closeDialogs())}
          projectName={deleteTarget.name}
          onConfirm={() => {
            deleteProject({ workspaceId, projectId: deleteTarget.id }, { onSuccess: closeDialogs });
          }}
          isDeleting={isDeleting}
        />
      )}
    </>
  );
}
