import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { user, token, isAuthenticated, setAuth, clearAuth } = useAuthStore();
  const router = useRouter();

  function logout() {
    clearAuth();
    router.push("/login");
  }

  return { user, token, isAuthenticated, setAuth, logout };
}
