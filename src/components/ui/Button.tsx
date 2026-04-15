"use client";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#00C896] text-[#0F0F0F] font-semibold hover:opacity-90",
    secondary:
      "bg-[#1E1E1E] text-[#F0F0F0] border border-[#2A2A2A] hover:border-[#3A3A3A]",
    ghost:
      "bg-transparent text-[#888888] hover:text-[#F0F0F0] hover:bg-[#1E1E1E]",
    danger:
      "bg-transparent text-[#FF4D4D] border border-[#FF4D4D] hover:bg-[#FF4D4D] hover:text-white",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-sm",
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
