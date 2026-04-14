"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BrandMark from "@/components/BrandMark";
import GoldButton from "@/components/GoldButton";


const principles = [
  {
    n: "01",
    title: "Sözdə yox, işdə",
    body: "Vəd verdiyimizi vaxtında, tam həcmdə təhvil veririk. Şişirdilmiş satış danışığı yoxdur.",
  },
  {
    n: "02",
    title: "Sabit qiymət",
    body: "İş başlamadan iş həcmi və qiymət razılaşılır. Gizli xərc və ya əlavə faktura olmur.",
  },
  {
    n: "03",
    title: "Eyni iş günü cavab",
    body: "Sorğularınıza saatlarla cavab veririk. Qərarlar günlərlə uzadılmır.",
  },
  {
    n: "04",
    title: "Davamlı tərəfdaşlıq",
    body: "Layihə bitəndən sonra da yanınızdayıq. Buraxıb getmirik, böyüməyinizi izləyirik.",
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function AboutPage() {
  return (
    <div className="pt-16">


      {/* ── Hero ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_380px] lg:grid-cols-[1fr_1px_440px]">
        <div className="px-6 md:px-12 py-10 md:py-14 flex items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-[44px] md:text-[56px] lg:text-[68px] font-extrabold text-[var(--color-ink)] leading-[0.95] tracking-[-0.035em]"
          >
            Bakıda<br />
            bir niyyətlə<br />
            <em className="not-italic text-[var(--color-gold)]">quruldu.</em>
          </motion.h1>
        </div>
        <div className="hidden md:block bg-[var(--color-hairline)]" />
        <div className="hidden md:flex px-10 lg:px-12 flex-col justify-center gap-4">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[15px] text-[var(--color-slate)] leading-relaxed">
            Azərbaycan biznesinə etibarlı texnologiya tərəfdaşı olmaq üçün qurulduq. Hər layihədə — konkret ehtiyac, aydın plan, sabit qiymət.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[15px] text-[var(--color-slate)] leading-relaxed">
            Web, mobil, kibertəhlükəsizlik, avtomatlaşdırma və daha çox — hər sahə üçün düzgün mütəxəssis, tək bir tərəfdaşdan.
          </motion.p>
        </div>
      </section>

      {/* ── Story + Logo ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_360px] lg:grid-cols-[1fr_1px_420px]">
        <div className="px-6 md:px-12 py-10 md:py-14">
          <motion.p {...fade()} className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-6">
            Hekayəmiz
          </motion.p>
          <div className="space-y-4">
            <motion.p {...fade(0.05)} className="text-[16px] text-[var(--color-ink)] leading-[1.8]">
              Bakıda biznes sahibləri ilə danışdıqca eyni mənzərə təkrarlanırdı: xarici agentliklər bahalı, daxili IT komanda isə aylıq 8–12 min AZN xərc deməkdir. Freelancer seçimi isə etibarsız — bu gün var, sabah yoxdur.
            </motion.p>
            <motion.p {...fade(0.08)} className="text-[16px] text-[var(--color-ink)] leading-[1.8]">
              Ortada isə real boşluq var idi: <strong className="font-semibold">sözündə duran, vaxtında çatdıran</strong>, layihə bitdikdən sonra da yanında qalan bir texnologiya tərəfdaşına ehtiyac.
            </motion.p>
            <motion.p {...fade(0.11)} className="text-[16px] text-[var(--color-ink)] leading-[1.8]">
              StarSoft məhz bu ehtiyac üçün Bakıda quruldu. Vədimiz sadədir:{" "}
              <span className="text-[var(--color-gold)] font-semibold">daha az resursla, daha çox nəticə.</span>
            </motion.p>
            <motion.div {...fade(0.14)} className="border-t border-[var(--color-hairline)] pt-5 mt-2">
              <p className="font-[family-name:var(--font-display)] text-[20px] md:text-[24px] font-bold text-[var(--color-ink)] leading-snug tracking-[-0.02em]">
                Loqomuzdakı hər guşə bir xidmət sahəsini təmsil edir.<br />
                <em className="not-italic text-[var(--color-gold)]">Mərkəz isə həmişə sizin biznesinizdir.</em>
              </p>
            </motion.div>
          </div>
        </div>
        <div className="hidden md:block bg-[var(--color-hairline)]" />
        <motion.div {...fade(0.15)} className="hidden md:flex items-center justify-center" style={{ backgroundColor: "#B8893A" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          >
            <BrandMark theme="white-on-gold" size={160} radius={32} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Quote + Principles ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="px-6 md:px-12 py-14 md:py-20 flex flex-col justify-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-6">
            Prinsipimiz
          </p>
          <p className="font-[family-name:var(--font-display)] text-[38px] md:text-[52px] lg:text-[64px] font-extrabold text-[var(--color-ink)] leading-[1.05] tracking-[-0.03em]">
            Kodu yox,{" "}
            <em className="not-italic text-[var(--color-gold)]">nəticəni</em>{" "}
            veririk.
          </p>
        </motion.div>
        <div className="hidden md:block bg-[var(--color-hairline)]" />
        <div className="divide-y divide-[var(--color-hairline)]">
          {principles.map((p, i) => (
            <motion.div key={p.n}
              initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="px-6 md:px-10 py-6 flex gap-5 items-start"
            >
              <span className="font-mono text-[11px] text-[var(--color-gold)] mt-0.5 flex-shrink-0">{p.n}</span>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-[16px] font-bold text-[var(--color-ink)] mb-1 leading-tight">{p.title}</h3>
                <p className="text-[14px] text-[var(--color-slate)] leading-relaxed">{p.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Testimonials (gizlənib, sonra əlavə ediləcək) ── */}

      {/* ── CTA ── */}
      <section className="px-6 md:px-12 py-16 md:py-24">
        <motion.div {...fade()} className="max-w-lg">
          <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[48px] font-bold text-[var(--color-ink)] leading-[1.1] tracking-[-0.025em] mb-5">
            Layihənizi müzakirə edək.
          </h2>
          <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-8">
            Ehtiyacınızı dinləyirik, konkret plan və sabit qiymət təklif edirik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <GoldButton href="/contact" size="lg" withArrow>
              Pulsuz konsultasiya alın
            </GoldButton>
            <Link href="/services" className="text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1.5 sm:pt-3.5">
              Xidmətlərə baxın <ArrowUpRight size={14} />
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
