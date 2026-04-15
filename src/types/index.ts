export type UserRole = "freelancer" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  kycStatus: "pending" | "approved" | "rejected";
  walletBalance: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  currency: string;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "overdue";
  createdAt: string;
  userId: string;
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  status: "completed" | "pending" | "failed";
  description: string;
  createdAt: string;
  userId: string;
}

export interface OnboardingData {
  // Step 1 — Personal
  fullName: string;
  phone: string;
  country: string;
  // Step 2 — Business
  businessName: string;
  businessType: string;
  website: string;
  // Step 3 — ID Upload
  idType: string;
  idNumber: string;
  // Step 4 — Review
}
