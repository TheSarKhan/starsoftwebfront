"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { Plus, ImagePlus, X } from "lucide-react";
import { api, BlogPost } from "@/lib/api";

// Lazy load the heavy Quill editor — only downloaded when the form is opened
const QuillEditor = dynamic(() => import("@/components/QuillEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-64 bg-mist border border-[var(--color-hairline)] rounded-lg animate-pulse" />
  ),
});

const emptyForm: Partial<BlogPost> = {
  title: "",
  slug: "",
  summary: "",
  content: "",
  coverImage: "",
  tags: "",
  author: "StarSoft",
  published: false,
};

const inputCls =
  "w-full px-3 py-2 bg-white border border-[var(--color-hairline-strong)] rounded-lg text-ink text-[14px] focus:outline-none focus:border-[var(--color-gold)] focus:ring-2 focus:ring-[var(--color-gold-soft)] transition-all";
const labelCls = "block text-[12.5px] font-medium text-slate mb-1";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<Partial<BlogPost>>(emptyForm);
  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const token = () => localStorage.getItem("starsoft_token") || "";

  const uploadCover = async (file: File) => {
    setCoverUploading(true);
    try {
      const { url } = await api.admin.uploadImage(token(), file);
      setForm((f) => ({ ...f, coverImage: url }));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Şəkil yüklənmədi.");
    } finally {
      setCoverUploading(false);
    }
  };

  const load = () =>
    api.admin
      .getBlogPosts(token())
      .then((d) => setPosts(d.content))
      .catch(() => {});
  useEffect(() => {
    load();
  }, []);

  const generateSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

  const save = async () => {
    if (editing) await api.admin.updateBlogPost(token(), editing, form);
    else await api.admin.createBlogPost(token(), form);
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Silmək istəyirsiniz?")) return;
    await api.admin.deleteBlogPost(token(), id);
    load();
  };

  const edit = (p: BlogPost) => {
    setForm(p);
    setEditing(p.id);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-[family-name:var(--font-display)] text-[26px] font-bold text-ink tracking-[-0.02em]">
          Blog
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
          Yeni yazı
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-[var(--color-hairline)] rounded-xl p-6 mb-8">
          <h3 className="font-[family-name:var(--font-display)] font-bold text-ink text-[17px] mb-5">
            {editing ? "Yazını redaktə et" : "Yeni blog yazısı"}
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Başlıq *</label>
                <input
                  type="text"
                  value={form.title || ""}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })
                  }
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Slug *</label>
                <input
                  type="text"
                  value={form.slug || ""}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Müəllif</label>
                <input
                  type="text"
                  value={form.author || ""}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label className={labelCls}>Etiketlər (vergüllə)</label>
                <input
                  type="text"
                  value={form.tags || ""}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className={inputCls}
                />
              </div>
            </div>
            <div>
              <label className={labelCls}>Xülasə</label>
              <textarea
                rows={2}
                value={form.summary || ""}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className={labelCls}>Başlıq şəkli</label>
              {form.coverImage ? (
                <div className="relative rounded-lg overflow-hidden border border-[var(--color-hairline)] max-w-md">
                  <img src={form.coverImage} alt="Cover" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, coverImage: "" })}
                    className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={coverUploading}
                  onClick={() => coverInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-[var(--color-hairline-strong)] rounded-lg text-slate text-[14px] hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] transition-colors disabled:opacity-50"
                >
                  <ImagePlus size={18} />
                  {coverUploading ? "Yüklənir..." : "Şəkil seç"}
                </button>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadCover(file);
                  e.target.value = "";
                }}
              />
            </div>
            <div>
              <label className={labelCls}>Məzmun *</label>
              <QuillEditor
                value={form.content || ""}
                onChange={(v) => setForm({ ...form, content: v })}
                placeholder="Blog yazısının məzmunu..."
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published || false}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="accent-[var(--color-gold)] w-4 h-4"
              />
              <span className="text-slate text-[14px]">Dərhal yayımla</span>
            </label>
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
              {["Şəkil", "Başlıq", "Müəllif", "Etiketlər", "Baxış", "Status", ""].map((h) => (
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
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-mist transition-colors">
                <td className="px-4 py-3">
                  {p.coverImage ? (
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-16 h-12 object-cover rounded-md border border-[var(--color-hairline)]"
                    />
                  ) : (
                    <div className="w-16 h-12 rounded-md bg-mist border border-[var(--color-hairline)] flex items-center justify-center">
                      <span className="text-[10px] text-slate">Yoxdur</span>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-ink text-[14px] font-medium">{p.title}</td>
                <td className="px-4 py-3 text-slate text-[13px]">{p.author}</td>
                <td className="px-4 py-3 text-slate text-[12px]">{p.tags}</td>
                <td className="px-4 py-3 text-slate text-[13px]">{p.viewCount}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${
                      p.published
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {p.published ? "Yayımlanıb" : "Qaralama"}
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
        {posts.length === 0 && (
          <div className="text-center py-12 text-slate text-[14px]">Blog yazısı tapılmadı.</div>
        )}
      </div>
    </div>
  );
}
