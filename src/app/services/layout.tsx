import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description:
    "KhanSoft xidmətləri: Web development, Mobil tətbiq, Kibertəhlükəsizlik, DevOps, Avtomatlaşdırma, Biznes analitika. Bir tərəfdaş, altı sahə, sabit qiymət.",
  keywords: [
    "web development",
    "mobil tətbiq",
    "kibertəhlükəsizlik",
    "devops",
    "avtomatlaşdırma",
    "biznes analitika",
    "Azərbaycan IT",
  ],
  openGraph: {
    title: "Xidmətlər | KhanSoft",
    description: "Web, mobil, kibertəhlükəsizlik, DevOps, avtomatlaşdırma, analitika — bir əldən.",
    url: "https://khansoft.az/services",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
