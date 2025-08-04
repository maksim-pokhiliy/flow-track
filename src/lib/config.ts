export const APP_CONFIG = {
  name: "Chronos",
  description: "Beautiful time tracking with projects, tasks and invoices",

  auth: {
    sessionMaxAge: 30 * 24 * 60 * 60,
    jwtMaxAge: 30 * 24 * 60 * 60,
  },

  ui: {
    toastDuration: 4000,
  },

  defaults: {
    hourlyRate: 50,
    currency: "USD",
    projectColor: "#3B82F6",
  },

  validation: {
    password: {
      minLength: 6,
    },
    name: {
      minLength: 2,
    },
    hourlyRate: {
      min: 0,
      max: 10000,
    },
  },
} as const;

export type AppConfig = typeof APP_CONFIG;
