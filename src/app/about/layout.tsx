import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "StarSoft — Bakı əsaslı IT şirkəti. Azərbaycan bizneslərinə web, mobil, kibertəhlükəsizlik və avtomatlaşdırma həlləri. Sabit qiymət, etibarlı komanda.",
  alternates: { canonical: "https://starsoft.az/about" },
  openGraph: {
    title: "Haqqımızda | StarSoft",
    description: "StarSoft — Bakı əsaslı IT şirkəti. Azərbaycan biznesinin texnoloji tərəfdaşı.",
    url: "https://starsoft.az/about",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
