import * as React from "react";

import { Typography } from "@app/components/ui/typography";
import { cn } from "@app/shared/lib";

import { useFormField } from "./form-context";

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <Typography
      ref={ref}
      id={formDescriptionId}
      variant="caption"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
});

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <Typography
      ref={ref}
      id={formMessageId}
      variant="caption"
      className={cn("text-destructive", className)}
      {...props}
    >
      {body}
    </Typography>
  );
});

FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";
