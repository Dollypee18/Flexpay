"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Invoices", href: "/invoices" },
  { label: "Transactions", href: "/transactions" },
  { label: "Admin", href: "/admin", adminOnly: true },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const sidebarWidth = collapsed ? "56px" : "200px";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        backgroundColor: "#0F0F0F",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarWidth,
          flexShrink: 0,
          borderRight: "1px solid #2A2A2A",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.2s ease",
          overflow: "hidden",
        }}
      >
        {/* Logo + Toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "16px 0" : "16px 20px",
            borderBottom: "1px solid #2A2A2A",
            minHeight: "56px",
          }}
        >
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00C896",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#F0F0F0",
                  whiteSpace: "nowrap",
                }}
              >
                FlexPay
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#555555",
              fontSize: "16px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            padding: "12px 8px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          {navItems
            .filter(
              (item) => !item.adminOnly || (mounted && user?.role === "admin"),
            )
            .map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "10px 0" : "8px 12px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: active ? 500 : 400,
                    color: active ? "#F0F0F0" : "#888888",
                    backgroundColor: active ? "#1E1E1E" : "transparent",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    transition: "background-color 0.1s",
                  }}
                >
                  {collapsed ? item.label.charAt(0) : item.label}
                </Link>
              );
            })}
        </nav>

        {/* User + Logout */}
        <div
          style={{
            borderTop: "1px solid #2A2A2A",
            padding: collapsed ? "12px 0" : "12px 16px",
          }}
        >
          {!collapsed && (
            <p
              style={{
                fontSize: "12px",
                color: "#555555",
                marginBottom: "8px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {mounted ? (user?.name ?? "") : ""}
            </p>
          )}
          <button
            onClick={logout}
            title="Sign out"
            style={{
              fontSize: "12px",
              color: "#555555",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              textAlign: collapsed ? "center" : "left",
              width: "100%",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#FF4D4D")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#555555")}
          >
            {collapsed ? "×" : "Sign out"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflow: "auto" }}>{children}</main>
    </div>
  );
}
