import { create } from "zustand";
import { Transaction } from "@/types";
import { MOCK_TRANSACTIONS } from "@/lib/mockData";

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: MOCK_TRANSACTIONS,

  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    })),
}));
