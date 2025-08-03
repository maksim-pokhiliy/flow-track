import { RegisterData } from "../types/auth.types";

export async function registerUser(data: RegisterData) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.error ?? "Registration failed");
  }

  return response.json();
}
