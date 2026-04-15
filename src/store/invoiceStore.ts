import { create } from "zustand";
import { Invoice } from "@/types";
import { MOCK_INVOICES } from "@/lib/mockData";

interface InvoiceState {
  invoices: Invoice[];
  addInvoice: (invoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  invoices: MOCK_INVOICES,

  addInvoice: (invoice) =>
    set((state) => ({ invoices: [invoice, ...state.invoices] })),

  updateInvoiceStatus: (id, status) =>
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.id === id ? { ...inv, status } : inv,
      ),
    })),
}));
