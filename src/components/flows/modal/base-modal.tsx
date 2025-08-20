"use client";

import * as React from "react";

import { Stack } from "@app/components/layout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@app/components/ui";

type ModalSize = "xs" | "sm" | "md" | "lg";

export type BaseModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  disableBackdropClose?: boolean;
  disableEscapeKeyDown?: boolean;
  size?: ModalSize;
  contentClassName?: string;
};

const widthBySize: Record<ModalSize, string> = {
  xs: "sm:max-w-xs",
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-xl",
};

export function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true,
  disableBackdropClose = false,
  disableEscapeKeyDown = false,
  size = "md",
  contentClassName,
}: BaseModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={showCloseButton}
        className={`${widthBySize[size]} ${contentClassName ?? ""}`}
        onInteractOutside={disableBackdropClose ? (e) => e.preventDefault() : undefined}
        onEscapeKeyDown={disableEscapeKeyDown ? (e) => e.preventDefault() : undefined}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>

          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>

        <Stack spacing={4}>{children}</Stack>
      </DialogContent>
    </Dialog>
  );
}
