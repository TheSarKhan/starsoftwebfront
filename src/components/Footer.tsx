"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import BrandMark from "@/components/BrandMark";

const sections = [
  {
    title: "Şirkət",
    links: [
      { label: "Haqqımızda", href: "/about" },
      { label: "Layihələr", href: "/projects" },
      { label: "Əlaqə", href: "/contact" },
    ],
  },
  {
    title: "Xidmətlər",
    links: [
      { label: "Vebsayt", href: "/services#web" },
      { label: "Mobil tətbiq", href: "/services#mobile" },
      { label: "Kibertəhlükəsizlik", href: "/services#security" },
      { label: "İnfrastruktur", href: "/services#devops" },
      { label: "Avtomatlaşdırma", href: "/services#automation" },
      { label: "Biznes analitika", href: "/services#analytics" },
      { label: "Telegram botlar", href: "/services#telegram" },
      { label: "Chrome extensions", href: "/services#extension" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-hairline)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
                <BrandMark size={40} radius={10} />
              </motion.div>
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink tracking-tight">
                StarSoft
              </span>
            </Link>
            <p className="text-slate text-[15px] leading-relaxed max-w-md">
              Texnologiyanızı ulduzlara çatdırırıq. Web, mobil,
              təhlükəsizlik, infrastruktur, avtomatlaşdırma və analitika —
              bir tərəfdaşdan, sabit qiymətə.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h4 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-ink uppercase tracking-[0.12em] mb-4">
              {sections[0].title}
            </h4>
            <ul className="space-y-2.5">
              {sections[0].links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate hover:text-[var(--color-gold)] text-[14px] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-ink uppercase tracking-[0.12em] mb-4">
              {sections[1].title}
            </h4>
            <ul className="space-y-2.5">
              {sections[1].links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-slate hover:text-[var(--color-gold)] text-[14px] transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-ink uppercase tracking-[0.12em] mb-4">
              Əlaqə
            </h4>
            <ul className="space-y-3 text-[14px] text-slate">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <span>Bakı, Azərbaycan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <a href="tel:+994502017164" className="hover:text-[var(--color-gold)] transition-colors">
                  +994 50 201 71 64
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <a
                  href="mailto:sarxanbabayevcontact@gmail.com"
                  className="hover:text-[var(--color-gold)] transition-colors break-all"
                >
                  sarxanbabayevcontact@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-hairline)] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-mist-slate">
          <p>&copy; {new Date().getFullYear()} StarSoft. Bütün hüquqlar qorunur.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/starsoft.az/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-slate hover:text-[var(--color-gold)] transition-colors"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://www.linkedin.com/company/star-software-solutions/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate hover:text-[var(--color-gold)] transition-colors"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
          </div>
          <p>Azərbaycan biznesinin rəqəmsal inkişafı üçün çalışırıq.</p>
        </div>
      </div>
    </footer>
  );
}
