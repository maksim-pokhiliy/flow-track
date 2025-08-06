"use client";

import { cn } from "@app/lib/utils";

interface BackgroundPatternProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "dots" | "grid" | "gradient-mesh";
  opacity?: number;
}

const patterns = {
  dots: (
    <svg className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="dot-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dot-pattern)`} />
    </svg>
  ),
  grid: (
    <svg className="absolute inset-0 h-full w-full">
      <defs>
        <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  ),
  "gradient-mesh": (
    <div className="absolute inset-0">
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/25 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
    </div>
  ),
};

export function BackgroundPattern({
  variant = "dots",
  opacity = 0.4,
  className,
  ...props
}: BackgroundPatternProps) {
  return (
    <div
      className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}
      style={{ opacity }}
      {...props}
    >
      <div className="absolute inset-0 text-foreground/10">{patterns[variant]}</div>
    </div>
  );
}
