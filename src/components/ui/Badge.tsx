type BadgeVariant =
  | "pending"
  | "paid"
  | "overdue"
  | "approved"
  | "rejected"
  | "completed"
  | "failed";

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
}

const variantStyles: Record<
  BadgeVariant,
  { backgroundColor: string; color: string; border: string }
> = {
  pending: {
    backgroundColor: "#F5A62320",
    color: "#F5A623",
    border: "1px solid #F5A62340",
  },
  paid: {
    backgroundColor: "#00C89620",
    color: "#00C896",
    border: "1px solid #00C89640",
  },
  overdue: {
    backgroundColor: "#FF4D4D20",
    color: "#FF4D4D",
    border: "1px solid #FF4D4D40",
  },
  approved: {
    backgroundColor: "#00C89620",
    color: "#00C896",
    border: "1px solid #00C89640",
  },
  rejected: {
    backgroundColor: "#FF4D4D20",
    color: "#FF4D4D",
    border: "1px solid #FF4D4D40",
  },
  completed: {
    backgroundColor: "#00C89620",
    color: "#00C896",
    border: "1px solid #00C89640",
  },
  failed: {
    backgroundColor: "#FF4D4D20",
    color: "#FF4D4D",
    border: "1px solid #FF4D4D40",
  },
};

const defaultLabels: Record<BadgeVariant, string> = {
  pending: "Pending",
  paid: "Paid",
  overdue: "Overdue",
  approved: "Approved",
  rejected: "Rejected",
  completed: "Completed",
  failed: "Failed",
};

export default function Badge({ variant, label }: BadgeProps) {
  const style = variantStyles[variant];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        width: "fit-content",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: 500,
        fontFamily: "DM Mono, monospace",
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: style.border,
        whiteSpace: "nowrap",
      }}
    >
      {label || defaultLabels[variant]}
    </span>
  );
}
