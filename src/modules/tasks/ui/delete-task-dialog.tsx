"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@app/components/ui";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskName: string;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export function DeleteTaskDialog({ open, onOpenChange, taskName, onConfirm, isDeleting }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete task</DialogTitle>

          <DialogDescription>
            Are you sure you want to delete <strong>{taskName}</strong>? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={onConfirm}
            loading={isDeleting}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
