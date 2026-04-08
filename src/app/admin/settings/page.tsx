"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { api, SiteSetting } from "@/lib/api";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [saved, setSaved] = useState(false);
  const token = () => localStorage.getItem("khansoft_token") || "";

  useEffect(() => {
    api.admin.getSettings(token()).then(setSettings).catch(() => {});
  }, []);

  const update = (id: number, value: string) => {
    setSettings(settings.map((s) => (s.id === id ? { ...s, settingValue: value } : s)));
  };

  const save = async () => {
    await Promise.all(settings.map((s) => api.admin.updateSetting(token(), s)));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[26px] font-bold text-ink tracking-[-0.02em]">
          Ayarlar
        </h2>
        <button
          onClick={save}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold)] text-white text-[14px] font-semibold rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
        >
          {saved ? (
            <>
              <Check size={15} strokeWidth={2.5} />
              Saxlanıldı
            </>
          ) : (
            "Saxla"
          )}
        </button>
      </div>

      <div className="bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden">
        <div className="divide-y divide-[var(--color-hairline)]">
          {settings.map((s) => (
            <div key={s.id} className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <p className="font-medium text-ink text-[14px]">{s.settingKey}</p>
                {s.description && (
                  <p className="text-mist-slate text-[12px] mt-0.5">{s.description}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  value={s.settingValue || ""}
                  onChange={(e) => update(s.id, e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink text-[14px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)] transition-all"
                />
              </div>
            </div>
          ))}
          {settings.length === 0 && (
            <div className="text-center py-12 text-slate text-[14px]">Ayar tapılmadı.</div>
          )}
        </div>
      </div>
    </div>
  );
}
