"use client";

import { Role } from "@prisma/client";

import { Stack } from "@app/components/layout";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Typography,
} from "@app/components/ui";

type Props = {
  projectId: string;
  workspaceId: string;
  userRole: Role;
};

export function ProjectSettingsTab({ userRole }: Props) {
  return (
    <Stack spacing={6}>
      <Card>
        <CardHeader>
          <CardTitle>Hourly Rates</CardTitle>

          <CardDescription>Set default hourly rates for this project</CardDescription>
        </CardHeader>

        <CardContent>
          <Typography variant="body2" className="text-muted-foreground">
            Rate management coming soon...
          </Typography>
        </CardContent>
      </Card>

      {userRole === Role.OWNER && (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>

            <CardDescription>Irreversible actions for this project</CardDescription>
          </CardHeader>

          <CardContent>
            <Stack spacing={4}>
              <Stack direction="row" align="center" justify="between">
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Archive project</Typography>

                  <Typography variant="caption" className="text-muted-foreground">
                    Hide this project from active lists
                  </Typography>
                </Stack>

                <Button variant="outline" size="sm">
                  Archive
                </Button>
              </Stack>

              <Stack direction="row" align="center" justify="between">
                <Stack spacing={1}>
                  <Typography variant="subtitle2">Delete project</Typography>

                  <Typography variant="caption" className="text-muted-foreground">
                    Permanently delete this project and all its data
                  </Typography>
                </Stack>

                <Button variant="destructive" size="sm">
                  Delete
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Stack>
  );
}
