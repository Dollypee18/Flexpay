import Badge from "@/components/ui/Badge";
import KycActions from "@/components/admin/KycActions";
import { AdminUser } from "@/store/adminStore";

interface UserTableProps {
  users: AdminUser[];
  onAction: (message: string) => void;
}

export default function UserTable({ users, onAction }: UserTableProps) {
  return (
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
          gridTemplateColumns: "2fr 1fr 1fr 2fr",
          padding: "12px 20px",
          borderBottom: "1px solid #2A2A2A",
        }}
      >
        {["User", "Role", "KYC Status", "Actions"].map((h) => (
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

      {users.map((user, index) => (
        <div
          key={user.id}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 2fr",
            padding: "14px 20px",
            borderBottom:
              index < users.length - 1 ? "1px solid #2A2A2A" : "none",
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
              {user.name}
            </p>
            <p style={{ fontSize: "11px", color: "#555555" }}>{user.email}</p>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#888888",
              textTransform: "capitalize",
            }}
          >
            {user.role}
          </p>
          <Badge variant={user.kycStatus} />
          <KycActions
            userId={user.id}
            currentStatus={user.kycStatus}
            onAction={onAction}
          />
        </div>
      ))}
    </div>
  );
}
