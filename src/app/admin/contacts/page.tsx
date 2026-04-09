"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { api, ContactMessage } from "@/lib/api";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const token = () => localStorage.getItem("starsoft_token") || "";

  const load = () => api.admin.getContacts(token()).then(setMessages).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: number) => {
    await api.admin.markContactRead(token(), id);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await api.admin.deleteContact(token(), id);
    if (selected?.id === id) setSelected(null);
    load();
  };

  return (
    <div>
      <h2 className="font-[family-name:var(--font-display)] text-[26px] font-bold text-ink tracking-[-0.02em] mb-8">
        Mesajlar
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* List */}
        <div className="bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden">
          <div className="divide-y divide-[var(--color-hairline)]">
            {messages.length === 0 && (
              <div className="text-center py-12 text-slate text-[14px]">Mesaj tapılmadı.</div>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelected(msg);
                  if (!msg.read) markRead(msg.id);
                }}
                className={`p-4 cursor-pointer transition-colors ${
                  selected?.id === msg.id ? "bg-[var(--color-gold-soft)]" : "hover:bg-mist"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <span className="w-2 h-2 bg-[var(--color-gold)] rounded-full flex-shrink-0" />
                      )}
                      <p
                        className={`truncate text-[14px] ${
                          !msg.read ? "text-ink font-semibold" : "text-slate font-medium"
                        }`}
                      >
                        {msg.name}
                      </p>
                    </div>
                    <p className="text-[13px] text-slate truncate mt-0.5">{msg.subject}</p>
                    <p className="text-[12px] text-mist-slate mt-1">
                      {new Date(msg.createdAt).toLocaleDateString("az")}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(msg.id);
                    }}
                    className="text-red-600 hover:text-red-700 text-[12px] font-semibold flex-shrink-0"
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-6">
          {selected ? (
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-[19px] font-bold text-ink mb-5 tracking-[-0.01em]">
                {selected.subject}
              </h3>
              <div className="space-y-2.5 mb-6">
                <div className="flex gap-3 text-[13.5px]">
                  <span className="text-mist-slate w-16 font-medium">Ad:</span>
                  <span className="text-ink">{selected.name}</span>
                </div>
                <div className="flex gap-3 text-[13.5px]">
                  <span className="text-mist-slate w-16 font-medium">Email:</span>
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] break-all"
                  >
                    {selected.email}
                  </a>
                </div>
                {selected.phone && (
                  <div className="flex gap-3 text-[13.5px]">
                    <span className="text-mist-slate w-16 font-medium">Telefon:</span>
                    <span className="text-ink">{selected.phone}</span>
                  </div>
                )}
                <div className="flex gap-3 text-[13.5px]">
                  <span className="text-mist-slate w-16 font-medium">Tarix:</span>
                  <span className="text-ink">{new Date(selected.createdAt).toLocaleString("az")}</span>
                </div>
              </div>
              <div className="p-4 bg-mist border border-[var(--color-hairline)] rounded-lg">
                <p className="text-ink text-[14px] leading-relaxed whitespace-pre-wrap">
                  {selected.message}
                </p>
              </div>
              <a
                href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                className="inline-flex items-center gap-2 mt-5 px-5 py-2 bg-[var(--color-gold)] text-white text-[14px] font-semibold rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
              >
                <Mail size={15} strokeWidth={2} />
                Cavabla
              </a>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate text-[14px]">
              Məlumatları görmək üçün mesaj seçin
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
