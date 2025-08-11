"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Stack } from "@app/components/layout";
import { Button, Form, FormField, FormInput } from "@app/components/ui";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/components/ui/dialog";

import { UpdateWorkspaceInput, updateWorkspaceSchema } from "../model";

type Props = {
  open: boolean;
  value: string;
  onValueChange: (v: string) => void;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  loading?: boolean;
};

export function RenameWorkspaceDialog({
  open,
  value,
  onValueChange,
  onOpenChange,
  onSubmit,
  loading,
}: Props) {
  const form = useForm<UpdateWorkspaceInput>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: { name: value ?? "" },
  });

  useEffect(() => {
    if (open) {
      form.reset({ name: value ?? "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, value]);

  const submit = () =>
    form.handleSubmit(() => {
      onSubmit();
    })();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename workspace</DialogTitle>

          <DialogDescription>Give your workspace a new name.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <Stack spacing={4}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormInput
                    placeholder="Workspace name"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      onValueChange(e.target.value);
                    }}
                  />
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>

                <Button type="submit" loading={loading} loadingText="Saving...">
                  Save
                </Button>
              </DialogFooter>
            </Stack>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
