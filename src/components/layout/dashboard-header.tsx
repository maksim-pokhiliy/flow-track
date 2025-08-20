"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container, Logo, Stack, WorkspaceSelector } from "@app/components/layout";
import { Button } from "@app/components/ui";
import { useWorkspaces } from "@app/modules/workspaces/api";
import { useWorkspaceStore } from "@app/shared/store";

export function DashboardHeader() {
  const pathname = usePathname();
  const { data: workspaces = [] } = useWorkspaces();
  const { currentWorkspaceId, setCurrentWorkspace } = useWorkspaceStore();

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/timer", label: "Timer" },
    { href: "/analytics", label: "Analytics" },
  ];

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Stack className="h-14" direction="row" align="center" justify="between">
          <Stack direction="row" justify="between" align="center" className="w-full">
            <Stack spacing={4} direction="row" align="center">
              <Logo href="/workspaces" />

              <Stack as="nav" spacing={2} direction="row">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    size="sm"
                    asChild
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}
              </Stack>
            </Stack>

            {workspaces.length > 0 && (
              <WorkspaceSelector
                workspaces={workspaces}
                currentWorkspaceId={currentWorkspaceId}
                onWorkspaceChange={setCurrentWorkspace}
              />
            )}
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
