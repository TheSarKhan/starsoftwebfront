"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  ShieldCheck,
  Server,
  Zap,
  BarChart3,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import GoldButton from "@/components/GoldButton";
import Image from "next/image";
import { api, Service, Project } from "@/lib/api";

const SERVICE_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Globe,
  Smartphone,
  ShieldCheck,
  Server,
  Zap,
  BarChart3,
  Bot,
};

const fallbackServices = [
  {
    icon: "Globe",
    titleAz: "Web development",
    descriptionAz:
      "Sürətli, SEO dostu və konversiyaya hesablanmış müasir veb saytlar və veb tətbiqlər.",
  },
  {
    icon: "Smartphone",
    titleAz: "Mobil tətbiq",
    descriptionAz:
      "iOS və Android üçün eyni keyfiyyətdə işləyən mobil tətbiqlər.",
  },
  {
    icon: "ShieldCheck",
    titleAz: "Kibertəhlükəsizlik",
    descriptionAz:
      "Audit, penetrasiya testi və davamlı qoruma — biznesinizi və müştəri məlumatınızı qoruyun.",
  },
  {
    icon: "Server",
    titleAz: "İnfrastruktur",
    descriptionAz:
      "Saytınız və sistemləriniz dayanmadan, sürətlə işləsin — server, hosting, monitorinq.",
  },
  {
    icon: "Zap",
    titleAz: "Avtomatlaşdırma",
    descriptionAz:
      "Manual prosesləri sistemlərə çevirin — həftədə 20+ saatınızı geri qazanın.",
  },
  {
    icon: "BarChart3",
    titleAz: "Biznes analitika",
    descriptionAz:
      "Məlumatınızı qərara çevirən dashboard və hesabat sistemləri.",
  },
  {
    icon: "Bot",
    titleAz: "Telegram botlar",
    descriptionAz:
      "Sifariş qəbulu, müştəri dəstəyi və bildirişlər üçün Telegram botlar.",
  },
];

const valueProps = [
  "Sabit qiymət — sürpriz xərc yoxdur",
  "Eyni iş günü cavab",
  "Layihədən sonra davamlı dəstək",
  "Hər layihəyə uyğun mütəxəssislər",
];

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    api.getServices().then(setServices).catch(() => {});
    api.getProjects().then(setProjects).catch(() => {});
  }, []);

  const displayServices =
    services.length > 0
      ? services.slice(0, 7)
      : (fallbackServices as unknown as Service[]);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,black,transparent)]" />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-gold-soft)] border border-[var(--color-gold)]/20 mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
            <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold-hover)]">
              Azərbaycan biznesi üçün
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[44px] md:text-[64px] lg:text-[72px] font-extrabold text-ink leading-[1.05] tracking-[-0.03em] mb-6"
          >
            Texnologiyanızı{" "}
            <span className="text-[var(--color-gold)]">ulduzlara çatdırırıq</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[20px] leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Sayt, mobil tətbiq, təhlükəsizlik, infrastruktur, avtomatlaşdırma,
            analitika — hər layihəyə uyğun mütəxəssislər, sabit qiymətə.
            Siz biznesə fokus olun, qalanını biz parlaq edirik.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <GoldButton href="/contact" size="lg" withArrow>
              Layihənizi müzakirə edək
            </GoldButton>
            <GoldButton href="/projects" size="lg" variant="secondary">
              Nə etdiyimizə baxın
            </GoldButton>
          </motion.div>

          {/* Value props row */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-slate"
          >
            {valueProps.map((v) => (
              <li key={v} className="flex items-center gap-1.5">
                <Check size={15} strokeWidth={2.5} className="text-[var(--color-gold)]" />
                <span>{v}</span>
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" className="py-16 md:py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Xidmətlərimiz"
            title="Bir tərəfdaş. Altı sahə. Sıfır baş ağrısı."
            subtitle="Hər layihə üçün yeni satıcı axtarmırsınız — bir ulduzdan hər şey parlayır."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon] || Globe;
              return (
                <AnimatedSection key={s.titleAz || s.id} delay={i * 0.06}>
                  <div className="card-lift h-full p-7 bg-white border border-[var(--color-hairline)] rounded-xl">
                    <div className="w-11 h-11 rounded-lg bg-[var(--color-gold-soft)] flex items-center justify-center mb-5">
                      <Icon size={20} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink mb-2 tracking-[-0.01em]">
                      {s.titleAz}
                    </h3>
                    <p className="text-slate text-[15px] leading-relaxed">
                      {s.descriptionAz}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          <AnimatedSection className="text-center mt-12">
            <GoldButton href="/services" variant="secondary" withArrow>
              Bütün xidmətlər
            </GoldButton>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ WHY US ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
              Niyə biz?
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-bold text-ink leading-[1.15] tracking-[-0.02em] mb-5">
              Daha az resursla, daha çox iş.
            </h2>
            <p className="text-slate text-[17px] leading-relaxed mb-6">
              Daxili IT komanda saxlamaq ayda 8–12 min AZN xərcdir.
              StarSoft hər layihəyə uyğun mütəxəssislər seçir — siz yalnız
              real lazım olan üçün ödəyirsiniz. Siz biznesə fokus olun,
              texnologiyanı biz parlaq edirik.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Sabit qiymət — sürpriz fakturalar yoxdur",
                "Açıq iş həcmi — başlamadan razılaşırıq",
                "Eyni iş günü cavab — qərar saatlarla verilir",
                "Layihə bitdikdən sonra davamlı dəstək",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-ink">
                  <div className="w-5 h-5 rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} className="text-[var(--color-gold)]" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <GoldButton href="/about" variant="secondary" withArrow>
              Hekayəmizi oxuyun
            </GoldButton>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <div className="grid grid-cols-2 gap-4 auto-rows-fr">
              {[
                { stat: "6", label: "Xidmət sahəsi" },
                { stat: "0", label: "Gizli xərc" },
                { stat: "24h", label: "İlk cavab müddəti" },
                { stat: "1", label: "Tək tərəfdaş, bir hesab" },
              ].map((m) => (
                <div
                  key={m.label}
                  className="h-full p-6 rounded-xl bg-white border border-[var(--color-hairline)] card-lift flex flex-col justify-between"
                >
                  <div className="font-[family-name:var(--font-display)] text-[40px] font-extrabold text-ink leading-none mb-2 tracking-[-0.03em]">
                    {m.stat}
                  </div>
                  <div className="text-[13px] text-slate">{m.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-16 md:py-20 bg-mist">
        <div className="max-w-5xl mx-auto px-4">
          <SectionHeader
            eyebrow="Necə işləyirik"
            title="Üç addımda — fikirdən nəticəyə."
            subtitle="Bürokratiya yoxdur, vasitəçi yoxdur. Birbaşa texniki rəhbərlə danışırsınız."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Dinləyirik",
                body: "Biznes ehtiyacınızı birlikdə analiz edirik. Nə lazımdır, nə lazım deyil — açıq və dürüst.",
              },
              {
                step: "02",
                title: "Plan və qiymət veririk",
                body: "İş həcmi, müddət və sabit qiymət razılaşdırılır. Gizli xərc yoxdur, sürpriz faktura yoxdur.",
              },
              {
                step: "03",
                title: "İcra edirik",
                body: "Layihəyə uyğun mütəxəssislər seçilir, iş başlayır. Hər mərhələdə görürsünüz nə baş verir.",
              },
            ].map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.1}>
                <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-7 h-full">
                  <span className="font-[family-name:var(--font-display)] text-[36px] font-extrabold text-[var(--color-gold)]/20 leading-none">
                    {item.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink mt-3 mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-slate text-[15px] leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      {projects.length > 0 && (
        <section className="py-16 md:py-20 bg-mist">
          <div className="max-w-7xl mx-auto px-4">
            <SectionHeader
              eyebrow="Layihələrimiz"
              title="Real iş, real nəticə."
              subtitle="Biznes problemlərini həll edən məhsullar qururuq — şou üçün yox."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.1}>
                  <Link
                    href={p.projectUrl || "/projects"}
                    target={p.projectUrl ? "_blank" : undefined}
                    className="card-lift block h-full bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden"
                  >
                    <div className="h-44 relative bg-gradient-to-br from-[var(--color-gold-soft)] to-white flex items-center justify-center border-b border-[var(--color-hairline)] overflow-hidden">
                      {p.imageUrl ? (
                        <Image
                          src={`${(process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080")}${p.imageUrl}`}
                          alt={p.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="font-[family-name:var(--font-display)] text-[64px] font-extrabold text-[var(--color-gold)]/30 leading-none">
                          {p.title[0]}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)]">
                        {p.category}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink mt-1.5 mb-2 tracking-[-0.01em]">
                        {p.title}
                      </h3>
                      <p className="text-slate text-[14px] leading-relaxed">
                        {p.description}
                      </p>
                      {p.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {p.technologies
                            .split(",")
                            .slice(0, 4)
                            .map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 rounded-md bg-mist text-slate text-[11px] font-medium"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection className="text-center mt-12">
              <GoldButton href="/projects" variant="secondary" withArrow>
                Bütün layihələr
              </GoldButton>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="relative rounded-2xl bg-white border border-[var(--color-hairline)] p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 hero-glow pointer-events-none" />
              <div className="relative">
                <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
                  Başlayaq
                </span>
                <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[44px] font-bold text-ink leading-[1.15] tracking-[-0.025em] mb-4">
                  Layihənizi müzakirə edək.
                </h2>
                <p className="text-slate text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
                  İlk konsultasiya pulsuzdur. Eyni iş günü cavab — biznes
                  ehtiyacınızı dinləyir, konkret plan və sabit qiymət təklif
                  edirik.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <GoldButton href="/contact" size="lg" withArrow>
                    Layihənizi müzakirə edək
                  </GoldButton>
                  <a
                    href="https://wa.me/994502017164"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold rounded-lg border border-[var(--color-hairline-strong)] text-ink hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
                  >
                    WhatsApp ilə yazın
                    <ArrowRight size={16} strokeWidth={2.25} />
                  </a>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
