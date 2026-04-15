import { cn } from "@/lib/cn";

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
}

export default function Table<T extends { id: string }>({
  columns,
  data,
  emptyMessage = "No data found.",
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[var(--border)]">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={cn(
                  "text-left px-4 py-3 text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider",
                  col.className,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-12 text-[var(--text-muted)]"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                className="border-b border-[var(--border)] hover:bg-[var(--bg-elevated)] transition-colors duration-100"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={cn(
                      "px-4 py-3 text-[var(--text-primary)]",
                      col.className,
                    )}
                  >
                    {col.render
                      ? col.render(row)
                      : String(
                          (row as Record<string, unknown>)[String(col.key)] ??
                            "",
                        )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
