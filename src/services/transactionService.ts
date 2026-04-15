import { Transaction } from "@/types";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";

export async function fetchTransactions(
  userId: string,
): Promise<Transaction[]> {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_TRANSACTIONS.filter((txn) => txn.userId === userId);
}
