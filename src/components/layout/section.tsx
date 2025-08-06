import { cn } from "@app/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg";
}

export function Section({ className, spacing = "md", ...props }: SectionProps) {
  const spacings = {
    sm: "py-8 sm:py-12",
    md: "py-12 sm:py-16 lg:py-20",
    lg: "py-16 sm:py-20 lg:py-24",
  };

  return <section className={cn(spacings[spacing], className)} {...props} />;
}
