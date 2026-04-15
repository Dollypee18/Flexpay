"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Invoice } from "@/types";
import { simulatePayment } from "@/services/paymentService";
import { useInvoiceStore } from "@/store/invoiceStore";
import { useTransactionStore } from "@/store/transactionStore";
import { useWalletStore } from "@/store/walletStore";

interface InvoiceActionsProps {
  invoice: Invoice;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export default function InvoiceActions({
  invoice,
  onSuccess,
  onError,
}: InvoiceActionsProps) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const { updateInvoiceStatus } = useInvoiceStore();
  const { addTransaction } = useTransactionStore();
  const { credit } = useWalletStore();

  if (invoice.status === "paid") {
    return <span style={{ fontSize: "12px", color: "#555555" }}>—</span>;
  }

  async function handleConfirm() {
    setLoading(true);

    // Optimistic update — mark as paid immediately
    updateInvoiceStatus(invoice.id, "paid");

    const result = await simulatePayment(invoice);

    if (!result.success) {
      // Rollback on failure
      updateInvoiceStatus(invoice.id, invoice.status);
      setLoading(false);
      setConfirming(false);
      onError(result.error ?? "Payment failed.");
      return;
    }

    // Commit — add transaction and credit wallet
    if (result.transaction) {
      addTransaction(result.transaction);
      credit(invoice.amount);
    }

    setLoading(false);
    setConfirming(false);
    onSuccess(
      `Payment of $${invoice.amount} received from ${invoice.clientName}.`,
    );
  }

  if (confirming) {
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        <Button size="sm" loading={loading} onClick={handleConfirm}>
          Confirm
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setConfirming(false)}
          disabled={loading}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button size="sm" variant="secondary" onClick={() => setConfirming(true)}>
      Mark Paid
    </Button>
  );
}
