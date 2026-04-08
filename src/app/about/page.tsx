"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GoldButton from "@/components/GoldButton";

const principles = [
  {
    title: "Sözdə yox, işdə",
    body: "Vəd verdiyimizi vaxtında, tam həcmdə təhvil veririk. Şişirdilmiş satış danışığı yoxdur.",
  },
  {
    title: "Sabit qiymət",
    body: "İş başlamadan iş həcmi və qiymət razılaşılır. Sürpriz fakturalar olmur.",
  },
  {
    title: "Eyni iş günü cavab",
    body: "Sorğularınıza saatlarla cavab veririk. Qərarlar günlərlə uzadılmır.",
  },
  {
    title: "Davamlı tərəfdaşlıq",
    body: "Layihə bitəndən sonra da yanınızdayıq. Buraxıb getmirik, böyüməyinizi izləyirik.",
  },
];

export default function AboutPage() {
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
            Haqqımızda
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[40px] md:text-[56px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mb-6"
          >
            Bakıdan başlayan{" "}
            <span className="text-[var(--color-gold)]">bir niyyət</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[19px] leading-relaxed"
          >
            KhanSoft Azərbaycan biznesinə daha az resursla daha çox iş görməyi
            mümkün etmək üçün quruldu.
          </motion.p>
        </div>
      </section>

      {/* ═══ STORY ═══ */}
      <section className="py-14 md:py-16">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <p className="text-ink text-[18px] leading-[1.75] mb-6">
                Bakıda biznes sahibləri ilə danışanda bir mənzərə təkrarlanırdı:
                ya bahalı xarici agentliklərə güclərinin çatmadığını deyirdilər,
                ya da daxili IT komanda saxlamağın ayda 8–12 min AZN xərc
                olduğunu. Üçüncü yol — freelancerlər — bu gün var, sabah yoxdur.
              </p>
              <p className="text-ink text-[18px] leading-[1.75] mb-6">
                Aradakı boşluq aydın idi: sahibkarlara{" "}
                <strong className="font-semibold">etibarlı, uyğun qiymətli,
                müasir və operativ</strong> texnologiya tərəfdaşı lazımdır.
                Sözündə duran. Layihəni başa çatdıran. Sonra da yanında qalan.
              </p>
              <p className="text-ink text-[18px] leading-[1.75] mb-6">
                KhanSoft bu boşluğu doldurmaq üçün Bakıda quruldu. Adımız
                tarixi &ldquo;xan&rdquo; sözündən gəlir — gücü, nüfuzu və
                qətiyyəti təmsil edir. Əsas vədimiz isə sadədir:{" "}
                <span className="text-[var(--color-gold)] font-semibold">
                  daha az resursla, daha çox iş.
                </span>
              </p>
              <p className="text-ink text-[18px] leading-[1.75]">
                Hər layihə üçün ehtiyaca uyğun mütəxəssislər seçirik: web
                developer, mobil developer, infrastruktur mühəndisi,
                təhlükəsizlik analitiki, biznes analitik. Siz yalnız real lazım
                olan üçün ödəyirsiniz. Altı sahənin hamısı bir tərəfdaşda,
                sabit qiymətə, açıq iş həcmi ilə.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ HOW WE WORK ═══ */}
      <section className="py-14 md:py-16 bg-mist">
        <div className="max-w-3xl mx-auto px-4">
          <AnimatedSection>
            <div className="bg-white border border-[var(--color-hairline)] rounded-2xl p-8 md:p-12">
              <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
                Niyə belə işləyirik
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[34px] font-bold text-ink leading-[1.2] tracking-[-0.02em] mb-5">
                Hər layihəyə uyğun komanda.
              </h2>
              <p className="text-slate text-[17px] leading-relaxed mb-5">
                Hər layihənin ehtiyacını analiz edir, uyğun mütəxəssisləri
                seçirik: web developer, mobil developer, dizayner, infrastruktur
                mühəndisi, təhlükəsizlik analitiki, biznes analitik. Siz yalnız
                real lazım olan üçün ödəyirsiniz.
              </p>
              <p className="text-slate text-[17px] leading-relaxed mb-5">
                Hər rolu uyğun mütəxəssis görür, layihəniz bürokratiya ilə yox,
                real işlə başlayır. Birbaşa texniki rəhbərlə danışırsınız —
                arada menecer, satış təmsilçisi, vasitəçi yoxdur.
              </p>
              <p className="text-slate text-[17px] leading-relaxed">
                Nəticədə bir tərəfdaş, bir hesab, bir məsuliyyət. Layihənizi
                kimin idarə etdiyini, kimə zəng vuracağınızı, kimin cavabdeh
                olduğunu həmişə bilirsiniz.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ PRINCIPLES ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection className="text-center mb-14 max-w-2xl mx-auto">
            <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
              Necə işləyirik
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[40px] font-bold text-ink leading-[1.15] tracking-[-0.02em]">
              Dörd prinsip. Heç bir istisna.
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-hairline)] rounded-2xl overflow-hidden border border-[var(--color-hairline)]">
            {principles.map((p, i) => (
              <AnimatedSection key={p.title} delay={i * 0.08}>
                <div className="bg-white p-8 h-full">
                  <h3 className="font-[family-name:var(--font-display)] text-[20px] font-bold text-ink mb-3 tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="text-slate text-[15px] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FLAGSHIP REFERENCE ═══ */}
      <section className="py-14 md:py-16 bg-mist">
        <div className="max-w-4xl mx-auto px-4">
          <AnimatedSection>
            <div className="bg-white border border-[var(--color-hairline)] rounded-2xl p-8 md:p-12">
              <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-4">
                Flagship referans
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-[28px] md:text-[34px] font-bold text-ink leading-[1.2] tracking-[-0.02em] mb-5">
                testup.az
              </h2>
              <p className="text-slate text-[17px] leading-relaxed mb-6">
                Müasir imtahan və test platforması — sıfırdan qurulub,
                davamlı dəstəklənir. Fikirdən canlı məhsula, sabit qiymətlə
                — KhanSoft yanaşmasının real nümunəsi.
              </p>
              <a
                href="https://testup.az"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] font-semibold text-[15px] transition-colors"
              >
                testup.az saytına baxın
                <ExternalLink size={15} strokeWidth={2.25} />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[44px] font-bold text-ink leading-[1.15] tracking-[-0.025em] mb-5">
              Layihənizi müzakirə edək.
            </h2>
            <p className="text-slate text-[17px] leading-relaxed max-w-xl mx-auto mb-8">
              Ehtiyacınızı dinləyir, konkret plan və sabit qiymət təklif
              edirik — heç bir öhdəlik yoxdur.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <GoldButton href="/contact" size="lg" withArrow>
                Layihənizi müzakirə edək
              </GoldButton>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold rounded-lg border border-[var(--color-hairline-strong)] text-ink hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
              >
                Xidmətlərimizə baxın
                <ArrowRight size={16} strokeWidth={2.25} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
