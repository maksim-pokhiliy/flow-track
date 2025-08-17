"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Container, Logo, Stack } from "@app/components/layout";
import { Button } from "@app/components/ui";

export function DashboardHeader() {
  const params = useParams();
  const pathname = usePathname();
  const workspaceId = params["workspaceId"];

  const navItems = workspaceId
    ? [
        { href: `/workspaces/${workspaceId}/projects`, label: "Projects" },
        { href: `/workspaces/${workspaceId}/timer`, label: "Timer" },
        { href: `/workspaces/${workspaceId}/analytics`, label: "Analytics" },
      ]
    : [];

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <Stack className="h-14" direction="row" align="center" justify="between">
          <Stack spacing={12} direction="row" align="center">
            <Logo href="/workspaces" />

            {workspaceId && (
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
            )}
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}
