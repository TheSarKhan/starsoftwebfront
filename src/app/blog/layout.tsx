import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "KhanSoft bloqu: web, kibertəhlükəsizlik, avtomatlaşdırma və biznes texnologiyası haqqında praktiki yazılar — sahibkarlar üçün sadə dildə.",
  keywords: [
    "web development",
    "kibertəhlükəsizlik",
    "avtomatlaşdırma",
    "biznes analitika",
    "Azərbaycan IT",
  ],
  openGraph: {
    title: "Blog | KhanSoft",
    description: "Bilik və təcrübə — sahibkarlar üçün praktiki texnoloji yazılar.",
    url: "https://khansoft.az/blog",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
