"use client";

import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
import { useDeleteProject, useUpdateProject } from "@app/modules/projects/api";
import { ProjectDTO } from "@app/modules/projects/model";

import { DeleteProjectDialog } from "../../list";

type Props = {
  projectId: string;
  workspaceId: string;
  userRole: Role;
  project: ProjectDTO;
};

export function ProjectSettingsTab({ projectId, workspaceId, userRole, project }: Props) {
  const router = useRouter();

  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleArchive = () => {
    updateProject({
      workspaceId,
      projectId,
      input: { isArchived: !project.isArchived },
    });
  };

  const handleDelete = () => {
    deleteProject(
      { workspaceId, projectId },
      {
        onSuccess: () => {
          router.push("/projects");
        },
      },
    );
  };

  return (
    <>
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
                    <Typography variant="subtitle2">
                      {project.isArchived ? "Restore project" : "Archive project"}
                    </Typography>

                    <Typography variant="caption" className="text-muted-foreground">
                      {project.isArchived
                        ? "Make this project active again"
                        : "Hide this project from active lists"}
                    </Typography>
                  </Stack>

                  <Button variant="outline" size="sm" onClick={handleArchive} loading={isUpdating}>
                    {project.isArchived ? "Restore" : "Archive"}
                  </Button>
                </Stack>

                <Stack direction="row" align="center" justify="between">
                  <Stack spacing={1}>
                    <Typography variant="subtitle2">Delete project</Typography>

                    <Typography variant="caption" className="text-muted-foreground">
                      Permanently delete this project and all its data
                    </Typography>
                  </Stack>

                  <Button variant="destructive" size="sm" onClick={() => setDeleteOpen(true)}>
                    Delete
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>

      <DeleteProjectDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        projectName={project.name}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
