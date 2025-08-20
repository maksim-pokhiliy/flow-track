"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FormModal } from "@app/components/flows/modal/form-modal";
import { FormField, FormInput } from "@app/components/ui";

import { type UpdateProjectInput, updateProjectSchema } from "../../model";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  onSubmit: (input: UpdateProjectInput) => void;
  isSubmitting?: boolean;
};

export function UpdateProjectDialog({
  open,
  onOpenChange,
  projectName,
  onSubmit,
  isSubmitting,
}: Props) {
  const form = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema),
    defaultValues: { name: projectName },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: projectName });
    }
  }, [open, projectName, form]);

  const handleSubmit = (values: UpdateProjectInput) => {
    onSubmit(values);
  };

  return (
    <FormModal<UpdateProjectInput>
      open={open}
      onOpenChange={onOpenChange}
      title="Rename project"
      description="Give your project a new name"
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      submitText="Save"
    >
      {(f) => (
        <FormField
          control={f.control}
          name="name"
          render={({ field }) => (
            <FormInput placeholder="Project name" {...field} disabled={isSubmitting} />
          )}
        />
      )}
    </FormModal>
  );
}
