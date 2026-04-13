"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("starsoft_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("starsoft_cookie_consent", "accepted");
    window.dispatchEvent(new Event("cookie_consent_accepted"));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("starsoft_cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-[var(--color-hairline)] shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 flex-wrap">
        <p className="text-[13px] text-[var(--color-slate)] leading-relaxed max-w-2xl">
          Ziyarətçi statistikasını təhlil etmək üçün Google Analytics istifadə edirik.
          Məlumatlar anonim saxlanılır və üçüncü tərəfə verilmir.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-[13px] font-medium text-[var(--color-slate)] border border-[var(--color-hairline-strong)] rounded-lg hover:border-[var(--color-slate)] transition-colors"
          >
            İmtina
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-[13px] font-medium text-white bg-[var(--color-gold)] rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
          >
            Qəbul et
          </button>
        </div>
      </div>
    </div>
  );
}
