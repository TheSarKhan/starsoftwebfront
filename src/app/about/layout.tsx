import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "StarSoft — Azərbaycan biznesi üçün texnologiya tərəfdaşı. Daha az resursla daha çox iş: etibarlı, uyğun qiymətli, müasir və operativ texnologiya tərəfdaşı.",
  openGraph: {
    title: "Haqqımızda | StarSoft",
    description: "Azərbaycan biznesi üçün etibarlı texnologiya tərəfdaşı.",
    url: "https://starsoft.az/about",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
