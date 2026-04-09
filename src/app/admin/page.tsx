"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Briefcase, FolderKanban, FileText, Users, Inbox, BellDot } from "lucide-react";
import { api, DashboardStats } from "@/lib/api";

const statCards = [
  { key: "totalServices", label: "Xidmət", icon: Briefcase },
  { key: "totalProjects", label: "Layihə", icon: FolderKanban },
  { key: "totalBlogPosts", label: "Blog yazısı", icon: FileText },
  { key: "totalTeamMembers", label: "Komanda üzvü", icon: Users },
  { key: "totalMessages", label: "Ümumi mesaj", icon: Inbox },
  { key: "unreadMessages", label: "Oxunmamış mesaj", icon: BellDot },
];

const quickLinks = [
  { href: "/admin/services", label: "Xidmət əlavə et" },
  { href: "/admin/projects", label: "Layihə əlavə et" },
  { href: "/admin/blog", label: "Blog yaz" },
  { href: "/admin/contacts", label: "Mesajları oxu" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("starsoft_token") || "";
    api.admin.getStats(token)
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold text-ink tracking-[-0.02em]">
          Xoş gəldiniz
        </h2>
        <p className="text-slate text-[14.5px] mt-1">StarSoft idarəetmə mərkəzi.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-28 bg-white border border-[var(--color-hairline)] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="bg-white border border-[var(--color-hairline)] rounded-xl p-6 card-lift"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-mist-slate text-[12px] font-semibold uppercase tracking-[0.1em]">
                      {card.label}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-[36px] font-extrabold text-ink mt-2 leading-none">
                      {stats ? stats[card.key as keyof DashboardStats] : 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-gold-soft)] flex items-center justify-center">
                    <Icon size={18} strokeWidth={1.75} className="text-[var(--color-gold)]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-8 p-6 bg-white border border-[var(--color-hairline)] rounded-xl">
        <h3 className="font-[family-name:var(--font-display)] text-[16px] font-bold text-ink mb-4">
          Sürətli keçid
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-3 bg-mist border border-[var(--color-hairline)] rounded-lg text-[13.5px] font-medium text-slate hover:text-[var(--color-gold)] hover:border-[var(--color-gold)] text-center transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
