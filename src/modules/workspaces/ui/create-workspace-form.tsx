"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Stack } from "@app/components/layout";
import { Button, Form, FormField, FormInput } from "@app/components/ui";

import { useCreateWorkspace } from "../api";
import { CreateWorkspaceInput, createWorkspaceSchema } from "../model";

export function CreateWorkspaceForm() {
  const { mutate: createWs, isPending: isCreating } = useCreateWorkspace();

  const form = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (data: CreateWorkspaceInput) => {
    createWs(
      { name: data.name.trim() },
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
              <FormInput
                placeholder="Workspace name"
                {...field}
                onChange={(e) => field.onChange(e.target.value)}
              />
            )}
          />

          <Button type="submit" loading={isCreating} loadingText="Creating...">
            Create workspace
          </Button>
        </Stack>
      </form>
    </Form>
  );
}
