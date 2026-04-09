import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Layihələr",
  description:
    "StarSoft layihələri. Flagship: testup.az — müasir və zəngin funksionallı imtahan/test platforması.",
  openGraph: {
    title: "Layihələr | StarSoft",
    description: "Real iş, real nəticə. Flagship layihəmiz testup.az.",
    url: "https://starsoft.az/projects",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
