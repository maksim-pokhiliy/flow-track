"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Stack } from "@app/components/layout";
import { Button, Form, FormField, FormInput } from "@app/components/ui";

import { useCreateProject } from "../api";
import { type CreateProjectInput, createProjectSchema } from "../model";

type Props = {
  workspaceId: string;
};

export function CreateProjectForm({ workspaceId }: Props) {
  const { mutate: createProject, isPending } = useCreateProject();

  const form = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (input: CreateProjectInput) => {
    createProject(
      { workspaceId, input },
      {
        onSuccess: () => {
          form.reset({ name: "" });
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack spacing={4} direction="row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput placeholder="Project name" {...field} disabled={isPending} />
            )}
          />

          <Button type="submit" loading={isPending} loadingText="Creating...">
            Create project
          </Button>
        </Stack>
      </form>
    </Form>
  );
}
