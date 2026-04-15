import { User } from "@/types";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login failed.");
  }

  return data;
}

export async function registerUser(payload: {
  name: string;
  email: string;
  password: string;
}): Promise<{ message: string }> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Registration failed.");
  }

  return data;
}
