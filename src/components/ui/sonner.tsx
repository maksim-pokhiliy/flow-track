"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:bg-destructive group-[.toaster]:text-destructive-foreground group-[.toaster]:border-destructive",
          success:
            "group-[.toaster]:bg-green-500 dark:group-[.toaster]:bg-green-600 group-[.toaster]:text-white group-[.toaster]:border-green-500",
          warning:
            "group-[.toaster]:bg-amber-500 dark:group-[.toaster]:bg-amber-600 group-[.toaster]:text-white group-[.toaster]:border-amber-500",
          info: "group-[.toaster]:bg-blue-500 dark:group-[.toaster]:bg-blue-600 group-[.toaster]:text-white group-[.toaster]:border-blue-500",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
