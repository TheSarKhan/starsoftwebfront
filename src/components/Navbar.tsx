"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { prefetch } from "@/lib/api";

// Map each route to its prefetch function
const navLinks = [
  { href: "/",         label: "Ana səhifə",  prefetchFn: undefined },
  { href: "/about",    label: "Haqqımızda",  prefetchFn: undefined },
  { href: "/services", label: "Xidmətlər",   prefetchFn: prefetch.services },
  { href: "/projects", label: "Layihələr",   prefetchFn: prefetch.projects },
  { href: "/blog",     label: "Blog",        prefetchFn: prefetch.blogPosts },
  { href: "/contact",  label: "Əlaqə",       prefetchFn: undefined },
];

import BrandMark from "@/components/BrandMark";

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }}>
        <BrandMark size={36} radius={8} />
      </motion.div>
      <span className="font-[family-name:var(--font-display)] text-[19px] font-extrabold text-ink tracking-tight">
        StarSoft
      </span>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-[var(--color-hairline)]"
          : "bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="StarSoft ana səhifə">
            <Logo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => link.prefetchFn?.()}
                  className={`px-3.5 py-2 text-[14px] font-medium rounded-md transition-colors ${
                    active
                      ? "text-[var(--color-gold)]"
                      : "text-slate hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="ml-3 px-4 py-2 bg-[var(--color-gold)] !text-white text-[14px] font-semibold rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
            >
              Pulsuz konsultasiya
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-md text-ink"
            aria-label="Menyu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="md:hidden overflow-hidden bg-white border-t border-[var(--color-hairline)]"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => link.prefetchFn?.()}
                  className={`px-3 py-3 rounded-md text-[15px] font-medium transition-colors ${
                    pathname === link.href
                      ? "text-[var(--color-gold)] bg-[var(--color-gold-soft)]"
                      : "text-slate hover:text-ink hover:bg-mist"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 px-4 py-3 bg-[var(--color-gold)] !text-white text-[15px] font-semibold rounded-lg text-center"
              >
                Pulsuz konsultasiya
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
