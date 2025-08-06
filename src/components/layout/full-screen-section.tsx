import { cn } from "@app/lib/utils";

import { Stack } from "..";

interface FullScreenSectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

export function FullScreenSection({ className, children, ...props }: FullScreenSectionProps) {
  return (
    <Stack className={cn("min-h-screen", className)} {...props} justify="center">
      {children}
    </Stack>
  );
}
