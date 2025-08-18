"use client";

import { Role } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@app/components/ui";

import { DEFAULT_PROJECT_TAB, PROJECT_TABS, type ProjectTab } from "../../../model";

import { ProjectSettingsTab } from "./project-settings-tab";
import { ProjectTasksTab } from "./project-tasks-tab";

type Props = {
  projectId: string;
  workspaceId: string;
  userRole: Role;
};

const TABS_CONFIG = [
  {
    value: PROJECT_TABS.TASKS,
    label: "Tasks",
    component: ProjectTasksTab,
  },
  {
    value: PROJECT_TABS.SETTINGS,
    label: "Settings",
    component: ProjectSettingsTab,
  },
] as const;

export function ProjectTabs({ projectId, workspaceId, userRole }: Props) {
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

      {TABS_CONFIG.map((tab) => {
        const Component = tab.component;

        return (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            <Component projectId={projectId} workspaceId={workspaceId} userRole={userRole} />
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
