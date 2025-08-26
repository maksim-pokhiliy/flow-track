import { create } from "zustand";

interface TimerContext {
  workspaceId: string | null;
  projectId: string | null;
  taskId: string | null;
}

interface TimerStore {
  startedAt: Date | null;
  elapsed: number;
  context: TimerContext;

  setStartedAt: (date: Date | null) => void;

  setContext: (context: Partial<TimerContext>) => void;

  clear: () => void;

  syncWithActiveTimer: (timer: {
    startedAt: Date | string;
    workspaceId?: string | null;
    projectId?: string | null;
    taskId?: string | null;
  }) => void;
}

export const useTimerStore = create<TimerStore>((set, get) => {
  let interval: NodeJS.Timeout | null = null;

  const updateElapsed = () => {
    const startedAt = get().startedAt;

    if (startedAt) {
      const elapsed = Math.floor((Date.now() - startedAt.getTime()) / 1000);

      set({ elapsed });
    }
  };

  const startInterval = () => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(updateElapsed, 1000);
    updateElapsed();
  };

  const stopInterval = () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  };

  return {
    startedAt: null,
    elapsed: 0,
    context: {
      workspaceId: null,
      projectId: null,
      taskId: null,
    },

    setStartedAt: (date) => {
      stopInterval();

      if (date) {
        startInterval();
        set({ startedAt: date, elapsed: 0 });
      } else {
        set({ startedAt: null, elapsed: 0 });
      }
    },

    setContext: (newContext) => {
      set((state) => ({
        context: {
          ...state.context,
          ...newContext,
        },
      }));
    },

    syncWithActiveTimer: (timer) => {
      const startedAt =
        typeof timer.startedAt === "string" ? new Date(timer.startedAt) : timer.startedAt;

      const elapsed = Math.floor((Date.now() - startedAt.getTime()) / 1000);

      stopInterval();
      startInterval();

      set({
        startedAt,
        elapsed,
        context: {
          workspaceId: timer.workspaceId ?? null,
          projectId: timer.projectId ?? null,
          taskId: timer.taskId ?? null,
        },
      });
    },

    clear: () => {
      stopInterval();

      set({
        startedAt: null,
        elapsed: 0,
        context: {
          workspaceId: null,
          projectId: null,
          taskId: null,
        },
      });
    },
  };
});
