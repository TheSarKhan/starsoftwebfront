"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GoldButton from "@/components/GoldButton";
import { api, Project } from "@/lib/api";

const API_HOST =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") ||
  "http://localhost:8080";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-5"
          >
            Layihələrimiz
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[40px] md:text-[56px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mb-6"
          >
            Real iş.{" "}
            <span className="text-[var(--color-gold)]">Real nəticə</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[19px] leading-relaxed"
          >
            Şou üçün yox, real biznes problemlərini həll edən məhsullar.
            Hər biri — fikirdən canlı nəticəyə, sabit qiymətlə.
          </motion.p>
        </div>
      </section>

      {/* ═══ ALL PROJECTS ═══ */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => {
              const techs = (p.technologies || "")
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean);
              return (
                <AnimatedSection key={p.id} delay={i * 0.08}>
                  <article className="bg-white border border-[var(--color-hairline)] rounded-2xl overflow-hidden h-full flex flex-col card-lift">
                    <div className="h-48 bg-gradient-to-br from-[var(--color-gold-soft)] via-white to-[var(--color-gold-soft)] flex items-center justify-center border-b border-[var(--color-hairline)] overflow-hidden">
                      {p.imageUrl ? (
                        <img
                          src={`${API_HOST}${p.imageUrl}`}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="font-[family-name:var(--font-display)] text-[80px] font-extrabold text-[var(--color-gold)]/25 leading-none">
                          {p.title[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)]">
                        {p.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-ink leading-[1.2] tracking-[-0.01em] mt-1.5 mb-2">
                        {p.title}
                      </h3>
                      <p className="text-slate text-[14.5px] leading-relaxed mb-4 flex-1">
                        {p.description}
                      </p>
                      {techs.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {techs.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-mist text-slate text-[11px] font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                      {p.projectUrl && (
                        <a
                          href={p.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-semibold text-[14px] transition-colors"
                        >
                          Saytına baxın
                          <ExternalLink size={14} strokeWidth={2.25} />
                        </a>
                      )}
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
          {projects.length === 0 && (
            <div className="text-center py-16 text-slate text-[15px]">
              Layihələr yüklənir...
            </div>
          )}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[44px] font-bold text-ink leading-[1.15] tracking-[-0.025em] mb-5">
              Növbəti layihə sizin ola bilər.
            </h2>
            <p className="text-slate text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              Ehtiyacınızı dinləyirik, konkret plan və sabit qiymət təklif
              edirik — heç bir öhdəlik yoxdur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <GoldButton href="/contact" size="lg" withArrow>
                Layihənizi müzakirə edək
              </GoldButton>
              <GoldButton href="/services" size="lg" variant="secondary">
                Xidmətlərə baxın
              </GoldButton>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
