export interface LoginCredentials {
  email: string;
  password: string;
  remember: boolean;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "EMPLOYEE" | "HR" | "ADMIN";
}
