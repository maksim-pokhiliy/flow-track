import * as React from "react";

import { Input } from "@app/components/ui";

import { useFormField } from "./form-context";
import { FormLabel } from "./form-label";
import { FormDescription, FormMessage } from "./form-message";

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
