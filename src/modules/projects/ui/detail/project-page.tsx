"use client";

import { Role } from "@prisma/client";
import { useParams } from "next/navigation";

import { ContentSection, QueryWrapper } from "@app/components/layout";
import { useWorkspaces } from "@app/modules/workspaces/api";

import { useProject } from "../../api";

import { ProjectTabs } from "./tabs/project-tabs";
import { ProjectHeader } from "./project-header";

export function ProjectPage() {
  const params = useParams();
  const workspaceId = params["workspaceId"] as string;
  const projectId = params["projectId"] as string;

  const { data: project, isLoading, error } = useProject(workspaceId, projectId);
  const { data: workspaces } = useWorkspaces();

  const workspace = workspaces?.find((ws) => ws.id === workspaceId);
  const userRole = workspace?.role ?? Role.MEMBER;

  return (
    <QueryWrapper
      isLoading={isLoading}
      loadingText="Loading project..."
      error={error}
      data={project}
    >
      {(proj) => (
        <ContentSection title={proj.name} subtitle={<ProjectHeader project={proj} />}>
          <ProjectTabs project={proj} workspaceId={workspaceId} userRole={userRole} />
        </ContentSection>
      )}
    </QueryWrapper>
  );
}
