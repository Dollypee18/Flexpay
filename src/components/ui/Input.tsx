import { cn } from "@/lib/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded px-3 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-150",
            "focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]",
            error &&
              "border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]",
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-[var(--danger)]">{error}</p>}
        {hint && !error && (
          <p className="text-xs text-[var(--text-muted)]">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
