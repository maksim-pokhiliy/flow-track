export enum QueryKeys {
  WORKSPACES = "workspaces",
  WORKSPACE = "workspace",
  PROJECTS = "projects",
  PROJECT = "project",
  TASKS = "tasks",
  TASK = "task",
  TIMER = "timer",
  TIMER_ACTIVE = "timer:active",
  TIME_ENTRIES = "time-entries",
  TIME_ENTRY = "time-entry",
  INVITATIONS = "invitations",
  INVITATION = "invitation",
  MEMBERS = "members",
  MEMBER = "member",
  AUTH_SESSION = "auth:session",
}

export enum MutationKeys {
  // Workspace mutations
  WORKSPACE_CREATE = "workspace:create",
  WORKSPACE_UPDATE = "workspace:update",
  WORKSPACE_DELETE = "workspace:delete",

  // Project mutations
  PROJECT_CREATE = "project:create",
  PROJECT_UPDATE = "project:update",
  PROJECT_DELETE = "project:delete",

  // Task mutations
  TASK_CREATE = "task:create",
  TASK_UPDATE = "task:update",
  TASK_DELETE = "task:delete",

  // Timer mutations
  TIMER_START = "timer:start",
  TIMER_STOP = "timer:stop",
  TIMER_UPDATE = "timer:update",
  TIMER_DELETE = "timer:delete",

  // Invitation mutations
  INVITATION_CREATE = "invitation:create",
  INVITATION_ACCEPT = "invitation:accept",
  INVITATION_REVOKE = "invitation:revoke",

  // Auth mutations
  AUTH_LOGIN = "auth:login",
  AUTH_LOGOUT = "auth:logout",
  AUTH_REGISTER = "auth:register",
}
