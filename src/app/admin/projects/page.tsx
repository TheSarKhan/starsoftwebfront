"use client";

import { useEffect, useState, useRef } from "react";
import { Plus, Star, Upload, X } from "lucide-react";
import { api, Project } from "@/lib/api";

const emptyForm: Partial<Project> = {
  title: "",
  description: "",
  category: "Web",
  imageUrl: "",
  clientName: "",
  projectUrl: "",
  technologies: "",
  featured: false,
  active: true,
};

const inputCls =
  "w-full px-3 py-2 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink text-[14px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)] transition-all";
const labelCls = "block text-[12.5px] font-medium text-slate mb-1";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<Partial<Project>>(emptyForm);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const token = () => localStorage.getItem("starsoft_token") || "";

  const load = () => api.admin.getProjects(token()).then(setProjects).catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const save = async () => {
    if (editing) await api.admin.updateProject(token(), editing, form);
    else await api.admin.createProject(token(), form);
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await api.admin.deleteProject(token(), id);
    load();
  };

  const edit = (p: Project) => {
    setForm(p);
    setEditing(p.id);
    setShowForm(true);
  };

  const fields: { field: keyof Project; label: string }[] = [
    { field: "title", label: "Başlıq" },
    { field: "description", label: "Açıqlama" },
    { field: "clientName", label: "Müştəri adı" },
    { field: "technologies", label: "Texnologiyalar (vergüllə)" },
    { field: "projectUrl", label: "Layihə URL" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[26px] font-bold text-ink tracking-[-0.02em]">
          Layihələr
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
          Yeni layihə
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-6 mb-8">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-ink text-[17px] mb-5">
            {editing ? "Layihəni redaktə et" : "Yeni layihə"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ field, label }) => (
              <div key={field}>
                <label className={labelCls}>{label}</label>
                <input
                  type="text"
                  value={(form[field] as string) || ""}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className={inputCls}
                />
              </div>
            ))}
            <div className="md:col-span-2">
              <label className={labelCls}>Layihə şəkli</label>
              <div className="flex items-center gap-4">
                {form.imageUrl ? (
                  <div className="relative">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080"}${form.imageUrl}`}
                      alt="Preview"
                      className="w-32 h-20 object-cover rounded-lg border border-[var(--color-hairline)]"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ) : null}
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-[var(--color-hairline-strong)] rounded-lg text-slate text-[13px] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors disabled:opacity-50"
                >
                  <Upload size={15} />
                  {uploading ? "Yüklənir..." : form.imageUrl ? "Dəyiş" : "Şəkil yüklə"}
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    setUploading(true);
                    try {
                      const res = await api.admin.uploadImage(token(), file);
                      setForm({ ...form, imageUrl: res.url });
                    } catch {
                      alert("Şəkil yüklənmədi.");
                    } finally {
                      setUploading(false);
                      e.target.value = "";
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Kateqoriya</label>
              <select
                value={form.category || "Web"}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
              >
                {["Web", "Mobile", "Cybersecurity", "DevOps", "Automation", "Analytics"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-6 pt-5">
              {[
                { field: "featured", label: "Seçilmiş" },
                { field: "active", label: "Aktiv" },
              ].map(({ field, label }) => (
                <label key={field} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(form[field as keyof Project] as boolean) || false}
                    onChange={(e) => setForm({ ...form, [field]: e.target.checked })}
                    className="accent-[var(--color-gold)] w-4 h-4"
                  />
                  <span className="text-slate text-[14px]">{label}</span>
                </label>
              ))}
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
              {["Şəkil", "Başlıq", "Kateqoriya", "Texnologiyalar", "Seçilmiş", "Status", ""].map((h) => (
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
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-mist transition-colors">
                <td className="px-4 py-3">
                  {p.imageUrl ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "") || "http://localhost:8080"}${p.imageUrl}`}
                      alt={p.title}
                      className="w-16 h-10 object-cover rounded"
                    />
                  ) : (
                    <span className="text-mist-slate text-[12px]">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-ink text-[14px] font-medium">{p.title}</td>
                <td className="px-4 py-3 text-slate text-[13px]">{p.category}</td>
                <td className="px-4 py-3 text-slate text-[12px]">{p.technologies}</td>
                <td className="px-4 py-3">
                  {p.featured ? (
                    <Star size={15} strokeWidth={2} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />
                  ) : (
                    <span className="text-mist-slate">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      p.active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                    }`}
                  >
                    {p.active ? "Aktiv" : "Deaktiv"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button
                      onClick={() => edit(p)}
                      className="text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] text-[13px] font-semibold"
                    >
                      Redaktə
                    </button>
                    <button
                      onClick={() => remove(p.id)}
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
        {projects.length === 0 && (
          <div className="text-center py-12 text-slate text-[14px]">Layihə tapılmadı.</div>
        )}
      </div>
    </div>
  );
}
