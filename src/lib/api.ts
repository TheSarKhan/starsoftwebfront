const normalizedPublicApi = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const normalizedBackend = process.env.BACKEND_URL?.replace(/\/$/, "");

export const IMAGE_BASE =
  normalizedPublicApi?.replace(/\/api$/, "") ?? "http://localhost:8080";

const API_BASE =
  typeof window === "undefined"
    ? (normalizedBackend
        ? `${normalizedBackend}/api`
        : (normalizedPublicApi || "http://localhost:8080/api"))
    : (normalizedPublicApi || "/api");

// ─── In-memory cache ────────────────────────────────────────────────────────
// Lives for the browser session. Eliminates redundant API round-trips when
// navigating back to a page that was already loaded.
const _cache = new Map<string, { data: unknown; at: number }>();
const PUBLIC_TTL = 60_000;   // 60 s — public, rarely changes
const ADMIN_TTL  = 20_000;   // 20 s — admin data changes more often

function fromCache<T>(key: string, ttl: number): T | undefined {
  const hit = _cache.get(key);
  if (hit && Date.now() - hit.at < ttl) return hit.data as T;
  return undefined;
}
function toCache(key: string, data: unknown) {
  _cache.set(key, { data, at: Date.now() });
}
/** Call after mutations to force fresh data on next read */
export function invalidateCache(...keys: string[]) {
  if (keys.length === 0) _cache.clear();
  else keys.forEach((k) => _cache.delete(k));
}

async function cached<T>(key: string, fn: () => Promise<T>, ttl = PUBLIC_TTL): Promise<T> {
  const hit = fromCache<T>(key, ttl);
  if (hit !== undefined) return hit;
  const data = await fn();
  toCache(key, data);
  return data;
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────
async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    ...options,
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

function authFetcher<T>(url: string, token: string, options?: RequestInit): Promise<T> {
  return fetcher<T>(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
}

// ─── API ─────────────────────────────────────────────────────────────────────
export const api = {
  // Public — all cached
  getServices:         () => cached("services",  () => fetcher<Service[]>("/services")),
  getProjects:         () => cached("projects",  () => fetcher<Project[]>("/projects")),
  getFeaturedProjects: () => cached("projects:featured", () => fetcher<Project[]>("/projects/featured")),
  getBlogPosts:        (page = 0) => cached(`blog:${page}`, () => fetcher<PageResponse<BlogPost>>(`/blog?page=${page}`)),
  getBlogPost:         (slug: string) => cached(`blog:${slug}`, () => fetcher<BlogPost>(`/blog/${slug}`)),
  getTeam:             () => cached("team",     () => fetcher<TeamMember[]>("/team")),
  getSettings:         () => cached("settings", () => fetcher<Record<string, string>>("/settings")),
  submitContact: (data: ContactForm) =>
    fetcher<{ message: string }>("/contact", { method: "POST", body: JSON.stringify(data) }),

  // Auth
  login: (data: { username: string; password: string }) =>
    fetcher<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  refreshToken: (refreshToken: string) =>
    fetcher<{ token: string; refreshToken: string }>("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }),

  // Admin — shorter TTL; mutations invalidate relevant keys
  admin: {
    getStats: (token: string) =>
      cached("admin:stats", () => authFetcher<DashboardStats>("/admin/stats", token), ADMIN_TTL),

    getServices: (token: string) =>
      cached("admin:services", () => authFetcher<Service[]>("/admin/services", token), ADMIN_TTL),
    createService: async (token: string, data: Partial<Service>) => {
      const res = await authFetcher<Service>("/admin/services", token, { method: "POST", body: JSON.stringify(data) });
      invalidateCache("admin:services", "services", "admin:stats");
      return res;
    },
    updateService: async (token: string, id: number, data: Partial<Service>) => {
      const res = await authFetcher<Service>(`/admin/services/${id}`, token, { method: "PUT", body: JSON.stringify(data) });
      invalidateCache("admin:services", "services");
      return res;
    },
    deleteService: async (token: string, id: number) => {
      await authFetcher<void>(`/admin/services/${id}`, token, { method: "DELETE" });
      invalidateCache("admin:services", "services", "admin:stats");
    },

    getProjects: (token: string) =>
      cached("admin:projects", () => authFetcher<Project[]>("/admin/projects", token), ADMIN_TTL),
    createProject: async (token: string, data: Partial<Project>, imageFile?: File) => {
      const form = toProjectForm(data, imageFile);
      const res = await fetch(`${API_BASE}/admin/projects`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Xəta ${res.status}`);
      }
      invalidateCache("admin:projects", "projects", "projects:featured", "admin:stats");
      return res.json() as Promise<Project>;
    },
    updateProject: async (token: string, id: number, data: Partial<Project>, imageFile?: File) => {
      const form = toProjectForm(data, imageFile);
      const res = await fetch(`${API_BASE}/admin/projects/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
        cache: "no-store",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Xəta ${res.status}`);
      }
      invalidateCache("admin:projects", "projects", "projects:featured");
      return res.json() as Promise<Project>;
    },
    deleteProject: async (token: string, id: number) => {
      await authFetcher<void>(`/admin/projects/${id}`, token, { method: "DELETE" });
      invalidateCache("admin:projects", "projects", "projects:featured", "admin:stats");
    },

    getBlogPosts: (token: string, page = 0) =>
      cached(`admin:blog:${page}`, () => authFetcher<PageResponse<BlogPost>>(`/admin/blog?page=${page}`, token), ADMIN_TTL),
    createBlogPost: async (token: string, data: Partial<BlogPost>) => {
      const res = await authFetcher<BlogPost>("/admin/blog", token, { method: "POST", body: JSON.stringify(data) });
      invalidateCache("admin:blog:0", "blog:0", "admin:stats");
      return res;
    },
    updateBlogPost: async (token: string, id: number, data: Partial<BlogPost>) => {
      const res = await authFetcher<BlogPost>(`/admin/blog/${id}`, token, { method: "PUT", body: JSON.stringify(data) });
      // Invalidate all blog pages + public blog cache
      for (const k of _cache.keys()) {
        if (k.startsWith("blog:") || k.startsWith("admin:blog:")) _cache.delete(k);
      }
      return res;
    },
    deleteBlogPost: async (token: string, id: number) => {
      await authFetcher<void>(`/admin/blog/${id}`, token, { method: "DELETE" });
      for (const k of _cache.keys()) {
        if (k.startsWith("blog:") || k.startsWith("admin:blog:")) _cache.delete(k);
      }
      invalidateCache("admin:stats");
    },

    getTeam: (token: string) =>
      cached("admin:team", () => authFetcher<TeamMember[]>("/admin/team", token), ADMIN_TTL),
    createTeamMember: async (token: string, data: Partial<TeamMember>) => {
      const res = await authFetcher<TeamMember>("/admin/team", token, { method: "POST", body: JSON.stringify(data) });
      invalidateCache("admin:team", "team", "admin:stats");
      return res;
    },
    updateTeamMember: async (token: string, id: number, data: Partial<TeamMember>) => {
      const res = await authFetcher<TeamMember>(`/admin/team/${id}`, token, { method: "PUT", body: JSON.stringify(data) });
      invalidateCache("admin:team", "team");
      return res;
    },
    deleteTeamMember: async (token: string, id: number) => {
      await authFetcher<void>(`/admin/team/${id}`, token, { method: "DELETE" });
      invalidateCache("admin:team", "team", "admin:stats");
    },

    getContacts: (token: string) =>
      cached("admin:contacts", () => authFetcher<ContactMessage[]>("/admin/contacts", token), ADMIN_TTL),
    markContactRead: async (token: string, id: number) => {
      const res = await authFetcher<ContactMessage>(`/admin/contacts/${id}/read`, token, { method: "PUT" });
      invalidateCache("admin:contacts", "admin:stats");
      return res;
    },
    deleteContact: async (token: string, id: number) => {
      await authFetcher<void>(`/admin/contacts/${id}`, token, { method: "DELETE" });
      invalidateCache("admin:contacts", "admin:stats");
    },

    getSettings: (token: string) =>
      cached("admin:settings", () => authFetcher<SiteSetting[]>("/admin/settings", token), ADMIN_TTL),
    updateSetting: async (token: string, data: Partial<SiteSetting>) => {
      const res = await authFetcher<SiteSetting>("/admin/settings", token, { method: "PUT", body: JSON.stringify(data) });
      invalidateCache("admin:settings", "settings");
      return res;
    },

    uploadImage: async (token: string, file: File): Promise<{ url: string; filename: string }> => {
      const formData = new FormData();
      formData.append("file", file);
      // Use relative URL so Next.js proxies the request to the backend
      const res = await fetch(`/api/admin/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        let message = `Şəkil yüklənmədi (${res.status}).`;
        try {
          const data = await res.json();
          const detail = data?.message || data?.error || "";
          if (typeof detail === "string" && detail.trim()) {
            message = `[${res.status}] ${detail}`;
          }
        } catch {
          const errText = await res.text().catch(() => "");
          if (errText) message = `[${res.status}] ${errText.slice(0, 300)}`;
        }
        throw new Error(message);
      }
      return res.json();
    },
    deleteImage: (token: string, filename: string) =>
      authFetcher<void>(`/admin/images/${filename}`, token, { method: "DELETE" }),
  },
};

function toProjectForm(data: Partial<Project>, imageFile?: File): FormData {
  const form = new FormData();
  (Object.entries(data) as [string, unknown][]).forEach(([k, v]) => {
    if (v !== null && v !== undefined) form.append(k, String(v));
  });
  if (imageFile) form.append("image", imageFile);
  return form;
}

// ─── Prefetch helpers (call on link hover for near-instant navigation) ───────
export const prefetch = {
  services:  () => api.getServices().catch(() => {}),
  projects:  () => api.getProjects().catch(() => {}),
  blogPosts: () => api.getBlogPosts(0).catch(() => {}),
  blogPost:  (slug: string) => api.getBlogPost(slug).catch(() => {}),
  team:      () => api.getTeam().catch(() => {}),
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Service {
  id: number; title: string; titleAz: string;
  description: string; descriptionAz: string;
  icon: string; sortOrder: number; active: boolean;
}

export interface Project {
  id: number; title: string; description: string;
  category: string; imageUrl: string; clientName: string;
  projectUrl: string; technologies: string;
  featured: boolean; active: boolean;
}

export interface BlogPost {
  id: number; title: string; slug: string; summary: string;
  content: string; coverImage: string; tags: string;
  author: string; viewCount: number; published: boolean;
  publishedAt: string; createdAt: string;
}

export interface TeamMember {
  id: number; fullName: string; position: string; positionAz: string;
  bio: string; photoUrl: string; linkedin: string;
  github: string; twitter: string; sortOrder: number; active: boolean;
}

export interface ContactMessage {
  id: number; name: string; email: string; phone: string;
  subject: string; message: string; read: boolean; createdAt: string;
}

export interface ContactForm {
  name: string; email: string; phone?: string;
  subject: string; message: string;
}

export interface SiteSetting {
  id: number; settingKey: string; settingValue: string; description: string;
}

export interface AuthResponse {
  token: string; refreshToken: string; username: string; fullName: string; role: string;
}

export interface DashboardStats {
  totalServices: number; totalProjects: number; totalBlogPosts: number;
  totalTeamMembers: number; totalMessages: number; unreadMessages: number;
}

export interface PageResponse<T> {
  content: T[]; totalPages: number; totalElements: number;
  number: number; size: number;
}
