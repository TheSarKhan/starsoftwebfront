"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import GoldButton from "@/components/GoldButton";
import { api } from "@/lib/api";

const contactRows = [
  { label: "E-poçt",        value: "sarxanbabayevcontact@gmail.com", href: "mailto:sarxanbabayevcontact@gmail.com" },
  { label: "Telefon",       value: "+994 50 201 71 64",              href: "tel:+994502017164" },
  { label: "WhatsApp",      value: "+994 50 201 71 64",              href: "https://wa.me/994502017164" },
  { label: "Ünvan",         value: "Bakı, Azərbaycan",              href: null },
  { label: "İş saatları",  value: "Bazar ertəsi – Cümə, 09:00 – 18:00",    href: null },
];

const inputCls =
  "w-full px-4 py-3 bg-white border border-[var(--color-hairline-strong)] text-[var(--color-ink)] placeholder-[var(--color-mist-slate)] text-[15px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-3 focus:ring-[var(--color-gold-soft)] transition-all duration-200 rounded-lg";

const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--color-slate)] mb-2";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
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
            Layihənizi<br />
            <em className="not-italic text-[var(--color-gold)]">müzakirə</em><br />
            edək.
          </motion.h1>
        </div>

        <div className="hidden md:block bg-[var(--color-hairline)]" />

        <div className="hidden md:flex px-10 lg:px-12 flex-col justify-center gap-5">
          {[
            { n: "01", text: "Eyni iş günü cavab veririk." },
            { n: "02", text: "Konkret plan və sabit qiymət təklif edirik." },
            { n: "03", text: "Konsultasiya tamamilə pulsuzdur." },
          ].map(({ n, text }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-4"
            >
              <span className="font-mono text-[11px] text-[var(--color-slate)]/40 pt-1 flex-shrink-0">{n}</span>
              <p className="text-[16px] text-[var(--color-ink)] font-medium leading-snug">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Main: contact info + form ── */}
      <section className="grid md:grid-cols-[320px_1px_1fr] lg:grid-cols-[360px_1px_1fr] min-h-[520px]">

        {/* Left: contact info rows */}
        <div>
          {contactRows.map(({ label, value, href }, i) => {
            const inner = (
              <div className="px-6 md:px-10 py-6 border-b border-[var(--color-hairline)] last:border-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-slate)] mb-1.5">
                  {label}
                </p>
                <p className={`text-[15px] font-medium leading-snug ${href ? "text-[var(--color-ink)] hover:text-[var(--color-gold)] transition-colors" : "text-[var(--color-ink)]"}`}>
                  {value}
                </p>
              </div>
            );
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              >
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Vertical rule */}
        <div className="hidden md:block bg-[var(--color-hairline)]" />

        {/* Right: form */}
        <div className="px-6 md:px-10 lg:px-14 py-10">
          <AnimatePresence mode="wait">

            {/* Success state */}
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col justify-center py-12"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center mb-8">
                  <CheckCircle2 size={22} strokeWidth={2} className="text-[var(--color-gold)]" />
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-[32px] md:text-[44px] font-bold text-[var(--color-ink)] leading-[1.1] tracking-[-0.025em] mb-4">
                  Mesajınız çatdı.
                </h2>
                <p className="text-[16px] text-[var(--color-slate)] leading-relaxed max-w-sm">
                  Eyni iş günü sizinlə əlaqə saxlayacağıq — konkret plan
                  və qiymət təklifi ilə.
                </p>
              </motion.div>
            )}

            {/* Form state */}
            {status !== "success" && (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--color-slate)] mb-8">
                  Layihənizi təsvir edin
                </p>

                {status === "error" && (
                  <div className="mb-6 flex items-start gap-3 text-[14px] text-[var(--color-error)]">
                    <AlertCircle size={16} strokeWidth={2} className="flex-shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-5">
                    <GoldButton
                      type="submit"
                      size="lg"
                      withArrow
                    >
                      {status === "loading" ? "Göndərilir..." : "Göndərin"}
                    </GoldButton>
                  </div>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
