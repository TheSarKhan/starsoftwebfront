import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Haqqımızda",
  description:
    "KhanSoft — Azərbaycan biznesinin rəqəmsal xanlığı. Daha az resursla daha çox iş: etibarlı, uyğun qiymətli, müasir və operativ texnologiya tərəfdaşı.",
  openGraph: {
    title: "Haqqımızda | KhanSoft",
    description: "Azərbaycan biznesi üçün etibarlı texnologiya tərəfdaşı.",
    url: "https://khansoft.az/about",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
