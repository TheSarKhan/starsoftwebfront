export default function AdminSettingsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-20 bg-[var(--color-hairline-strong)] rounded-lg mb-8" />

      <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-6 space-y-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-32 bg-[var(--color-hairline-strong)] rounded" />
            <div className="h-10 w-full bg-mist rounded-lg" />
          </div>
        ))}
        <div className="pt-2">
          <div className="h-10 w-24 bg-[var(--color-hairline-strong)] rounded-lg" />
        </div>
      </div>
    </div>
  );
}
