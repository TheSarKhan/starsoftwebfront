export default function AdminContactsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-24 bg-[var(--color-hairline-strong)] rounded-lg" />
      </div>

      <div className="bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 px-4 py-3 border-b border-[var(--color-hairline)] bg-mist">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-3 bg-[var(--color-hairline-strong)] rounded" />
          ))}
        </div>
        {/* Rows */}
        {[1, 2, 3, 4, 5, 6, 7].map((row) => (
          <div
            key={row}
            className="grid grid-cols-5 gap-4 px-4 py-5 border-b border-[var(--color-hairline)] last:border-0 items-center"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-hairline-strong)]" />
              <div className="h-4 flex-1 bg-[var(--color-hairline-strong)] rounded" />
            </div>
            <div className="h-4 w-4/5 bg-mist rounded" />
            <div className="h-4 w-3/4 bg-mist rounded" />
            <div className="h-4 w-2/3 bg-mist rounded" />
            <div className="h-6 w-20 bg-mist rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
