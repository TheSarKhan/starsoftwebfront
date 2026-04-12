"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  Globe, Smartphone, ShieldCheck, Server, Zap, BarChart3, Bot, Puzzle,
  ChevronLeft, ChevronRight, ArrowUpRight,
} from "lucide-react";
import GoldButton from "@/components/GoldButton";
import BrandMark from "@/components/BrandMark";
import { motion } from "framer-motion";
import { Service } from "@/lib/api";

const SERVICE_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Globe, Smartphone, ShieldCheck, Server, Zap, BarChart3, Bot, Puzzle,
};

const fallbackServices: Service[] = [
  { id: 1, icon: "Globe",       titleAz: "Vebsayt",            descriptionAz: "Sürətli, SEO dostu, konversiyaya hesablanmış veb həllər.", order: 1 },
  { id: 2, icon: "Smartphone",  titleAz: "Mobil tətbiq",       descriptionAz: "iOS və Android üçün eyni keyfiyyətdə işləyən tətbiqlər.", order: 2 },
  { id: 3, icon: "ShieldCheck", titleAz: "Kibertəhlükəsizlik", descriptionAz: "Audit, penetrasiya testi və davamlı qoruma.", order: 3 },
  { id: 4, icon: "Server",      titleAz: "İnfrastruktur",      descriptionAz: "Saytınız və sistemləriniz dayanmadan, sürətlə işləsin.", order: 4 },
  { id: 5, icon: "Zap",         titleAz: "Avtomatlaşdırma",    descriptionAz: "Manual prosesləri sistemlərə çevirin.", order: 5 },
  { id: 6, icon: "BarChart3",   titleAz: "Biznes analitika",   descriptionAz: "Məlumatınızı qərara çevirən dashboard-lar.", order: 6 },
  { id: 7, icon: "Bot",         titleAz: "Telegram botlar",    descriptionAz: "Müştəriləriniz artıq Telegram-dadır — siz də orada olun.", order: 7 },
  { id: 8, icon: "Puzzle",      titleAz: "Chrome extensions",  descriptionAz: "Brauzer üzərindən iş axınını sürətləndirin.", order: 8 },
] as unknown as Service[];

const manifesto = [
  "Layihə bitdikdən sonra da zəngə cavab veririk. :)",
  "Qiymət sabitdir, söz möhkəmdir.",
  "Problem yaransa — qaçmırıq, həll edirik.",
];

const stats = [
  { stat: "10+",  label: "Tamamlanmış layihə"      },
  { stat: "8",    label: "Xidmət sahəsi"            },
  { stat: "3+",   label: "İl komanda təcrübəsi"     },
  { stat: "2 ay", label: "Ödənişsiz texniki dəstək" },
];

const steps = [
  {
    n: "01", title: "Dinləyirik",
    body: "Biznes ehtiyacınızı analiz edirik. Nə lazım nə lazım deyil — açıq, dürüst. Birbaşa texniki rəhbərlə danışırsınız.",
  },
  {
    n: "02", title: "Plan veririk",
    body: "İş həcmi, müddət, sabit qiymət — hər şey başlamadan razılaşdırılır. Gizli xərc yoxdur, iş həcmi dəyişmir.",
  },
  {
    n: "03", title: "İcra edirik",
    body: "Mütəxəssislər seçilir, iş başlayır. Hər mərhələdə görürsünüz nə baş verir. Tamamlanandan sonra da yanındayıq.",
  },
];

const TOTAL_SLIDES = 5;

/* ── Slide wrapper ── */
function SlideHeader({ section, subtitle, n }: { section: string; subtitle?: string; n: string }) {
  return (
    <div className="border-b border-[var(--color-hairline)] px-6 md:px-10 py-3 flex items-center justify-between flex-shrink-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)]">{section}</p>
      {subtitle && <p className="text-[12px] text-[var(--color-slate)] hidden lg:block">{subtitle}</p>}
      <span className="font-mono text-[12px] text-[var(--color-slate)]/60">{n}</span>
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-play: hər 5 saniyədən bir növbəti slaydə keç */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startAuto = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        const next = Math.round(el.scrollLeft / el.clientWidth);
        const target = next < TOTAL_SLIDES - 1 ? next + 1 : 0;
        setCurrentSlide(target);
        el.scrollTo({ left: target * el.clientWidth, behavior: "smooth" });
      }, 10000);
    };

    const stopAuto = () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    startAuto();
    el.addEventListener("pointerdown", stopAuto);
    el.addEventListener("wheel", stopAuto, { passive: true });

    return () => {
      stopAuto();
      el.removeEventListener("pointerdown", stopAuto);
      el.removeEventListener("wheel", stopAuto);
    };
  }, []);

  const displayServices = fallbackServices;

  /* Wheel → horizontal on desktop */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY * 1.3 });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* Track current slide */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (window.innerWidth < 768) return;
      setCurrentSlide(Math.round(el.scrollLeft / el.clientWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* Keyboard arrows */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = containerRef.current;
      if (!el || window.innerWidth < 768) return;
      if (e.key === "ArrowRight") el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
      if (e.key === "ArrowLeft")  el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* goToSlide */
  const goToSlide = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    setCurrentSlide(i);
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <>
      {/* ════════════════════════════════════════
          SCROLL CONTAINER
      ════════════════════════════════════════ */}
      <div ref={containerRef} className="h-scroll-container">

        {/* ── SLIDE 1 · HERO — Newspaper Front Page ── */}
        <section className="h-slide flex flex-col">

          {/* Masthead */}
          <div className="border-b border-[var(--color-hairline)] px-6 md:px-10 py-3 flex items-center justify-between flex-shrink-0">
            <span className="font-[family-name:var(--font-display)] text-[13px] font-bold tracking-[0.12em] uppercase text-[var(--color-ink)]">
              StarSoft.az
            </span>
            <span className="text-[12px] text-[var(--color-slate)] hidden md:block tracking-wide">
              Bakı, Azərbaycan · IT Tərəfdaş
            </span>
            <span className="font-mono text-[12px] text-[var(--color-slate)]/60 tabular-nums">
              2025
            </span>
          </div>

          {/* Body: 2 columns on desktop */}
          <div className="flex-1 grid md:grid-cols-[1fr_1px_360px] lg:grid-cols-[1fr_1px_420px] overflow-hidden">

            {/* Left — big headline */}
            <div className="p-6 md:p-12 flex flex-col justify-between overflow-hidden">
              <div>
                <h1 className="font-[family-name:var(--font-display)] text-[48px] md:text-[68px] lg:text-[84px] font-extrabold text-[var(--color-ink)] leading-[0.93] tracking-[-0.035em]">
                  Azərbaycan<br />
                  biznesinin<br />
                  <em className="not-italic text-[var(--color-gold)]">texnoloji</em><br />
                  tərəfdaşı.<sup className="text-[var(--color-gold)] text-[0.4em] align-super ml-0.5">✦</sup>
                </h1>
              </div>
              <div>
                <p className="text-[15px] md:text-[16px] text-[var(--color-slate)] leading-relaxed mb-8 max-w-md">
                  Vebsayt, mobil tətbiq, kibertəhlükəsizlik, infrastruktur, avtomatlaşdırma və daha çox —
                  bir tərəfdaşdan, sabit qiymətə.
                </p>
                <div className="flex gap-4 items-center flex-wrap mb-6">
                  <GoldButton href="/contact" size="lg" withArrow>
                    Pulsuz konsultasiya alın
                  </GoldButton>
                  <Link
                    href="/projects"
                    className="text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1"
                  >
                    Layihələrimiz <ArrowUpRight size={14} strokeWidth={2} />
                  </Link>
                </div>
                <p className="text-[12px] text-[var(--color-slate)]/50 flex items-start gap-1.5">
                  <span className="text-[var(--color-gold)] text-[10px] mt-0.5">✦</span>
                  Bakıda yerləşən, Azərbaycan biznesi üçün qurulan komanda.
                </p>
              </div>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block bg-[var(--color-hairline)]" />

            {/* Right — logo + manifesto + service list */}
            <div className="hidden md:flex flex-col overflow-hidden">
              <div className="border-b border-[var(--color-hairline)] flex items-center justify-center py-8 flex-shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                >
                  <BrandMark theme="gold-on-light" size={72} />
                </motion.div>
              </div>
              <div className="border-b border-[var(--color-hairline)] flex-shrink-0 flex items-center justify-center p-8" style={{ backgroundColor: "#B8893A" }}>
                <div className="flex flex-col items-center gap-3">
                  <h3 className="font-[family-name:var(--font-display)] text-[26px] font-extrabold tracking-[-0.02em]" style={{ color: "#FFFFFF" }}>
                    Hazır həllər
                  </h3>
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#B8893A] bg-white rounded-full">
                    Yaxında
                  </span>
                </div>
              </div>
              <div className="p-8 flex-1 overflow-hidden">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-5">
                  Xidmətlər
                </p>
                <div className="space-y-2.5">
                  {displayServices.map((s) => (
                    <div key={s.id} className="flex items-center gap-2.5 text-[15px] text-[var(--color-ink)]">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-gold)] flex-shrink-0" />
                      {s.titleAz}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-[var(--color-hairline)] px-6 md:px-10 py-4 hidden md:grid grid-cols-4 flex-shrink-0">
            {stats.map((s, i) => (
              <div key={i} className={`flex items-center gap-3 ${i > 0 ? "border-l border-[var(--color-hairline)] pl-6" : ""}`}>
                <span className="font-[family-name:var(--font-display)] text-[28px] font-extrabold text-[var(--color-ink)] leading-none tracking-[-0.03em]">
                  {s.stat}
                </span>
                <span className="text-[12px] text-[var(--color-slate)] leading-tight">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SLIDE 2 · SERVICES — Split editorial ── */}
        <section className="h-slide flex flex-col">
          <SlideHeader section="Xidmətlər" n="02" />

          <div className="flex-1 grid md:grid-cols-[320px_1px_1fr] lg:grid-cols-[380px_1px_1fr] overflow-hidden">

            {/* Left — headline */}
            <div className="hidden md:flex flex-col justify-between p-10 lg:p-12">
              <h2 className="font-[family-name:var(--font-display)] text-[36px] lg:text-[44px] font-extrabold text-[var(--color-ink)] leading-[1.05] tracking-[-0.03em]">
                Bir tərəfdaş.<br />
                <em className="not-italic text-[var(--color-gold)]">Səkkiz sahə.</em>
              </h2>
              <Link
                href="/services"
                className="text-[13px] font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] flex items-center gap-1.5 transition-colors"
              >
                Ətraflı bax <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Divider */}
            <div className="hidden md:block bg-[var(--color-hairline)]" />

            {/* Right — services list */}
            <div className="overflow-hidden flex flex-col divide-y divide-[var(--color-hairline)]">
              {displayServices.map((s, i) => {
                const Icon = SERVICE_ICONS[s.icon] || Globe;
                return (
                  <div key={s.id} className="flex-1 flex items-center gap-4 px-6 md:px-8 py-0 min-h-0">
                    <span className="font-mono text-[11px] text-[var(--color-slate)]/30 flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon size={13} strokeWidth={1.5} className="text-[var(--color-gold)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="font-[family-name:var(--font-display)] text-[14px] md:text-[16px] font-bold text-[var(--color-ink)] tracking-[-0.01em]">
                        {s.titleAz}
                      </span>
                      <span className="hidden md:inline text-[var(--color-slate)]/40 mx-2">—</span>
                      <span className="hidden md:inline text-[13px] text-[var(--color-slate)]">
                        {s.descriptionAz}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── SLIDE 3 · THE CASE — Problem / Solution ── */}
        <section className="h-slide flex flex-col">
          <SlideHeader section="Niyə StarSoft" subtitle="Daha az resursla, daha çox iş." n="03" />

          <div className="flex-1 grid md:grid-cols-[1fr_1px_1fr] overflow-hidden">

            {/* Left — before / now */}
            <div className="flex flex-col overflow-hidden divide-y divide-[var(--color-hairline)]">

              {/* Əvvəl */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)]/50 mb-5">
                  Əvvəl
                </p>
                <div className="space-y-2">
                  {[
                    "Aylıq 8–12 min AZN — işləsin ya işləməsin.",
                    "Komanda yığmaq aylar aparır.",
                    "Texniki işçi ayrılsa, layihə dayanır.",
                    "Ofis və avadanlıq — istifadə olunsa da, olunmasa da xərc.",
                  ].map((line, i) => (
                    <p key={i} className="text-[14px] md:text-[15px] text-[var(--color-slate)]/50 leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              {/* İndi */}
              <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-gold)] mb-5">
                  StarSoft ilə
                </p>
                <div className="space-y-2">
                  {[
                    "Sabit aylıq xərc",
                    "Aylarca əməkdaş axtarışı",
                    "İşçi ayrılma riski",
                    "Ofis və avadanlıq xərci",
                  ].map((item) => (
                    <p key={item} className="text-[15px] md:text-[16px] text-[var(--color-slate)] line-through decoration-[var(--color-gold)] decoration-[1.5px]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>

            </div>

            {/* Vertical rule */}
            <div className="hidden md:block bg-[var(--color-hairline)]" />

            {/* Right — manifesto */}
            <div className="hidden md:flex flex-col overflow-hidden">
              <div className="px-10 pt-10 pb-6 border-b border-[var(--color-hairline)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)]">
                  StarSoft olaraq vədlərimiz
                </p>
              </div>
              <div className="flex-1 flex flex-col divide-y divide-[var(--color-hairline)]">
                {manifesto.map((line, i) => (
                  <div key={i} className="flex-1 px-10 py-6 flex flex-col justify-between">
                    <span className="font-mono text-[11px] text-[var(--color-gold)] mb-3 block">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-[family-name:var(--font-display)] text-[18px] md:text-[22px] font-bold text-[var(--color-ink)] leading-snug tracking-[-0.02em]">
                      {line}
                    </p>
                  </div>
                ))}
              </div>
              <div className="px-10 py-6 border-t border-[var(--color-hairline)]">
                <Link
                  href="/about"
                  className="text-[13px] font-semibold text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] flex items-center gap-1.5 transition-colors"
                >
                  Haqqımızda daha çox <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── SLIDE 4 · PROCESS ── */}
        <section className="h-slide flex flex-col">
          <SlideHeader section="Necə işləyirik" subtitle="Fikirdən nəticəyə — üç addımda." n="04" />

          {/* Headline */}
          <div className="px-6 md:px-10 py-6 md:py-8 border-b border-[var(--color-hairline)] flex-shrink-0">
            <h2 className="font-[family-name:var(--font-display)] text-[36px] md:text-[52px] font-extrabold text-[var(--color-ink)] leading-[1.0] tracking-[-0.03em]">
              Fikirdən nəticəyə.
            </h2>
          </div>

          {/* 3 columns */}
          <div className="flex-1 grid md:grid-cols-3 divide-x divide-[var(--color-hairline)] overflow-hidden">
            {steps.map((step, i) => (
              <div key={i} className="p-6 md:p-10 lg:p-12 flex flex-col justify-between overflow-hidden">
                <div>
                  <span className="font-mono text-[13px] text-[var(--color-slate)]/40 block mb-8 md:mb-10">
                    {step.n}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-[26px] md:text-[32px] lg:text-[38px] font-bold text-[var(--color-ink)] mb-4 leading-tight tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-[var(--color-slate)] leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SLIDE 5 · CTA ── */}
        <section className="h-slide flex flex-col">
          <SlideHeader section="Əlaqə" n="05" />

          <div className="flex-1 grid md:grid-cols-[1fr_1px_1fr] overflow-hidden">

            {/* Left — CTA */}
            <div className="p-6 md:p-12 lg:p-16 flex flex-col justify-center overflow-hidden">
              <h2 className="font-[family-name:var(--font-display)] text-[40px] md:text-[56px] lg:text-[68px] font-extrabold text-[var(--color-ink)] leading-[0.93] tracking-[-0.035em] mb-8">
                Layihənizi<br />
                birlikdə<br />
                qurarıq.
              </h2>
              <p className="text-[15px] text-[var(--color-slate)] leading-relaxed mb-10 max-w-sm">
                Eyni iş günü cavab veririk — ehtiyacınızı dinləyir, konkret plan və sabit qiymət təklif edirik.
              </p>
              <div className="flex flex-col gap-4 items-start">
                <GoldButton href="/contact" size="lg" withArrow>
                  Pulsuz konsultasiya alın
                </GoldButton>
                <a
                  href="https://wa.me/994502017164"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-semibold text-[var(--color-slate)] hover:text-[var(--color-ink)] transition-colors flex items-center gap-1.5"
                >
                  WhatsApp ilə yazın <ArrowUpRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>

            {/* Vertical rule */}
            <div className="hidden md:block bg-[var(--color-hairline)]" />

            {/* Right — contact details */}
            <div className="hidden md:flex p-12 lg:p-16 flex-col justify-center overflow-hidden">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-10">
                Əlaqə məlumatları
              </p>
              <div className="space-y-8">
                {[
                  { label: "E-poçt",             value: "sarxanbabayevcontact@gmail.com" },
                  { label: "WhatsApp / Telefon",  value: "+994 50 201 71 64"             },
                  { label: "Yer",                 value: "Bakı, Azərbaycan"              },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[12px] text-[var(--color-slate)] mb-1.5">{label}</p>
                    <p className="font-[family-name:var(--font-display)] text-[18px] font-semibold text-[var(--color-ink)]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>{/* /h-scroll-container */}

      {/* ── Nav dots (desktop) ── */}
      <div className="hidden md:flex fixed bottom-6 left-1/2 -translate-x-1/2 gap-2 z-40 items-center">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Slayd ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSlide === i
                ? "w-8 bg-[var(--color-gold)]"
                : "w-2 bg-[var(--color-hairline-strong)] hover:bg-[var(--color-slate)]"
            }`}
          />
        ))}
      </div>

      {/* ── Prev arrow ── */}
      {currentSlide > 0 && (
        <button
          onClick={() => goToSlide(currentSlide - 1)}
          className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center bg-white/90 backdrop-blur border border-[var(--color-hairline)] rounded-full shadow-sm hover:border-[var(--color-gold)] transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={2} className="text-[var(--color-ink)]" />
        </button>
      )}

      {/* ── Next arrow ── */}
      {currentSlide < TOTAL_SLIDES - 1 && (
        <button
          onClick={() => goToSlide(currentSlide + 1)}
          className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 w-10 h-10 items-center justify-center bg-white/90 backdrop-blur border border-[var(--color-hairline)] rounded-full shadow-sm hover:border-[var(--color-gold)] transition-colors"
        >
          <ChevronRight size={18} strokeWidth={2} className="text-[var(--color-ink)]" />
        </button>
      )}
    </>
  );
}
