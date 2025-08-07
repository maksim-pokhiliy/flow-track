import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const inputVariants = cva(
  "w-full border-2 rounded-md text-base px-4 py-2 bg-background outline-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-input focus:border-ring/30",
        error: "border-destructive focus:color-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">,
    VariantProps<typeof inputVariants> {
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          inputVariants({
            variant: error ? "error" : "default",
          }),
          className,
        )}
        aria-invalid={error}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";

export { Input, inputVariants };
