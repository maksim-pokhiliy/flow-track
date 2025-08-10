"use client";

import { Container, Stack } from "@app/components/ui";
import { Section } from "@app/components/ui/section";

import { CreateWorkspaceForm } from "./create-workspace-form";
import { WorkspacesSection } from "./workspaces-section";

export function WorkspacesPage() {
  return (
    <Stack direction="column" className="py-8">
      <Container>
        <Section title="Workspaces" description="Create, rename and delete your workspaces.">
          <CreateWorkspaceForm />

          <WorkspacesSection />
        </Section>
      </Container>
    </Stack>
  );
}
