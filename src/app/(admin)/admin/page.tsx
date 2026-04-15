"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserTable from "@/components/admin/UserTable";
import Badge from "@/components/ui/Badge";
import Toast from "@/components/ui/Toast";
import FilterTabs from "@/components/ui/FilterTabs";
import { useAdminStore } from "@/store/adminStore";
import { useInvoiceStore } from "@/store/invoiceStore";
import { useAuth } from "@/hooks/useAuth";
import { formatCurrency, formatDate } from "@/lib/format";

type UserFilter = "all" | "pending" | "approved" | "rejected";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { users } = useAdminStore();
  const { invoices } = useInvoiceStore();
  const [userFilter, setUserFilter] = useState<UserFilter>("all");
  const [toast, setToast] = useState<string | null>(null);

  // Block non-admins
  if (user && user.role !== "admin") {
    router.push("/dashboard");
    return null;
  }

  const filteredUsers =
    userFilter === "all"
      ? users
      : users.filter((u) => u.kycStatus === userFilter);

  const userTabs = [
    { label: "All", value: "all", count: users.length },
    {
      label: "Pending",
      value: "pending",
      count: users.filter((u) => u.kycStatus === "pending").length,
    },
    {
      label: "Approved",
      value: "approved",
      count: users.filter((u) => u.kycStatus === "approved").length,
    },
    {
      label: "Rejected",
      value: "rejected",
      count: users.filter((u) => u.kycStatus === "rejected").length,
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ padding: "32px" }}>
        {/* Header */}
        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginBottom: "4px",
            }}
          >
            Admin Panel
          </h1>
          <p style={{ fontSize: "13px", color: "#888888" }}>
            Manage users, KYC approvals and invoices.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          {[
            { label: "Total Users", value: users.length },
            {
              label: "Pending KYC",
              value: users.filter((u) => u.kycStatus === "pending").length,
            },
            { label: "Total Invoices", value: invoices.length },
            {
              label: "Paid Invoices",
              value: invoices.filter((i) => i.status === "paid").length,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                backgroundColor: "#161616",
                border: "1px solid #2A2A2A",
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  color: "#888888",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "8px",
                }}
              >
                {stat.label}
              </p>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#F0F0F0",
                  fontFamily: "DM Mono, monospace",
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Users Section */}
        <div style={{ marginBottom: "32px" }}>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#F0F0F0",
              marginBottom: "12px",
            }}
          >
            Users
          </h2>
          <div style={{ marginBottom: "12px" }}>
            <FilterTabs
              tabs={userTabs}
              active={userFilter}
              onChange={(v) => setUserFilter(v as UserFilter)}
            />
          </div>
          <UserTable users={filteredUsers} onAction={(msg) => setToast(msg)} />
        </div>

        {/* Invoices Section */}
        <div>
          <h2
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#F0F0F0",
              marginBottom: "12px",
            }}
          >
            All Invoices
          </h2>
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
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                padding: "12px 20px",
                borderBottom: "1px solid #2A2A2A",
              }}
            >
              {["Client", "Amount", "Status", "Due Date"].map((h) => (
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
            {invoices.map((inv, index) => (
              <div
                key={inv.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr",
                  padding: "14px 20px",
                  borderBottom:
                    index < invoices.length - 1 ? "1px solid #2A2A2A" : "none",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "13px", color: "#F0F0F0" }}>
                  {inv.clientName}
                </p>
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
              </div>
            ))}
          </div>
        </div>
      </div>

      {toast && (
        <Toast message={toast} type="success" onClose={() => setToast(null)} />
      )}
    </DashboardLayout>
  );
}
