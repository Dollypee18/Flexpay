import { create } from "zustand";
import { MOCK_USER } from "@/lib/mockData";

interface WalletState {
  balance: number;
  credit: (amount: number) => void;
  debit: (amount: number) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  balance: MOCK_USER.walletBalance,

  credit: (amount) => set((state) => ({ balance: state.balance + amount })),

  debit: (amount) =>
    set((state) => ({ balance: Math.max(0, state.balance - amount) })),
}));
