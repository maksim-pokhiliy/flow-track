"use client";

import { ContentSection, EmptyState, QueryWrapper } from "@app/components/ui";

import { useWorkspaces } from "../api";

import { CreateWorkspaceForm } from "./create-workspace-form";
import { WorkspacesSection } from "./workspaces-section";

export function WorkspacesPage() {
  const { data, isLoading, isError, error } = useWorkspaces();

  return (
    <QueryWrapper
      isLoading={isLoading}
      error={isError ? (error as Error) : null}
      data={data}
      isEmpty={(arr) => arr.length === 0}
      renderEmpty={
        <ContentSection title="Workspaces" subtitle="Create, rename and delete your workspaces.">
          <CreateWorkspaceForm />

          <EmptyState
            title="No workspaces yet."
            description="Create your first workspace to get started."
          />
        </ContentSection>
      }
    >
      {(workspaces) => (
        <ContentSection title="Workspaces" subtitle="Create, rename and delete your workspaces.">
          <CreateWorkspaceForm />

          <WorkspacesSection workspaces={workspaces} />
        </ContentSection>
      )}
    </QueryWrapper>
  );
}
