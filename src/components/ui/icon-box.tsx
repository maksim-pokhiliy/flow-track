import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@app/lib/utils";

const iconBoxVariants = cva("flex items-center justify-center rounded-lg", {
  variants: {
    size: {
      sm: "h-8 w-8 text-lg",
      md: "h-10 w-10 text-xl",
      lg: "h-12 w-12 text-2xl",
      xl: "h-14 w-14 text-3xl",
    },
    variant: {
      default: "bg-primary/10 text-primary",
      gradient: "bg-gradient-brand text-white",
      "pink-rose": "bg-gradient-pink-rose text-white",
      "blue-cyan": "bg-gradient-blue-cyan text-white",
      "purple-indigo": "bg-gradient-purple-indigo text-white",
    },
  },
  defaultVariants: {
    size: "lg",
    variant: "default",
  },
});

interface IconBoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof iconBoxVariants> {}

export function IconBox({ className, size, variant, ...props }: IconBoxProps) {
  return <div className={cn(iconBoxVariants({ size, variant }), className)} {...props} />;
}

export { iconBoxVariants };
