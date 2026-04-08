import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import BrandMark from "@/components/BrandMark";

const sections = [
  {
    title: "Şirkət",
    links: [
      { label: "Haqqımızda", href: "/about" },
      { label: "Layihələr", href: "/projects" },
      { label: "Blog", href: "/blog" },
      { label: "Əlaqə", href: "/contact" },
    ],
  },
  {
    title: "Xidmətlər",
    links: [
      { label: "Web development", href: "/services#web" },
      { label: "Mobil tətbiq", href: "/services#mobile" },
      { label: "Kibertəhlükəsizlik", href: "/services#security" },
      { label: "İnfrastruktur", href: "/services#devops" },
      { label: "Avtomatlaşdırma", href: "/services#automation" },
      { label: "Biznes analitika", href: "/services#analytics" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--color-hairline)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <BrandMark size={40} radius={10} />
              <span className="font-[family-name:var(--font-display)] text-xl font-extrabold text-ink tracking-tight">
                KhanSoft
              </span>
            </Link>
            <p className="text-slate text-[15px] leading-relaxed max-w-md">
              Biznesinizin texniki tərəfi artıq sizin dərdiniz deyil. Web, mobil,
              təhlükəsizlik, infrastruktur, avtomatlaşdırma və analitika —
              bir tərəfdaşdan, sabit qiymətə.
            </p>
          </div>

          {/* Links */}
          {sections.map((s) => (
            <div key={s.title} className="md:col-span-3">
              <h4 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-ink uppercase tracking-[0.12em] mb-4">
                {s.title}
              </h4>
              <ul className="space-y-2.5">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-slate hover:text-[var(--color-gold)] text-[14px] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="md:col-span-1 md:col-start-10 md:col-span-3">
            <h4 className="font-[family-name:var(--font-display)] text-[13px] font-bold text-ink uppercase tracking-[0.12em] mb-4">
              Əlaqə
            </h4>
            <ul className="space-y-3 text-[14px] text-slate">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <span>Bakı, Azərbaycan</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <a href="tel:+994502017164" className="hover:text-[var(--color-gold)] transition-colors">
                  +994 50 201 71 64
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} strokeWidth={1.75} className="mt-0.5 text-[var(--color-gold)] flex-shrink-0" />
                <a
                  href="mailto:sarxanbabayevcontact@gmail.com"
                  className="hover:text-[var(--color-gold)] transition-colors break-all"
                >
                  sarxanbabayevcontact@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[var(--color-hairline)] flex flex-col md:flex-row justify-between items-center gap-3 text-[13px] text-mist-slate">
          <p>&copy; {new Date().getFullYear()} KhanSoft. Bütün hüquqlar qorunur.</p>
          <p>Bakıda hazırlanır. Azərbaycan biznesi üçün.</p>
        </div>
      </div>
    </footer>
  );
}
