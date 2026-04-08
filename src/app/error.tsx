"use client";

import { useEffect } from "react";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-6">
        <AlertCircle size={28} strokeWidth={1.75} className="text-red-600" />
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[34px] font-bold text-ink leading-[1.2] tracking-[-0.02em] mb-3">
        Xəta baş verdi
      </h2>
      <p className="text-slate text-[16px] leading-relaxed max-w-md mb-8">
        Gözlənilməz xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold rounded-lg bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] transition-colors"
      >
        Yenidən cəhd et
      </button>
    </div>
  );
}
