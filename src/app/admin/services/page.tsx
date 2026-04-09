"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { api, Service } from "@/lib/api";

const ICONS_LIST = [
  "Globe",
  "Smartphone",
  "ShieldCheck",
  "Server",
  "Zap",
  "BarChart3",
  "Bot",
  "Code",
  "Database",
];

const emptyForm = {
  title: "",
  titleAz: "",
  description: "",
  descriptionAz: "",
  icon: "Globe",
  sortOrder: 0,
  active: true,
};

const inputCls =
  "w-full px-3 py-2 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink text-[14px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)] transition-all";
const labelCls = "block text-[12.5px] font-medium text-slate mb-1";

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<Partial<Service>>(emptyForm);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const token = () => localStorage.getItem("starsoft_token") || "";

  const load = () => api.admin.getServices(token()).then(setServices).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (editing) await api.admin.updateService(token(), editing, form);
    else await api.admin.createService(token(), form);
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await api.admin.deleteService(token(), id);
    load();
  };

  const edit = (s: Service) => {
    setForm(s);
    setEditing(s.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[26px] font-bold text-ink tracking-[-0.02em]">
          Xidmətlər
        </h2>
        <button
          onClick={() => {
            setForm(emptyForm);
            setEditing(null);
            setShowForm(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-gold)] text-white text-[14px] font-semibold rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
        >
          <Plus size={16} strokeWidth={2.25} />
          Yeni xidmət
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-6 mb-8">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-ink text-[17px] mb-5">
            {editing ? "Xidməti redaktə et" : "Yeni xidmət"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { field: "title", label: "Başlıq (EN)" },
              { field: "titleAz", label: "Başlıq (AZ)" },
              { field: "description", label: "Açıqlama (EN)" },
              { field: "descriptionAz", label: "Açıqlama (AZ)" },
            ].map(({ field, label }) => (
              <div key={field}>
                <label className={labelCls}>{label}</label>
                <input
                  type="text"
                  value={((form as Record<string, unknown>)[field] as string) || ""}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className={inputCls}
                />
              </div>
            ))}
            <div>
              <label className={labelCls}>İkon</label>
              <select
                value={form.icon || "Globe"}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                className={inputCls}
              >
                {ICONS_LIST.map((ic) => (
                  <option key={ic} value={ic}>
                    {ic}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Sıra</label>
              <input
                type="number"
                value={form.sortOrder || 0}
                onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
                className={inputCls}
              />
            </div>
          </div>
          <div className="flex gap-3 mt-5">
            <button
              onClick={save}
              className="px-5 py-2 bg-[var(--color-gold)] text-white font-semibold text-[14px] rounded-lg hover:bg-[var(--color-gold-hover)] transition-colors"
            >
              Saxla
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-5 py-2 border border-[var(--color-hairline-strong)] text-slate text-[14px] font-medium rounded-lg hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors"
            >
              Ləğv et
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-[var(--color-hairline)] rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-mist border-b border-[var(--color-hairline)]">
            <tr>
              {["İkon", "Başlıq (AZ)", "Başlıq (EN)", "Sıra", "Status", ""].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-mist-slate text-[12px] font-semibold uppercase tracking-[0.08em]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-hairline)]">
            {services.map((s) => (
              <tr key={s.id} className="hover:bg-mist transition-colors">
                <td className="px-4 py-3 text-[13px] text-slate">{s.icon}</td>
                <td className="px-4 py-3 text-ink text-[14px] font-medium">{s.titleAz}</td>
                <td className="px-4 py-3 text-slate text-[13px]">{s.title}</td>
                <td className="px-4 py-3 text-slate text-[13px]">{s.sortOrder}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      s.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {s.active ? "Aktiv" : "Deaktiv"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => edit(s)}
                      className="text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] text-[13px] font-semibold"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => remove(s.id)}
                      className="text-red-600 hover:text-red-700 text-[13px] font-semibold"
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <div className="text-center py-12 text-slate text-[14px]">Xidmət tapılmadı.</div>
        )}
      </div>
    </div>
  );
}
