"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  FileText,
  Inbox,
  Settings,
  LogOut,
} from "lucide-react";
import BrandMark from "@/components/BrandMark";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/services", label: "Xidmətlər", icon: Briefcase },
  { href: "/admin/projects", label: "Layihələr", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/contacts", label: "Mesajlar", icon: Inbox },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string; fullName: string } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthChecked(true);
      return;
    }
    const token = localStorage.getItem("khansoft_token");
    const userStr = localStorage.getItem("khansoft_user");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    if (userStr) setUser(JSON.parse(userStr));
    setAuthChecked(true);
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("khansoft_token");
    localStorage.removeItem("khansoft_user");
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") return <>{children}</>;

  // Block ALL admin chrome and content until the auth check has run.
  // Without this, the panel would flash on screen before the client-side
  // redirect kicks in — no leak of layout, nav, or page content.
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-mist flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[var(--color-gold)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-mist">
      <aside className="w-64 bg-white border-r border-[var(--color-hairline)] flex flex-col fixed top-0 left-0 bottom-0 z-50">
        <div className="p-6 border-b border-[var(--color-hairline)]">
          <Link href="/" className="flex items-center gap-3">
            <BrandMark size={36} radius={8} />
            <span className="font-[family-name:var(--font-display)] font-bold text-ink">
              KhanSoft
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                  active
                    ? "bg-[var(--color-gold-soft)] text-[var(--color-gold)]"
                    : "text-slate hover:text-ink hover:bg-mist"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[var(--color-hairline)]">
          {user && (
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-[var(--color-gold-soft)] flex items-center justify-center text-[var(--color-gold)] font-semibold">
                {user.fullName[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-medium text-ink truncate">{user.fullName}</p>
                <p className="text-[12px] text-mist-slate">{user.username}</p>
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-[13.5px] font-medium text-slate border border-[var(--color-hairline-strong)] rounded-lg hover:text-red-600 hover:border-red-200 transition-all"
          >
            <LogOut size={14} strokeWidth={2} />
            Çıxış
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <header className="bg-white/80 backdrop-blur-sm border-b border-[var(--color-hairline)] px-8 py-4 sticky top-0 z-40">
          <h1 className="text-ink font-[family-name:var(--font-display)] font-bold text-[18px]">
            {navItems.find((n) => n.href === pathname)?.label || "Admin Panel"}
          </h1>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
