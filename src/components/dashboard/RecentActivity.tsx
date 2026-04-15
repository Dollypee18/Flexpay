import { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/format";
import Badge from "@/components/ui/Badge";

interface RecentActivityProps {
  transactions: Transaction[];
}

export default function RecentActivity({ transactions }: RecentActivityProps) {
  return (
    <div
      style={{
        backgroundColor: "#161616",
        border: "1px solid #2A2A2A",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid #2A2A2A",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#F0F0F0",
          }}
        >
          Recent Activity
        </p>
      </div>

      {transactions.length === 0 ? (
        <p
          style={{
            padding: "32px 20px",
            textAlign: "center",
            color: "#555555",
            fontSize: "13px",
          }}
        >
          No transactions yet.
        </p>
      ) : (
        <div>
          {transactions.map((txn, index) => (
            <div
              key={txn.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderBottom:
                  index < transactions.length - 1
                    ? "1px solid #2A2A2A"
                    : "none",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      txn.type === "credit" ? "#00C89615" : "#FF4D4D15",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  {txn.type === "credit" ? "↓" : "↑"}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#F0F0F0",
                      marginBottom: "2px",
                    }}
                  >
                    {txn.description}
                  </p>
                  <p style={{ fontSize: "11px", color: "#555555" }}>
                    {formatDate(txn.createdAt)}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: "4px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    fontFamily: "DM Mono, monospace",
                    color: txn.type === "credit" ? "#00C896" : "#FF4D4D",
                  }}
                >
                  {txn.type === "credit" ? "+" : "-"}
                  {formatCurrency(txn.amount)}
                </p>
                <Badge variant={txn.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
