"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Badge from "@/components/ui/Badge";
import FilterTabs from "@/components/ui/FilterTabs";
import SearchInput from "@/components/ui/SearchInput";
import { useTransactionStore } from "@/store/transactionStore";
import { formatCurrency, formatDate } from "@/lib/format";
import { useSearch } from "@/hooks/useSearch";

type FilterValue = "all" | "completed" | "pending" | "failed";
const PAGE_SIZE = 5;

export default function TransactionsPage() {
  const { transactions } = useTransactionStore();
  const [filter, setFilter] = useState<FilterValue>("all");
  const [page, setPage] = useState(1);
  const {
    query,
    setQuery,
    results: searched,
  } = useSearch(transactions, ["description"]);

  const filtered = (query.trim() ? searched : transactions).filter(
    (t) => filter === "all" || t.status === filter,
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const tabs = [
    { label: "All", value: "all", count: transactions.length },
    {
      label: "Completed",
      value: "completed",
      count: transactions.filter((t) => t.status === "completed").length,
    },
    {
      label: "Pending",
      value: "pending",
      count: transactions.filter((t) => t.status === "pending").length,
    },
    {
      label: "Failed",
      value: "failed",
      count: transactions.filter((t) => t.status === "failed").length,
    },
  ];

  function handleFilterChange(value: string) {
    setFilter(value as FilterValue);
    setPage(1);
  }

  return (
    <DashboardLayout>
      <div style={{ padding: "24px" }}>
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginBottom: "4px",
            }}
          >
            Transactions
          </h1>
          <p style={{ fontSize: "13px", color: "#888888" }}>
            {filtered.length} of {transactions.length} shown
          </p>
        </div>

        {/* Filter + Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <FilterTabs
            tabs={tabs}
            active={filter}
            onChange={handleFilterChange}
          />
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search transactions..."
          />
        </div>

        {/* Table */}
        <div
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch" as const,
          }}
        >
          <div
            style={{
              backgroundColor: "#161616",
              border: "1px solid #2A2A2A",
              borderRadius: "8px",
              overflow: "hidden",
              minWidth: "600px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                padding: "12px 20px",
                borderBottom: "1px solid #2A2A2A",
              }}
            >
              {["Description", "Amount", "Status", "Date"].map((h) => (
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

            {/* Rows */}
            {paginated.length === 0 ? (
              <p
                style={{
                  padding: "40px",
                  textAlign: "center",
                  color: "#555555",
                  fontSize: "13px",
                }}
              >
                No transactions found.
              </p>
            ) : (
              paginated.map((txn, index) => (
                <div
                  key={txn.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr",
                    padding: "14px 20px",
                    borderBottom:
                      index < paginated.length - 1
                        ? "1px solid #2A2A2A"
                        : "none",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        flexShrink: 0,
                        backgroundColor:
                          txn.type === "credit" ? "#00C89615" : "#FF4D4D15",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "12px",
                      }}
                    >
                      {txn.type === "credit" ? "↓" : "↑"}
                    </div>
                    <p style={{ fontSize: "13px", color: "#F0F0F0" }}>
                      {txn.description}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontFamily: "DM Mono, monospace",
                      color: txn.type === "credit" ? "#00C896" : "#FF4D4D",
                    }}
                  >
                    {txn.type === "credit" ? "+" : "-"}
                    {formatCurrency(txn.amount)}
                  </p>
                  <Badge variant={txn.status} />
                  <p style={{ fontSize: "12px", color: "#888888" }}>
                    {formatDate(txn.createdAt)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <p style={{ fontSize: "12px", color: "#555555" }}>
              Page {page} of {totalPages}
            </p>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "6px 14px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  color: page === 1 ? "#555555" : "#F0F0F0",
                }}
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "6px 14px",
                  fontSize: "12px",
                  borderRadius: "4px",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  backgroundColor: "#1E1E1E",
                  border: "1px solid #2A2A2A",
                  color: page === totalPages ? "#555555" : "#F0F0F0",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
