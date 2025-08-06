import { cn } from "@app/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

export function Container({ className, size = "lg", ...props }: ContainerProps) {
  const sizes = {
    sm: "max-w-2xl",
    md: "max-w-4xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <div
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8 z-1 relative", sizes[size], className)}
      {...props}
    />
  );
}
