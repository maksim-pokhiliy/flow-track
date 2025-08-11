"use client";

export const qk = {
  workspaces: (wsId?: string) => (wsId ? ["workspaces", wsId] : ["workspaces"]),
  invitations: (wsId?: string) => (wsId ? ["invitations", wsId] : ["invitations"]),
};
