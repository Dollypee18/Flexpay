import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  clearAuth: () => void;
}

// Rehydrate from localStorage before store is created
function getInitialState(): Pick<
  AuthState,
  "user" | "token" | "isAuthenticated"
> {
  if (typeof window === "undefined") {
    return { user: null, token: null, isAuthenticated: false };
  }
  try {
    const token = localStorage.getItem("flexpay_token");
    const userRaw = localStorage.getItem("flexpay_user");
    if (token && userRaw) {
      return { user: JSON.parse(userRaw), token, isAuthenticated: true };
    }
  } catch {
    localStorage.removeItem("flexpay_token");
    localStorage.removeItem("flexpay_user");
  }
  return { user: null, token: null, isAuthenticated: false };
}

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialState(),

  setAuth: (user, token) => {
    localStorage.setItem("flexpay_token", token);
    localStorage.setItem("flexpay_user", JSON.stringify(user));
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: () => {
    localStorage.removeItem("flexpay_token");
    localStorage.removeItem("flexpay_user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
