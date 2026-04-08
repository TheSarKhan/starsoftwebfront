import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Layihələr",
  description:
    "KhanSoft layihələri. Flagship: testup.az — müasir və zəngin funksionallı imtahan/test platforması.",
  openGraph: {
    title: "Layihələr | KhanSoft",
    description: "Real iş, real nəticə. Flagship layihəmiz testup.az.",
    url: "https://khansoft.az/projects",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
