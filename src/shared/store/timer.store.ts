import { create } from "zustand";

import { TimeEntryDTO } from "@app/modules/timer/model";

interface TimerContext {
  workspace: TimeEntryDTO["workspace"];
  project: TimeEntryDTO["project"];
  task: TimeEntryDTO["task"];
}

interface TimerStore {
  startedAt: Date | null;
  elapsed: number;
  context: TimerContext;

  setContext: (context: Partial<TimerContext>) => void;
  syncWithActiveTimer: (timer: TimeEntryDTO) => void;
  clear: () => void;
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
      workspace: null,
      project: null,
      task: null,
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
          workspace: timer.workspace ?? null,
          project: timer.project ?? null,
          task: timer.task ?? null,
        },
      });
    },

    clear: () => {
      stopInterval();

      set({
        startedAt: null,
        elapsed: 0,
        context: {
          workspace: null,
          project: null,
          task: null,
        },
      });
    },
  };
});
