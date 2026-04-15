import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "@/services/transactionService";

export function useTransactions(userId: string) {
  return useQuery({
    queryKey: ["transactions", userId],
    queryFn: () => fetchTransactions(userId),
    enabled: !!userId,
  });
}
