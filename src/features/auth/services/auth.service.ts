import type { AuthUser, LoginCredentials } from "../types";

const AUTH_KEY = "hrms_auth";

const demoUser: AuthUser = {
  id: "demo-user",
  name: "Demo User",
  email: "demo@hrms.local",
  role: "ADMIN",
};

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  await new Promise((resolve) => window.setTimeout(resolve, 500));

  const email = credentials.email.trim().toLowerCase();

  if (!email || !credentials.password) {
    throw new Error("Please enter your work email and password.");
  }

  // Temporary frontend-only authentication until the backend is connected.
  const user = {
    ...demoUser,
    email,
    name: email.split("@")[0] || demoUser.name,
  };
  const storage = credentials.remember ? localStorage : sessionStorage;
  storage.setItem(AUTH_KEY, JSON.stringify(user));

  return user;
}

export function getCurrentUser(): AuthUser | null {
  const raw =
    localStorage.getItem(AUTH_KEY) ?? sessionStorage.getItem(AUTH_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    logout();
    return null;
  }
}

export function isAuthenticated() {
  return getCurrentUser() !== null;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(AUTH_KEY);
}
