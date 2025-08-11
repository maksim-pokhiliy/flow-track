"use client";

import * as React from "react";

import { useFormField } from "@app/components/ui";
import { cn } from "@app/shared/lib";

export const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();

  return (
    <label
      ref={ref}
      className={cn("text-sm font-medium", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});

FormLabel.displayName = "FormLabel";
