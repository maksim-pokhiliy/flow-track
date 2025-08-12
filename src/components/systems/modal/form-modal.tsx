// src/components/systems/modal/form-modal.tsx
"use client";

import * as React from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

import { Stack } from "@app/components/layout";
import { Alert, AlertDescription, AlertTitle, Button, Form } from "@app/components/ui";

import { BaseModal, BaseModalProps } from "./base-modal";

export type FormModalProps<TValues extends FieldValues> = Omit<
  BaseModalProps,
  "children" | "disableBackdropClose" | "disableEscapeKeyDown"
> & {
  form: UseFormReturn<TValues>;
  onSubmit: (values: TValues) => void | Promise<void>;
  children: (form: UseFormReturn<TValues>) => React.ReactNode;
  isSubmitting?: boolean;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  error?: string | null;
  hideActions?: boolean;
  extraActions?: React.ReactNode;
};

export function FormModal<TValues extends FieldValues>({
  form,
  onSubmit,
  children,
  isSubmitting,
  submitText = "Save",
  cancelText = "Cancel",
  submitDisabled = false,
  error,
  hideActions = false,
  extraActions,
  open,
  onOpenChange,
  title,
  description,
  showCloseButton,
  size = "md",
  contentClassName,
}: FormModalProps<TValues>) {
  const submitting = isSubmitting ?? form.formState.isSubmitting;

  const handleSubmit = form.handleSubmit(async (values) => {
    await onSubmit(values as TValues);
  });

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      showCloseButton={showCloseButton}
      size={size}
      contentClassName={contentClassName}
      disableBackdropClose={submitting}
      disableEscapeKeyDown={submitting}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={4}>
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>

                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            {children(form)}
          </Stack>

          {hideActions ? null : (
            <Stack direction="row" align="center" justify="end" spacing={4} className="mt-4">
              {extraActions}

              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                {cancelText}
              </Button>

              <Button
                type="submit"
                loading={submitting}
                loadingText="Saving..."
                disabled={submitDisabled || submitting}
              >
                {submitText}
              </Button>
            </Stack>
          )}
        </form>
      </Form>
    </BaseModal>
  );
}
