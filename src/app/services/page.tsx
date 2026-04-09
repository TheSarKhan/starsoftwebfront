"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
import GoldButton from "@/components/GoldButton";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Web development",
    tagline: "Sürətli, SEO dostu, konversiyaya hesablanmış veb həllər.",
    description:
      "Korporativ saytdan mürəkkəb veb tətbiqə qədər — biznesinizi onlayn təmsil edən və müştəri qazandıran həllər qururuq.",
    deliverables: [
      "Müasir, mobil-uyğun dizayn",
      "Sürətli yüklənmə və performans optimizasiyası",
      "SEO və metadata optimizasiyası",
      "Admin paneli ilə özünü idarəetmə",
      "Hosting və davamlı dəstək",
    ],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobil tətbiq",
    tagline: "iOS və Android üçün eyni keyfiyyətdə işləyən mobil tətbiqlər.",
    description:
      "Bir layihə ilə həm iOS, həm Android — daha az xərc, daha sürətli buraxılış. Müştəri loyallığını cibə daşıyın.",
    deliverables: [
      "iOS və Android tək kod bazasından",
      "Push bildirişlər, ödəniş, xəritə inteqrasiyaları",
      "App Store və Google Play yerləşdirmə",
      "Versiya yenilənmələri və dəstək",
      "Analitika və crash izləmə",
    ],
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Kibertəhlükəsizlik",
    tagline: "Audit, penetrasiya testi və davamlı qoruma.",
    description:
      "Bir hack hadisəsi biznesin reputasiyasını və müştəri etibarını məhv edə bilər. Sistemlərinizi proaktiv olaraq qoruyuruq.",
    deliverables: [
      "Tam təhlükəsizlik auditi və hesabat",
      "Penetrasiya testi (web, mobil, infrastruktur)",
      "Məlum təhlükəsizlik boşluqlarının aradan qaldırılması",
      "Davamlı monitorinq və xəbərdarlıq sistemi",
      "Komanda təhlükəsizlik təlimi",
    ],
  },
  {
    id: "devops",
    icon: Server,
    title: "İnfrastruktur",
    tagline: "Saytınız və sistemləriniz dayanmadan, sürətlə işləsin.",
    description:
      "Yenilik buraxanda sistem çökməsin, saytınız gecə-gündüz işləsin, problem olanda dərhal biləsiniz. Texniki infrastrukturu biz qururuq.",
    deliverables: [
      "Avtomatik buraxılış — yenilik bir kliklə yayılır",
      "Server və hosting qurulması (AWS, Azure, DigitalOcean)",
      "Saytın dayanmadan işləməsi üçün monitorinq sistemi",
      "Problem olduqda avtomatik xəbərdarlıq",
      "Backup və fəlakətdən bərpa strategiyası",
    ],
  },
  {
    id: "automation",
    icon: Zap,
    title: "Avtomatlaşdırma",
    tagline: "Manual prosesləri sistemlərə çevirin.",
    description:
      "Hər həftə təkrarlanan əl işləri — hesabat, fakturalama, məlumat köçürmə, e-poçt cavabları — bir dəfə qurulan sistemə çevrilir.",
    deliverables: [
      "Biznes proseslərinin analizi və xəritələnməsi",
      "Sistemlər arası inteqrasiya (CRM, ERP, mühasibat)",
      "Hesabat və faktura avtomatlaşdırması",
      "E-poçt və bildiriş workflow-ları",
      "Komanda üçün sənədləşdirmə və təlim",
    ],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Biznes analitika",
    tagline: "Məlumatınızı qərara çevirən dashboard-lar.",
    description:
      "Excel cədvəlləri arasında itən məlumat — bir baxışda anlaşılan dashboard-a çevrilir. Qərarlar hisslərlə yox, faktlarla verilir.",
    deliverables: [
      "Məlumat mənbələrinin birləşdirilməsi",
      "İnteraktiv dashboard — bir baxışda bütün rəqəmlər",
      "Avtomatik gündəlik/həftəlik hesabatlar",
      "KPI izləmə və xəbərdarlıq sistemi",
      "Tarixi məlumat və proqnoz analizi",
    ],
  },
  {
    id: "telegram",
    icon: Bot,
    title: "Telegram botlar",
    tagline: "Müştəriləriniz artıq Telegram-dadır — siz də orada olun.",
    description:
      "Sifariş qəbulu, müştəri dəstəyi, bildirişlər, CRM inteqrasiya — hamısı bir Telegram botda. Müştəriləriniz tanış mühitdən çıxmadan sizinlə işləyir.",
    deliverables: [
      "Sifariş və rezervasiya qəbulu",
      "Avtomatik müştəri dəstəyi (FAQ, status sorğusu)",
      "Bildiriş sistemi (sifariş, ödəniş, xatırlatma)",
      "CRM / admin panelinizlə inteqrasiya",
      "Çoxdilli dəstək (az/en/ru)",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-5"
          >
            Xidmətlərimiz
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[40px] md:text-[56px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mb-6"
          >
            Altı sahə,{" "}
            <span className="text-[var(--color-gold)]">bir parlaq tərəfdaş</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[19px] leading-relaxed"
          >
            Altı satıcı əvəzinə bir ulduz. Ehtiyacınızı dinləyirik,
            uyğun mütəxəssisləri seçirik, sabit qiymətlə təhvil veririk.
          </motion.p>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <AnimatedSection key={s.id} delay={i * 0.05}>
                <article
                  id={s.id}
                  className="card-lift bg-white border border-[var(--color-hairline)] rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 scroll-mt-24"
                >
                  <div className="md:col-span-5">
                    <div className="w-12 h-12 rounded-lg bg-[var(--color-gold-soft)] flex items-center justify-center mb-5">
                      <Icon size={22} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                    </div>
                    <h2 className="font-[family-name:var(--font-display)] text-[26px] md:text-[30px] font-bold text-ink leading-[1.2] tracking-[-0.02em] mb-3">
                      {s.title}
                    </h2>
                    <p className="text-[var(--color-gold-hover)] text-[15px] font-medium mb-4">
                      {s.tagline}
                    </p>
                    <p className="text-slate text-[15.5px] leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  <div className="md:col-span-7 md:border-l md:border-[var(--color-hairline)] md:pl-10">
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-mist-slate mb-4">
                      Nə təhvil veririk
                    </h3>
                    <ul className="space-y-3">
                      {s.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 text-[15px] text-ink"
                        >
                          <div className="w-5 h-5 rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={12} strokeWidth={3} className="text-[var(--color-gold)]" />
                          </div>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[44px] font-bold text-ink leading-[1.15] tracking-[-0.025em] mb-5">
              Hansı sahədən başlayaq?
            </h2>
            <p className="text-slate text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              Ehtiyacınızı birlikdə analiz edirik. Konkret plan, konkret
              qiymət — heç bir öhdəlik yoxdur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
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
            <div className="flex items-center justify-center gap-6 text-[14px]">
              <Link href="/projects" className="text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-medium transition-colors">
                Layihələrimizə baxın →
              </Link>
              <Link href="/blog" className="text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-medium transition-colors">
                Bloqu oxuyun →
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
