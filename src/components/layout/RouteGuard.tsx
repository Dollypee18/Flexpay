"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const publicRoutes = ["/login", "/signup"];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

    if (!isAuthenticated && !isPublic) {
      router.push("/login");
    }

    if (isAuthenticated && isPublic) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, pathname, router]);

  return <>{children}</>;
}
