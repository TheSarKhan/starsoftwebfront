import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://starsoft.az";
const TITLE = "StarSoft — Biznesinizi parlat, texniki tərəfi bizə burax";
const DESCRIPTION =
  "Web, mobil, kibertəhlükəsizlik, DevOps, avtomatlaşdırma və biznes analitika — hər layihəyə uyğun mütəxəssislər, sabit qiymətə. Daxili IT komanda saxlamadan, daha az xərclə, daha çox iş.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | StarSoft",
  },
  description: DESCRIPTION,
  keywords: [
    "StarSoft",
    "IT şirkəti Azərbaycan",
    "web development Bakı",
    "mobil tətbiq",
    "kibertəhlükəsizlik",
    "DevOps",
    "biznes analitika",
    "avtomatlaşdırma",
    "Azərbaycan IT tərəfdaş",
    "starsoft.az",
  ],
  authors: [{ name: "StarSoft", url: SITE_URL }],
  creator: "StarSoft",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "StarSoft",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "StarSoft" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Favicon and apple-icon are auto-generated from app/icon.tsx and app/apple-icon.tsx
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "StarSoft",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  description: DESCRIPTION,
  founder: { "@type": "Person", name: "Sərxan Babayev" },
  foundingLocation: { "@type": "Place", name: "Bakı, Azərbaycan" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bakı",
    addressCountry: "AZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+994-50-201-71-64",
    email: "sarxanbabayevcontact@gmail.com",
    contactType: "customer service",
    availableLanguage: ["Azerbaijani", "English"],
  },
  sameAs: ["https://wa.me/994502017164"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-canvas text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}
