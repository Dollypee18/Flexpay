import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/userService";

export function useCurrentUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchCurrentUser(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 10,
  });
}
