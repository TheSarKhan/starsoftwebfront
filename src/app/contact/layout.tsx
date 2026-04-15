import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "StarSoft ilə əlaqə: pulsuz ilk konsultasiya, eyni iş günü cavab. Bakı, Azərbaycan. Email, telefon, WhatsApp.",
  alternates: { canonical: "https://starsoft.az/contact" },
  openGraph: {
    title: "Əlaqə | StarSoft",
    description: "StarSoft ilə əlaqə saxlayın — pulsuz ilkin məsləhət.",
    url: "https://starsoft.az/contact",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
