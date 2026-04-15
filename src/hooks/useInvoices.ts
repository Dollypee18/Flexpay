import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchInvoices, createInvoice } from "@/services/invoiceService";
import { Invoice } from "@/types";

export function useInvoices(userId: string) {
  return useQuery({
    queryKey: ["invoices", userId],
    queryFn: () => fetchInvoices(userId),
    enabled: !!userId,
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvoice,
    onSuccess: (newInvoice) => {
      // Add to cache without refetching
      queryClient.setQueryData(
        ["invoices", newInvoice.userId],
        (old: Invoice[] | undefined) => [newInvoice, ...(old ?? [])],
      );
    },
  });
}
