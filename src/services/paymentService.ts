import { Invoice, Transaction } from "@/types";

interface PaymentResult {
  success: boolean;
  transaction?: Transaction;
  error?: string;
}

export async function simulatePayment(
  invoice: Invoice,
): Promise<PaymentResult> {
  // Simulate network delay
  await new Promise((res) => setTimeout(res, 1000));

  // Simulate 95% success rate
  const success = Math.random() > 0.05;

  if (!success) {
    return { success: false, error: "Payment processing failed. Try again." };
  }

  const transaction: Transaction = {
    id: `txn_${Date.now()}`,
    type: "credit",
    amount: invoice.amount,
    status: "completed",
    description: `Payment from ${invoice.clientName}`,
    createdAt: new Date().toISOString().split("T")[0],
    userId: invoice.userId,
  };

  return { success: true, transaction };
}
