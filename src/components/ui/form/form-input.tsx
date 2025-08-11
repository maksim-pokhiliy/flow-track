"use client";

import * as React from "react";

import { FormDescription, FormLabel, FormMessage, Input, useFormField } from "@app/components/ui";

export const FormInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<typeof Input> & {
    label?: string;
    description?: string;
  }
>(({ label, description, className, ...props }, ref) => {
  const { error } = useFormField();

  return (
    <div className="space-y-1">
      {label && <FormLabel>{label}</FormLabel>}
      <Input ref={ref} className={className} aria-invalid={!!error} {...props} />
      {description && !error && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </div>
  );
});

FormInput.displayName = "FormInput";
