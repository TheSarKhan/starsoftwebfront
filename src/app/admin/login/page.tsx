"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import BrandMark from "@/components/BrandMark";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await api.login(form);
      localStorage.setItem("starsoft_token", data.token);
      localStorage.setItem("starsoft_refresh_token", data.refreshToken);
      localStorage.setItem(
        "starsoft_user",
        JSON.stringify({ username: data.username, fullName: data.fullName })
      );
      router.push("/admin");
    } catch {
      setError("İstifadəçi adı və ya şifrə yanlışdır.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-fit">
            <BrandMark size={56} radius={12} />
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[28px] font-bold text-ink tracking-[-0.02em]">
            StarSoft Admin
          </h1>
          <p className="text-slate text-[14px] mt-2">İdarəetmə panelinə daxil olun</p>
        </div>

        <div className="bg-white border border-[var(--color-hairline)] rounded-2xl p-8">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-start gap-3 text-[13.5px]">
              <AlertCircle size={16} strokeWidth={2} className="mt-0.5 flex-shrink-0" />
              <div>{error}</div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[13px] font-medium text-slate mb-1.5">İstifadəçi adı</label>
              <input
                required
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink placeholder-mist-slate text-[15px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-3 focus:ring-[var(--color-gold-soft)] transition-all"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-slate mb-1.5">Şifrə</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink placeholder-mist-slate text-[15px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-3 focus:ring-[var(--color-gold-soft)] transition-all"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--color-gold)] text-white font-semibold rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors disabled:opacity-60"
            >
              {loading ? "Yüklənir..." : "Daxil ol"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
