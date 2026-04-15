"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";

export default function AuthInitializer() {
  const { setAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) return;

    const token = localStorage.getItem("flexpay_token");
    const userRaw = localStorage.getItem("flexpay_user");

    if (token && userRaw) {
      try {
        const user = JSON.parse(userRaw);
        setAuth(user, token);
      } catch {
        localStorage.removeItem("flexpay_token");
        localStorage.removeItem("flexpay_user");
      }
    }
  }, [isAuthenticated, setAuth]);

  return null;
}
