export interface UserCreate {
  name: string;
  email: string;
  password: string;
  defaultHourlyRate?: number;
  currency?: string;
}

export interface UserPublicData {
  id: string;
  name: string;
  email: string;
  defaultHourlyRate: number;
  currency: string;
  createdAt: Date;
}
