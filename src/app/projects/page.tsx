"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import Image from "next/image";
import { api, Project } from "@/lib/api";

const API_HOST =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    api
      .getProjects()
      .then((p) => { setProjects(p); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean))
  );

  const visibleProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  return (
    <div className="pt-16">


      {/* ── Hero ── */}
      <section className="border-b border-[var(--color-hairline)] px-6 md:px-12 py-14 md:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-[family-name:var(--font-display)] text-[52px] md:text-[72px] lg:text-[88px] font-extrabold text-[var(--color-ink)] leading-[0.93] tracking-[-0.035em]"
        >
          Real iş.<br />
          <em className="not-italic text-[var(--color-gold)]">Real nəticə.</em>
        </motion.h1>
      </section>

      {/* ── Projects: editorial alternating layout ── */}
      <section className="divide-y divide-[var(--color-hairline)]">

        {/* Category filter */}
        {!loading && categories.length > 1 && (
          <div className="px-6 md:px-12 py-5 flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-colors ${
                activeCategory === null
                  ? "bg-[var(--color-ink)] text-white"
                  : "border border-[var(--color-hairline-strong)] text-[var(--color-slate)] hover:border-[var(--color-slate)]"
              }`}
            >
              Hamısı
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-full transition-colors ${
                  activeCategory === cat
                    ? "bg-[var(--color-gold)] text-white"
                    : "border border-[var(--color-hairline-strong)] text-[var(--color-slate)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="px-6 md:px-12 py-24">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-[var(--color-slate)]/40">—</span>
              <span className="text-[16px] text-[var(--color-slate)]">Layihələr yüklənir...</span>
            </div>
          </div>
        )}

        {!loading && visibleProjects.length === 0 && (
          <div className="px-6 md:px-12 py-24 max-w-xl">
            <p className="font-[family-name:var(--font-display)] text-[28px] font-bold text-[var(--color-ink)] mb-4">
              Tezliklə.
            </p>
            <p className="text-[16px] text-[var(--color-slate)] leading-relaxed">
              Layihələrimiz hazırlanır. Bu vaxt xidmətlərimizlə tanış ola bilərsiniz.
            </p>
          </div>
        )}

        {visibleProjects.map((p, i) => {
          const techs = (p.technologies || "")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
          const even = i % 2 === 0;

          return (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="grid md:grid-cols-[80px_1fr_1fr] lg:grid-cols-[100px_1fr_1fr] gap-0"
            >
              {/* Number column */}
              <div className="hidden md:flex items-start px-6 md:px-8 pt-10 border-r border-[var(--color-hairline)]">
                <span className="font-[family-name:var(--font-display)] text-[56px] font-extrabold text-[var(--color-gold)]/15 leading-none tracking-[-0.04em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content: text side */}
              <div
                className={`px-6 md:px-10 py-10 flex flex-col justify-between ${
                  even ? "" : "md:order-last"
                } ${even ? "md:border-r border-[var(--color-hairline)]" : ""}`}
              >
                <div>
                  {/* Mobile number */}
                  <span className="md:hidden font-mono text-[11px] text-[var(--color-slate)]/40 block mb-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] block mb-3">
                    {p.category}
                  </span>

                  <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[36px] lg:text-[42px] font-bold text-[var(--color-ink)] leading-[1.1] tracking-[-0.025em] mb-4">
                    {p.title}
                  </h2>

                  <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-6 max-w-md">
                    {p.description}
                  </p>

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {techs.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 text-[12px] font-medium text-[var(--color-slate)] border border-[var(--color-hairline)] rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {p.projectUrl && (
                  <a
                    href={p.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[14px] font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] transition-colors"
                  >
                    Saytına baxın <ExternalLink size={14} strokeWidth={2} />
                  </a>
                )}
              </div>

              {/* Visual side */}
              <div
                className={`relative overflow-hidden bg-[var(--color-gold-soft)] min-h-[260px] md:min-h-0 flex items-center justify-center ${
                  even ? "" : "md:border-r border-[var(--color-hairline)]"
                }`}
              >
                {p.imageUrl ? (
                  <Image
                    src={`${API_HOST}${p.imageUrl}`}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="font-[family-name:var(--font-display)] text-[120px] md:text-[160px] font-extrabold text-[var(--color-gold)]/20 leading-none select-none">
                    {p.title[0]?.toUpperCase()}
                  </span>
                )}
              </div>
            </motion.article>
          );
        })}
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24 border-t border-[var(--color-hairline)]">
        <div className="px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[36px] md:text-[52px] font-bold text-[var(--color-ink)] leading-[1.1] tracking-[-0.025em] mb-6">
              Növbəti layihə<br />sizin ola bilər.
            </h2>
            <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-8">
              Ehtiyacınızı dinləyirik, konkret plan və sabit qiymət
              təklif edirik — heç bir öhdəlik yoxdur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <GoldButton href="/contact" size="lg" withArrow>
                Pulsuz konsultasiya alın
              </GoldButton>
              <a
                href="https://wa.me/994502017164"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1.5 sm:pt-3.5"
              >
                WhatsApp ilə yazın <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
