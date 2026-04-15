import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/FooterWrapper";
import Analytics from "@/components/Analytics";
import CookieConsent from "@/components/CookieConsent";
import ChatWidget from "@/components/ChatWidget";

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
const TITLE = "StarSoft — Azərbaycan biznesinin texnoloji tərəfdaşı";
const DESCRIPTION =
  "StarSoft — Bakı əsaslı IT şirkəti. Web sayt, mobil tətbiq, kibertəhlükəsizlik, avtomatlaşdırma. Sabit qiymət, etibarlı tərəfdaş.";

export const metadata: Metadata = {
  applicationName: "StarSoft",
  title: {
    default: TITLE,
    template: "%s | StarSoft",
  },
  description: DESCRIPTION,
  keywords: [
    "StarSoft",
    "StarSoft Azerbaijan",
    "StarSoft Baku",
    "starsoft.az",
    "IT şirkəti Azərbaycan",
    "IT şirkəti Bakı",
    "web development Bakı",
    "sayt sifarişi Bakı",
    "mobil tətbiq Azərbaycan",
    "kibertəhlükəsizlik Azərbaycan",
    "proqram təminatı Bakı",
    "IT outsourcing Azərbaycan",
    "software company Azerbaijan",
    "web development Azerbaijan",
  ],
  authors: [{ name: "StarSoft", url: SITE_URL }],
  creator: "StarSoft",
  publisher: "StarSoft",
  metadataBase: new URL(SITE_URL),
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "az-AZ": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/logo-mark.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
    shortcut: ["/logo-mark.svg"],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "StarSoft",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "StarSoft — Azərbaycan IT şirkəti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph-image"],
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
  category: "technology",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "StarSoft",
  alternateName: ["StarSoft Azerbaijan", "StarSoft MMC"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo.svg`,
  },
  image: `${SITE_URL}/opengraph-image`,
  description: DESCRIPTION,
  slogan: "Azərbaycan biznesinin texnoloji tərəfdaşı",
  founder: { "@type": "Person", name: "Sərxan Babayev" },
  foundingDate: "2022",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bakı",
    addressRegion: "Bakı",
    addressCountry: "AZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.4093,
    longitude: 49.8671,
  },
  areaServed: {
    "@type": "Country",
    name: "Azerbaijan",
  },
  telephone: "+994502017164",
  email: "sarxanbabayevcontact@gmail.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+994502017164",
    email: "sarxanbabayevcontact@gmail.com",
    contactType: "customer service",
    availableLanguage: ["Azerbaijani", "English", "Russian"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "IT Xidmətləri",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vebsayt hazırlanması" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobil tətbiq inkişafı" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kibertəhlükəsizlik" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "İnfrastruktur və DevOps" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Biznes avtomatlaşdırması" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Biznes analitika" } },
    ],
  },
  sameAs: [
    "https://wa.me/994502017164",
    "https://www.instagram.com/starsoft.az/",
    "https://www.linkedin.com/company/star-software-solutions/",
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "StarSoft",
  inLanguage: "az",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="az" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-canvas text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <FooterWrapper />
        <ChatWidget />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
