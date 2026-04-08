"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import GoldButton from "@/components/GoldButton";
import { api } from "@/lib/api";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "sarxanbabayevcontact@gmail.com",
    href: "mailto:sarxanbabayevcontact@gmail.com",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+994 50 201 71 64",
    href: "tel:+994502017164",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+994 50 201 71 64",
    href: "https://wa.me/994502017164",
  },
  {
    icon: MapPin,
    label: "Ünvan",
    value: "Bakı, Azərbaycan",
    href: null,
  },
  {
    icon: Clock,
    label: "İş saatları",
    value: "B.e – Cümə, 09:00 – 18:00",
    href: null,
  },
];

const inputCls =
  "w-full px-4 py-3 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink placeholder-mist-slate text-[15px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-3 focus:ring-[var(--color-gold-soft)] transition-all duration-200";

const labelCls = "block text-[13px] font-medium text-slate mb-1.5";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await api.submitContact(form);
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin və ya birbaşa email/WhatsApp ilə əlaqə saxlayın."
      );
    }
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 hero-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-gold)] mb-5"
          >
            Əlaqə
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="display font-[family-name:var(--font-display)] text-[40px] md:text-[56px] font-extrabold text-ink leading-[1.08] tracking-[-0.025em] mb-6"
          >
            Gəlin layihənizi müzakirə edək.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate text-[18px] md:text-[19px] leading-relaxed"
          >
            Pulsuz, öhdəliksiz. Eyni iş günü cavab. Forma doldurun,
            zəng vurun və ya WhatsApp ilə yazın — necə rahatdırsa.
          </motion.p>
        </div>
      </section>

      {/* ═══ CONTENT ═══ */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <AnimatedSection className="lg:col-span-2">
              <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-ink mb-6 tracking-[-0.01em]">
                Birbaşa əlaqə
              </h2>
              <ul className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4 p-4 bg-white border border-[var(--color-hairline)] rounded-xl card-lift">
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-gold-soft)] flex items-center justify-center flex-shrink-0">
                        <Icon size={18} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-mist-slate mb-0.5">
                          {item.label}
                        </div>
                        <div className="text-ink text-[15px] font-medium break-all">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection className="lg:col-span-3" delay={0.1}>
              <div className="bg-white border border-[var(--color-hairline)] rounded-2xl p-8 md:p-10">
                <h2 className="font-[family-name:var(--font-display)] text-[22px] font-bold text-ink mb-2 tracking-[-0.01em]">
                  Layihənizi təsvir edin
                </h2>
                <p className="text-slate text-[14.5px] mb-4">
                  Qısa məlumat verin — eyni iş günü konkret plan və qiymət təklifi alacaqsınız.
                </p>
                <div className="flex flex-wrap gap-4 mb-6 text-[13px] text-slate">
                  {[
                    { icon: Clock, text: "Eyni gün cavab" },
                    { icon: CheckCircle2, text: "Öhdəlik yoxdur" },
                    { icon: ShieldCheck, text: "Məlumatınız qorunur" },
                  ].map((t) => {
                    const TIcon = t.icon;
                    return (
                      <span key={t.text} className="flex items-center gap-1.5">
                        <TIcon size={14} strokeWidth={2} className="text-[var(--color-gold)]" />
                        {t.text}
                      </span>
                    );
                  })}
                </div>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-start gap-3"
                  >
                    <CheckCircle2 size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                    <div className="text-[14.5px]">
                      Mesajınız uğurla göndərildi. Eyni iş günü cavab veririk.
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-3">
                    <AlertCircle size={18} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
                    <div className="text-[14.5px]">{errorMsg}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Ad Soyad *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Telefon</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputCls}
                        placeholder="+994 XX XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Mövzu *</label>
                      <input
                        required
                        type="text"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className={inputCls}
                        placeholder="Web layihə müzakirəsi"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Layihə təsviri *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls} resize-none`}
                      placeholder="Biznesinizin nəyə ehtiyacı var? Hansı problemi həll etmək istəyirsiniz?"
                    />
                  </div>

                  <div className="pt-2">
                    <GoldButton
                      type="submit"
                      size="lg"
                      withArrow
                      className="w-full justify-center"
                    >
                      {status === "loading" ? "Göndərilir..." : "Pulsuz konsultasiya üçün göndərin"}
                    </GoldButton>
                    <p className="text-mist-slate text-[12.5px] mt-3 text-center">
                      Məlumatlarınız təhlükəsiz şəkildə qorunur və üçüncü tərəflə paylaşılmır.
                    </p>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
