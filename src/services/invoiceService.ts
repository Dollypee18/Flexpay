import { Invoice } from "@/types";
import { MOCK_INVOICES } from "@/lib/mockData";

// Simulates a GET /invoices API call
export async function fetchInvoices(userId: string): Promise<Invoice[]> {
  await new Promise((res) => setTimeout(res, 500));
  return MOCK_INVOICES.filter((inv) => inv.userId === userId);
}

// Simulates a POST /invoices API call
export async function createInvoice(
  invoice: Omit<Invoice, "id" | "createdAt" | "status">,
): Promise<Invoice> {
  await new Promise((res) => setTimeout(res, 600));
  return {
    ...invoice,
    id: `inv_${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString().split("T")[0],
  };
}

// Simulates a PATCH /invoices/:id API call
export async function updateInvoice(
  id: string,
  updates: Partial<Invoice>,
): Promise<Invoice> {
  await new Promise((res) => setTimeout(res, 400));
  const invoice = MOCK_INVOICES.find((inv) => inv.id === id);
  if (!invoice) throw new Error("Invoice not found.");
  return { ...invoice, ...updates };
}
