"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import StatsCardSkeleton from "@/components/dashboard/StatsCardSkeleton";
import TableSkeleton from "@/components/ui/TableSkeleton";
import ErrorState from "@/components/ui/ErrorState";
import { MOCK_INVOICES, MOCK_TRANSACTIONS } from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";
import { useAuth } from "@/hooks/useAuth";
import { useWalletStore } from "@/store/walletStore";
import dynamic from "next/dynamic";
const RecentActivity = dynamic(
  () => import("@/components/dashboard/RecentActivity"),
  { ssr: false },
);
export default function DashboardPage() {
  const { user } = useAuth();
  const { balance } = useWalletStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const totalInvoices = MOCK_INVOICES.length;
  const paidInvoices = MOCK_INVOICES.filter((i) => i.status === "paid").length;
  const pendingInvoices = MOCK_INVOICES.filter(
    (i) => i.status === "pending",
  ).length;
  const overdueInvoices = MOCK_INVOICES.filter(
    (i) => i.status === "overdue",
  ).length;
  const recentTransactions = MOCK_TRANSACTIONS.slice(0, 4);

  return (
    <DashboardLayout>
      <div style={{ padding: "32px" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginBottom: "4px",
            }}
          >
            {user ? `Good morning, ${user.name.split(" ")[0]}.` : "Dashboard"}
          </h1>
          <p style={{ fontSize: "13px", color: "#888888" }}>
            Here&apos;s what&apos;s happening with your account.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))
          ) : error ? (
            <div style={{ gridColumn: "1 / -1" }}>
              <ErrorState
                message="Failed to load stats."
                onRetry={() => {
                  setError(false);
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1200);
                }}
              />
            </div>
          ) : (
            <>
              <StatsCard
                label="Wallet Balance"
                value={formatCurrency(balance)}
                sub="Available balance"
                accent
              />
              <StatsCard
                label="Total Invoices"
                value={String(totalInvoices)}
                sub="All time"
              />
              <StatsCard
                label="Paid"
                value={String(paidInvoices)}
                sub="Completed"
              />
              <StatsCard
                label="Pending"
                value={String(pendingInvoices)}
                sub="Awaiting payment"
              />
              <StatsCard
                label="Overdue"
                value={String(overdueInvoices)}
                sub="Requires attention"
              />
            </>
          )}
        </div>

        {/* Recent Activity */}
        {loading ? (
          <TableSkeleton rows={4} columns={3} />
        ) : (
          <RecentActivity transactions={recentTransactions} />
        )}
      </div>
    </DashboardLayout>
  );
}
