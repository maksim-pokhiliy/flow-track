import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WorkspaceStore {
  currentWorkspaceId: string;
  setCurrentWorkspace: (id?: string) => void;
  clearCurrentWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist(
    (set) => ({
      currentWorkspaceId: "",
      setCurrentWorkspace: (id) => set({ currentWorkspaceId: id }),
      clearCurrentWorkspace: () => set({ currentWorkspaceId: "" }),
    }),
    {
      name: "workspace-storage",
      partialize: (state) => ({ currentWorkspaceId: state.currentWorkspaceId }),
    },
  ),
);
