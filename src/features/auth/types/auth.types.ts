export interface User {
  id: string;
  email: string;
  name: string;
  defaultHourlyRate: number;
  currency: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  defaultHourlyRate: number;
}

export interface AuthSession {
  user: User;
}
