export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-[var(--color-hairline-strong)] rounded-full" />
          <div className="absolute inset-0 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
        </div>
        <span className="font-[family-name:var(--font-display)] text-[var(--color-gold)] text-[13px] font-semibold uppercase tracking-[0.12em]">
          KhanSoft
        </span>
      </div>
    </div>
  );
}
