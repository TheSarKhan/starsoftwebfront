import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Səhifə tapılmadı",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="font-[family-name:var(--font-display)] text-[140px] md:text-[180px] font-extrabold text-[var(--color-gold)]/25 leading-none tracking-[-0.03em] mb-2">
        404
      </div>
      <h1 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-bold text-ink leading-[1.15] tracking-[-0.02em] mb-4">
        Səhifə tapılmadı
      </h1>
      <p className="text-slate text-[16px] leading-relaxed max-w-md mb-8">
        Axtardığınız səhifə mövcud deyil. Bəlkə silinib və ya ünvan yanlışdır.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 text-[15px] font-semibold rounded-lg bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-hover)] transition-colors"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}
