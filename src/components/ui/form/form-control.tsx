"use client";

import * as React from "react";

import { useFormField } from "./form-context";

export const FormControl = React.forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
        aria-invalid={!!error}
        {...props}
      />
    );
  },
);

FormControl.displayName = "FormControl";
