"use client";

import AnimatedSection from "./AnimatedSection";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <AnimatedSection className={`${alignCls} mb-14 max-w-2xl`}>
      {eyebrow && (
        <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-bold text-ink leading-[1.15] tracking-[-0.02em] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate text-[17px] leading-relaxed">{subtitle}</p>
      )}
    </AnimatedSection>
  );
}
