"use client";

import { Role } from "@prisma/client";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ContentSection, EmptyState, QueryWrapper } from "@app/components/layout";
import { Button } from "@app/components/ui";
import { useWorkspaces } from "@app/modules/workspaces/api";
import { useWorkspaceStore } from "@app/shared/store";

import { useProject } from "../../api";

import { ProjectTabs } from "./tabs/project-tabs";
import { ProjectHeader } from "./project-header";

export function ProjectPage() {
  const params = useParams();
  const projectId = params["projectId"] as string;

  const { currentWorkspaceId: workspaceId } = useWorkspaceStore();

  const {
    data: project,
    isLoading: isProjectLoading,
    error: projectError,
  } = useProject(workspaceId, projectId);

  const {
    data: workspaces,
    isLoading: isWorkspacesLoading,
    error: workspacesError,
  } = useWorkspaces();

  const workspace = workspaces?.find((ws) => ws.id === workspaceId);
  const userRole = workspace?.role ?? Role.MEMBER;

  return (
    <QueryWrapper
      isLoading={isProjectLoading || isWorkspacesLoading}
      loadingText="Loading project..."
      error={projectError ?? workspacesError}
      data={project}
      isEmpty={() => Boolean(project && project.workspaceId !== workspaceId)}
      renderEmpty={() => (
        <ContentSection maxWidth="2xl">
          <EmptyState
            title="Project not found"
            description="This project doesn't belong to the current workspace"
            action={
              <Button variant="secondary" asChild>
                <Link href="/projects">Back to projects</Link>
              </Button>
            }
          />
        </ContentSection>
      )}
    >
      {(proj) => (
        <ContentSection
          maxWidth="2xl"
          title={proj.name}
          subtitle={<ProjectHeader project={proj} />}
        >
          <ProjectTabs project={proj} workspaceId={workspaceId} userRole={userRole} />
        </ContentSection>
      )}
    </QueryWrapper>
  );
}
