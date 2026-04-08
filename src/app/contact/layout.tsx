import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Əlaqə",
  description:
    "KhanSoft ilə əlaqə: pulsuz ilk konsultasiya, eyni iş günü cavab. Bakı, Azərbaycan. Email, telefon, WhatsApp.",
  openGraph: {
    title: "Əlaqə | KhanSoft",
    description: "KhanSoft ilə əlaqə saxlayın — pulsuz ilkin məsləhət.",
    url: "https://khansoft.az/contact",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
