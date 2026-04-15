"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { useAdminStore } from "@/store/adminStore";

interface KycActionsProps {
  userId: string;
  currentStatus: string;
  onAction: (message: string) => void;
}

export default function KycActions({
  userId,
  currentStatus,
  onAction,
}: KycActionsProps) {
  const { updateKycStatus } = useAdminStore();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  if (currentStatus === "approved") {
    return <span style={{ fontSize: "12px", color: "#555555" }}>Approved</span>;
  }

  async function handleAction(action: "approve" | "reject") {
    setLoading(action);
    await new Promise((res) => setTimeout(res, 600));
    updateKycStatus(userId, action === "approve" ? "approved" : "rejected");
    setLoading(null);
    onAction(action === "approve" ? "KYC approved." : "KYC rejected.");
  }
  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Button
        size="sm"
        loading={loading === "approve"}
        disabled={loading !== null}
        onClick={() => handleAction("approve")}
        style={{ minWidth: "80px" }}
      >
        Approve
      </Button>
      {currentStatus !== "rejected" && (
        <Button
          size="sm"
          variant="danger"
          loading={loading === "reject"}
          disabled={loading !== null}
          onClick={() => handleAction("reject")}
          style={{ minWidth: "70px" }}
        >
          Reject
        </Button>
      )}
    </div>
  );
}
