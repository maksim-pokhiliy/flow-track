"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

import { Stack } from "@app/components/layout";
import { Button, Form, FormField, FormInput } from "@app/components/ui";

import { useCreateTask } from "../api";
import { type CreateTaskInput, createTaskSchema } from "../model";

type Props = {
  workspaceId: string;
  projectId: string;
};

export function CreateTaskForm({ workspaceId, projectId }: Props) {
  const { mutate: createTask, isPending } = useCreateTask();

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (input: CreateTaskInput) => {
    createTask(
      { workspaceId, projectId, input },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={3}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormInput placeholder="Task name" {...field} disabled={isPending} />
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInput
                placeholder="Description (optional)"
                {...field}
                disabled={isPending}
                className="flex-1"
              />
            )}
          />

          <Button type="submit" loading={isPending} loadingText="Creating...">
            <Plus className="h-4 w-4" />
            Add task
          </Button>
        </Stack>
      </form>
    </Form>
  );
}
