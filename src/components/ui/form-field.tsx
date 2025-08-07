import * as React from "react";

import { Input, type InputProps } from "./input";
import { Label } from "./label";
import { Stack } from "./stack";
import { Typography } from "./typography";

interface FormFieldProps extends Omit<InputProps, "error"> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  labelAction?: React.ReactNode;
}

const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, required, labelAction, className, id, ...props }, ref) => {
    const fieldId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    const ariaDescribedBy = React.useMemo(() => {
      if (error) return `${fieldId}-error`;

      if (hint) return `${fieldId}-hint`;

      return undefined;
    }, [error, hint, fieldId]);

    return (
      <Stack spacing={2} className={className}>
        {label && (
          <Stack direction="row" justify="between" align="center">
            <Label htmlFor={fieldId}>
              {label}
              {required && (
                <Typography as="span" variant="caption" className="text-destructive">
                  *
                </Typography>
              )}
            </Label>
            {labelAction}
          </Stack>
        )}

        <Input
          ref={ref}
          id={fieldId}
          error={!!error}
          aria-describedby={ariaDescribedBy}
          {...props}
        />

        {error && (
          <Typography
            id={`${fieldId}-error`}
            variant="caption"
            className="text-destructive"
            role="alert"
          >
            {error}
          </Typography>
        )}

        {hint && !error && (
          <Typography id={`${fieldId}-hint`} variant="caption" className="text-muted-foreground">
            {hint}
          </Typography>
        )}
      </Stack>
    );
  },
);

FormField.displayName = "FormField";

export { FormField };
