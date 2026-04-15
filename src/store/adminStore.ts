import { create } from "zustand";
import { MOCK_ALL_USERS } from "@/lib/mockData";

type KycStatus = "pending" | "approved" | "rejected";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "freelancer" | "admin";
  kycStatus: KycStatus;
  walletBalance: number;
}

interface AdminState {
  users: AdminUser[];
  updateKycStatus: (userId: string, status: KycStatus) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  users: MOCK_ALL_USERS,

  updateKycStatus: (userId, status) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === userId ? { ...u, kycStatus: status } : u,
      ),
    })),
}));
