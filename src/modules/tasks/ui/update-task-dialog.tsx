"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FormModal } from "@app/components/flows";
import { Stack } from "@app/components/layout";
import { FormField, FormInput, FormItem, FormLabel } from "@app/components/ui";

import { TaskDTO, UpdateTaskInput, updateTaskSchema } from "../model";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: TaskDTO | null;
  onSubmit: (input: UpdateTaskInput) => void;
  isSubmitting?: boolean;
};

export function UpdateTaskDialog({ open, onOpenChange, task, onSubmit, isSubmitting }: Props) {
  const form = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema),
    defaultValues: {
      name: task?.name ?? "",
      description: task?.description ?? "",
    },
  });

  useEffect(() => {
    if (open && task) {
      form.reset({
        name: task.name,
        description: task.description ?? "",
      });
    }
  }, [open, task, form]);

  const handleSubmit = (values: UpdateTaskInput) => {
    const changes: UpdateTaskInput = {};

    if (values.name !== task?.name) {
      changes.name = values.name;
    }

    if (values.description !== task?.description) {
      changes.description = values.description ?? null;
    }

    if (Object.keys(changes).length > 0) {
      onSubmit(changes);
    }
  };

  return (
    <FormModal<UpdateTaskInput>
      open={open}
      onOpenChange={onOpenChange}
      title="Edit task"
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitText="Save"
    >
      {(f) => (
        <Stack spacing={4}>
          <FormField
            control={f.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Task name</FormLabel>

                <FormInput placeholder="Task name" {...field} disabled={isSubmitting} />
              </FormItem>
            )}
          />

          <FormField
            control={f.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>

                <FormInput
                  placeholder="Description (optional)"
                  {...field}
                  value={field.value ?? ""}
                  disabled={isSubmitting}
                />
              </FormItem>
            )}
          />
        </Stack>
      )}
    </FormModal>
  );
}
