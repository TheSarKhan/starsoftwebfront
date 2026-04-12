"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe, Smartphone, ShieldCheck, Server,
  Zap, BarChart3, Bot, ArrowUpRight, Check, Puzzle,
} from "lucide-react";
import GoldButton from "@/components/GoldButton";

const services = [
  {
    id: "web",
    icon: Globe,
    title: "Vebsayt",
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
    tagline: "iOS və Android üçün eyni keyfiyyətdə işləyən tətbiqlər.",
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
      "Bir hack hadisəsi biznesin reputasiyasını məhv edə bilər. Sistemlərinizi proaktiv olaraq qoruyuruq.",
    deliverables: [
      "Tam təhlükəsizlik auditi və hesabat",
      "Penetrasiya testi (web, mobil, infrastruktur)",
      "Boşluqların aradan qaldırılması",
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
      "Yenilik buraxanda sistem çökməsin, saytınız gecə-gündüz işləsin, problem olanda dərhal biləsiniz.",
    deliverables: [
      "Avtomatik buraxılış — yenilik bir kliklə yayılır",
      "Server və hosting qurulması (AWS, Azure, DigitalOcean)",
      "Dayanmadan işləmə üçün monitorinq sistemi",
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
      "Hər həftə təkrarlanan əl işləri — hesabat, fakturalama, məlumat köçürmə — bir dəfə qurulan sistemə çevrilir.",
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
      "Excel cədvəlləri arasında itən məlumat — bir baxışda anlaşılan dashboard-a çevrilir. Qərarlar hisslərlə yox, faktlarla.",
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
      "Sifariş qəbulu, müştəri dəstəyi, bildirişlər, CRM inteqrasiya — hamısı bir Telegram botda.",
    deliverables: [
      "Sifariş və rezervasiya qəbulu",
      "Avtomatik müştəri dəstəyi (FAQ, status sorğusu)",
      "Bildiriş sistemi (sifariş, ödəniş, xatırlatma)",
      "CRM / admin panelinizlə inteqrasiya",
      "Çoxdilli dəstək (az/en/ru)",
    ],
  },
  {
    id: "extension",
    icon: Puzzle,
    title: "Chrome extensions",
    tagline: "Brauzer üzərindən iş axınını sürətləndirin.",
    description:
      "Müştərilərinizin və ya komandanızın gündəlik istifadə etdiyi brauzeri güclü bir iş alətinə çevirin — xüsusi Chrome extension ilə.",
    deliverables: [
      "Xüsusi funksionallıq olan Chrome extension",
      "Saytlarla real-time inteqrasiya (scraping, autofill, overlay)",
      "Backend API ilə sinxronizasiya",
      "Chrome Web Store-a yerləşdirmə",
      "Yenilənmə və dəstək",
    ],
  },
];

export default function ServicesPage() {
  const [active, setActive] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (autoRef.current) clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 8000);
  };

  useEffect(() => {
    startAuto();
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectService = (i: number) => {
    setActive(i);
    startAuto(); // istifadəçi seçim etdikdə timer sıfırlanır
  };

  const s = services[active];
  const ActiveIcon = s.icon;

  return (
    <div className="pt-16">


      {/* ── Hero: split layout ── */}
      <section className="border-b border-[var(--color-hairline)] grid md:grid-cols-[1fr_1px_400px] lg:grid-cols-[1fr_1px_460px]">
        <div className="px-6 md:px-12 py-14 md:py-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-[52px] md:text-[72px] lg:text-[88px] font-extrabold text-[var(--color-ink)] leading-[0.93] tracking-[-0.035em]"
          >
            Hər ehtiyac<br />
            üçün<br />
            <em className="not-italic text-[var(--color-gold)]">düzgün həll.</em>
          </motion.h1>
        </div>

        <div className="hidden md:block bg-[var(--color-hairline)]" />

        <div className="hidden md:flex px-10 lg:px-12 flex-col justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-5"
          >
            Hər layihənin ehtiyacını analiz edir, uyğun mütəxəssisləri
            seçirik. Siz yalnız real lazım olan üçün ödəyirsiniz.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="text-[16px] text-[var(--color-slate)] leading-relaxed"
          >
            Birbaşa texniki rəhbərlə danışırsınız — arada menecer,
            satış təmsilçisi, vasitəçi yoxdur.
          </motion.p>
        </div>
      </section>

      {/* ── DESKTOP: Interactive two-panel ── */}
      <section className="hidden md:grid grid-cols-[380px_1px_1fr] lg:grid-cols-[420px_1px_1fr] border-b border-[var(--color-hairline)]">

        {/* Left: service list */}
        <div>
          {services.map((sv, i) => (
            <button
              key={sv.id}
              onMouseEnter={() => selectService(i)}
              onClick={() => selectService(i)}
              className={`w-full text-left px-8 py-5 border-b flex items-center justify-between group transition-colors duration-150 ${
                active === i
                  ? "border-[var(--color-gold)] bg-[var(--color-gold-soft)]"
                  : "border-[var(--color-hairline)] hover:bg-[var(--color-mist)]"
              }`}
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-[11px] text-[var(--color-slate)]/40 w-6">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-[family-name:var(--font-display)] text-[19px] font-bold leading-none transition-colors ${
                    active === i
                      ? "text-[var(--color-gold)]"
                      : "text-[var(--color-ink)] group-hover:text-[var(--color-gold)]"
                  }`}
                >
                  {sv.title}
                </span>
              </div>
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className={`flex-shrink-0 transition-all duration-200 ${
                  active === i
                    ? "text-[var(--color-gold)] opacity-100"
                    : "opacity-0 group-hover:opacity-60 -translate-x-1 group-hover:translate-x-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Vertical rule */}
        <div className="bg-[var(--color-hairline)]" />

        {/* Right: sticky detail */}
        <div className="relative">
          <div className="sticky top-24 p-10 lg:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-gold-soft)] flex items-center justify-center mb-8">
                  <ActiveIcon size={22} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-[32px] font-bold text-[var(--color-ink)] mb-2 tracking-[-0.02em]">
                  {s.title}
                </h2>
                <p className="text-[14px] font-medium text-[var(--color-gold-hover)] mb-6">
                  {s.tagline}
                </p>
                <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-10">
                  {s.description}
                </p>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-slate)] mb-5">
                    Nə təhvil veririk
                  </p>
                  <ul className="space-y-3">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[15px] text-[var(--color-ink)]">
                        <div className="w-5 h-5 rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check size={11} strokeWidth={3} className="text-[var(--color-gold)]" />
                        </div>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── MOBILE: Accordion ── */}
      <section className="md:hidden border-b border-[var(--color-hairline)]">
        {services.map((sv, i) => {
          const Icon = sv.icon;
          const open = expandedMobile === i;
          return (
            <div key={sv.id} className="border-b border-[var(--color-hairline)] last:border-0">
              <button
                onClick={() => setExpandedMobile(open ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-[var(--color-slate)]/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-[family-name:var(--font-display)] text-[18px] font-bold text-[var(--color-ink)]">
                    {sv.title}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={16} strokeWidth={2} className="text-[var(--color-gold)]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-8 pt-2">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-gold-soft)] flex items-center justify-center mb-5">
                        <Icon size={18} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                      </div>
                      <p className="text-[14px] font-medium text-[var(--color-gold-hover)] mb-3">
                        {sv.tagline}
                      </p>
                      <p className="text-[15px] text-[var(--color-slate)] leading-relaxed mb-6">
                        {sv.description}
                      </p>
                      <ul className="space-y-2.5">
                        {sv.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-3 text-[14px] text-[var(--color-ink)]">
                            <Check size={14} strokeWidth={2.5} className="text-[var(--color-gold)] flex-shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      {/* ── CTA ── */}
      <section className="py-16 md:py-24">
        <div className="px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <h2 className="font-[family-name:var(--font-display)] text-[36px] md:text-[52px] font-bold text-[var(--color-ink)] leading-[1.1] tracking-[-0.025em] mb-6">
              Hansı sahədən başlayaq?
            </h2>
            <p className="text-[16px] text-[var(--color-slate)] leading-relaxed mb-8">
              Ehtiyacınızı birlikdə analiz edirik. Konkret plan, konkret
              qiymət — heç bir öhdəlik yoxdur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <GoldButton href="/contact" size="lg" withArrow>
                Pulsuz konsultasiya alın
              </GoldButton>
              <Link
                href="/projects"
                className="text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1.5 sm:pt-3.5"
              >
                Layihələrimizə baxın <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
