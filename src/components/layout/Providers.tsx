"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/queryClient";
import RouteGuard from "./RouteGuard";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteGuard>{children}</RouteGuard>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
