interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 border-r border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">
            FlexPay
          </span>
        </div>
        <div>
          <p className="text-3xl font-semibold text-[var(--text-primary)] leading-snug max-w-xs">
            Payments for people who work for themselves.
          </p>
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Invoice clients, track payments, get paid.
          </p>
        </div>
        <p className="text-xs text-[var(--text-muted)]">© 2025 FlexPay</p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              FlexPay
            </span>
          </div>
          <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-1">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-[var(--text-secondary)] mb-6">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
