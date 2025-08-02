import { InvoiceStatus, ProjectStatus, TaskStatus } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  name: string;
  defaultHourlyRate: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  color: string;
  hourlyRate?: number;
  client?: string;
  status: ProjectStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  projectId: string;
  name: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  isRunning: boolean;
  hourlyRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  userId: string;
  projectId: string;
  number: string;
  totalHours: number;
  totalAmount: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
