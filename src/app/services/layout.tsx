import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Xidmətlər",
  description:
    "StarSoft xidmətləri: Web development, Mobil tətbiq, Kibertəhlükəsizlik, İnfrastruktur, Avtomatlaşdırma, Biznes analitika, Telegram botlar. Bir tərəfdaş, yeddi sahə, sabit qiymət.",
  keywords: [
    "web development",
    "mobil tətbiq",
    "kibertəhlükəsizlik",
    "infrastruktur",
    "avtomatlaşdırma",
    "biznes analitika",
    "telegram bot",
    "Azərbaycan IT",
  ],
  openGraph: {
    title: "Xidmətlər | StarSoft",
    description: "Web, mobil, kibertəhlükəsizlik, infrastruktur, avtomatlaşdırma, analitika, Telegram bot — bir əldən.",
    url: "https://starsoft.az/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Web development",
      description: "Sürətli, SEO dostu və konversiyaya hesablanmış müasir veb saytlar və veb tətbiqlər.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 2,
      name: "Mobil tətbiq",
      description: "iOS və Android üçün eyni keyfiyyətdə işləyən mobil tətbiqlər.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 3,
      name: "Kibertəhlükəsizlik",
      description: "Audit, penetrasiya testi və davamlı qoruma — biznesinizi və müştəri məlumatınızı qoruyun.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 4,
      name: "İnfrastruktur",
      description: "Saytınız və sistemləriniz dayanmadan, sürətlə işləsin — server, hosting, monitorinq.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 5,
      name: "Avtomatlaşdırma",
      description: "Manual prosesləri sistemlərə çevirin — həftədə 20+ saatınızı geri qazanın.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 6,
      name: "Biznes analitika",
      description: "Məlumatınızı qərara çevirən dashboard və hesabat sistemləri.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
    {
      "@type": "Service",
      position: 7,
      name: "Telegram botlar",
      description: "Sifariş qəbulu, müştəri dəstəyi, bildirişlər və biznes avtomatlaşdırması üçün Telegram botlar.",
      provider: { "@type": "Organization", name: "StarSoft" },
      areaServed: "AZ",
    },
  ],
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      {children}
    </>
  );
}
