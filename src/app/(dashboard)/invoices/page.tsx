"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Toast from "@/components/ui/Toast";
import FilterTabs from "@/components/ui/FilterTabs";
import InvoiceForm from "@/components/invoices/InvoiceForm";
import InvoiceActions from "@/components/invoices/InvoiceActions";
import { useInvoiceStore } from "@/store/invoiceStore";
import { formatCurrency, formatDate } from "@/lib/format";
import { Invoice } from "@/types";
import SearchInput from "@/components/ui/SearchInput";
import { useSearch } from "@/hooks/useSearch";

type FilterValue = "all" | "pending" | "paid" | "overdue";

export default function InvoicesPage() {
  const { invoices, addInvoice } = useInvoiceStore();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const {
    query,
    setQuery,
    results: searched,
  } = useSearch(invoices, ["clientName", "clientEmail", "description"]);

  const filtered = (query.trim() ? searched : invoices).filter(
    (inv) => filter === "all" || inv.status === filter,
  );
  const tabs = [
    { label: "All", value: "all", count: invoices.length },
    {
      label: "Pending",
      value: "pending",
      count: invoices.filter((i) => i.status === "pending").length,
    },
    {
      label: "Paid",
      value: "paid",
      count: invoices.filter((i) => i.status === "paid").length,
    },
    {
      label: "Overdue",
      value: "overdue",
      count: invoices.filter((i) => i.status === "overdue").length,
    },
  ];

  function handleInvoiceCreated(invoice: Invoice) {
    addInvoice(invoice);
    setShowModal(false);
    setToast({
      message: `Invoice for ${invoice.clientName} created.`,
      type: "success",
    });
  }

  return (
    <DashboardLayout>
      <div style={{ padding: "32px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#F0F0F0",
                marginBottom: "4px",
              }}
            >
              Invoices
            </h1>
            <p style={{ fontSize: "13px", color: "#888888" }}>
              {filtered.length} of {invoices.length} shown
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search invoices..."
            />
            <Button onClick={() => setShowModal(true)}>New Invoice</Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ marginBottom: "16px" }}>
          <FilterTabs
            tabs={tabs}
            active={filter}
            onChange={(v) => setFilter(v as FilterValue)}
          />
        </div>

        {/* Table */}
        <div
          style={{
            backgroundColor: "#161616",
            border: "1px solid #2A2A2A",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              padding: "12px 20px",
              borderBottom: "1px solid #2A2A2A",
            }}
          >
            {["Client", "Amount", "Status", "Due Date", "Action"].map((h) => (
              <p
                key={h}
                style={{
                  fontSize: "11px",
                  color: "#555555",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  fontWeight: 500,
                }}
              >
                {h}
              </p>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p
              style={{
                padding: "40px",
                textAlign: "center",
                color: "#555555",
                fontSize: "13px",
              }}
            >
              No invoices found.
            </p>
          ) : (
            filtered.map((inv, index) => (
              <div
                key={inv.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  padding: "14px 20px",
                  borderBottom:
                    index < filtered.length - 1 ? "1px solid #2A2A2A" : "none",
                  alignItems: "center",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#F0F0F0",
                      marginBottom: "2px",
                    }}
                  >
                    {inv.clientName}
                  </p>
                  <p style={{ fontSize: "11px", color: "#555555" }}>
                    {inv.clientEmail}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#F0F0F0",
                    fontFamily: "DM Mono, monospace",
                  }}
                >
                  {formatCurrency(inv.amount, inv.currency)}
                </p>
                <Badge variant={inv.status} />
                <p style={{ fontSize: "12px", color: "#888888" }}>
                  {formatDate(inv.dueDate)}
                </p>
                <InvoiceActions
                  invoice={inv}
                  onSuccess={(msg) =>
                    setToast({ message: msg, type: "success" })
                  }
                  onError={(msg) => setToast({ message: msg, type: "error" })}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title="New Invoice"
        size="lg"
      >
        <InvoiceForm
          onSubmit={handleInvoiceCreated}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </DashboardLayout>
  );
}
