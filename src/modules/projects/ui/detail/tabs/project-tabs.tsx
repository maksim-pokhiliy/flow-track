"use client";

import { Role } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/components/ui";
import { DEFAULT_PROJECT_TAB, ProjectDTO, ProjectTab } from "@app/modules/projects/model";

import { ProjectSettingsTab } from "./project-settings-tab";
import { ProjectTasksTab } from "./project-tasks-tab";

type Props = {
  project: ProjectDTO;
  workspaceId: string;
  userRole: Role;
};

const TABS_CONFIG = [
  {
    value: "tasks" as const,
    label: "Tasks",
  },
  {
    value: "settings" as const,
    label: "Settings",
  },
] as const;

export function ProjectTabs({ project, workspaceId, userRole }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = (searchParams.get("tab") as ProjectTab) ?? DEFAULT_PROJECT_TAB;

  const handleTabChange = (value: string) => {
    const url = new URL(window.location.href);

    url.searchParams.set("tab", value);
    router.push(url.pathname + url.search);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList>
        {TABS_CONFIG.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="tasks" className="mt-6">
        <ProjectTasksTab projectId={project.id} workspaceId={workspaceId} />
      </TabsContent>

      <TabsContent value="settings" className="mt-6">
        <ProjectSettingsTab
          projectId={project.id}
          workspaceId={workspaceId}
          userRole={userRole}
          project={project}
        />
      </TabsContent>
    </Tabs>
  );
}
