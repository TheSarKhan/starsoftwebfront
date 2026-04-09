function TableSkeleton({ cols = 5 }: { cols?: number }) {
  return (
    <div className="bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden animate-pulse">
      {/* Header */}
      <div
        className="grid gap-4 px-4 py-3 border-b border-[var(--color-hairline)] bg-mist"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {Array.from({ length: cols }).map((_, i) => (
          <div key={i} className="h-3 bg-[var(--color-hairline-strong)] rounded" />
        ))}
      </div>
      {/* Rows */}
      {[1, 2, 3, 4, 5, 6].map((row) => (
        <div
          key={row}
          className="grid gap-4 px-4 py-4 border-b border-[var(--color-hairline)] last:border-0"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className={`h-4 rounded ${i === 0 ? "bg-[var(--color-hairline-strong)]" : "bg-mist"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function AdminBlogLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-16 bg-[var(--color-hairline-strong)] rounded-lg" />
        <div className="h-10 w-28 bg-[var(--color-hairline-strong)] rounded-lg" />
      </div>
      <TableSkeleton cols={6} />
    </div>
  );
}
