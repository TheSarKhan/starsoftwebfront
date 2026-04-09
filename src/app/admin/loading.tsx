export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 w-40 bg-[var(--color-hairline-strong)] rounded-lg" />
        <div className="h-10 w-32 bg-[var(--color-hairline-strong)] rounded-lg" />
      </div>

      {/* Stat cards (dashboard style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white border border-[var(--color-hairline)] rounded-xl p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-3 w-24 bg-mist rounded" />
                <div className="h-9 w-16 bg-[var(--color-hairline-strong)] rounded-lg" />
              </div>
              <div className="w-10 h-10 bg-mist rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
