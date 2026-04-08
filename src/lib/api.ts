const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

async function fetcher<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { "Content-Type": "application/json" },
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

export const api = {
  // Public
  getServices: () => fetcher<Service[]>("/services"),
  getProjects: () => fetcher<Project[]>("/projects"),
  getFeaturedProjects: () => fetcher<Project[]>("/projects/featured"),
  getBlogPosts: (page = 0) => fetcher<PageResponse<BlogPost>>(`/blog?page=${page}`),
  getBlogPost: (slug: string) => fetcher<BlogPost>(`/blog/${slug}`),
  getTeam: () => fetcher<TeamMember[]>("/team"),
  getSettings: () => fetcher<Record<string, string>>("/settings"),
  submitContact: (data: ContactForm) =>
    fetcher<{ message: string }>("/contact", { method: "POST", body: JSON.stringify(data) }),

  // Auth
  login: (data: { username: string; password: string }) =>
    fetcher<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(data) }),

  // Admin
  admin: {
    getStats: (token: string) => authFetcher<DashboardStats>("/admin/stats", token),
    getServices: (token: string) => authFetcher<Service[]>("/admin/services", token),
    createService: (token: string, data: Partial<Service>) =>
      authFetcher<Service>("/admin/services", token, { method: "POST", body: JSON.stringify(data) }),
    updateService: (token: string, id: number, data: Partial<Service>) =>
      authFetcher<Service>(`/admin/services/${id}`, token, { method: "PUT", body: JSON.stringify(data) }),
    deleteService: (token: string, id: number) =>
      authFetcher<void>(`/admin/services/${id}`, token, { method: "DELETE" }),

    getProjects: (token: string) => authFetcher<Project[]>("/admin/projects", token),
    createProject: (token: string, data: Partial<Project>) =>
      authFetcher<Project>("/admin/projects", token, { method: "POST", body: JSON.stringify(data) }),
    updateProject: (token: string, id: number, data: Partial<Project>) =>
      authFetcher<Project>(`/admin/projects/${id}`, token, { method: "PUT", body: JSON.stringify(data) }),
    deleteProject: (token: string, id: number) =>
      authFetcher<void>(`/admin/projects/${id}`, token, { method: "DELETE" }),

    getBlogPosts: (token: string, page = 0) =>
      authFetcher<PageResponse<BlogPost>>(`/admin/blog?page=${page}`, token),
    createBlogPost: (token: string, data: Partial<BlogPost>) =>
      authFetcher<BlogPost>("/admin/blog", token, { method: "POST", body: JSON.stringify(data) }),
    updateBlogPost: (token: string, id: number, data: Partial<BlogPost>) =>
      authFetcher<BlogPost>(`/admin/blog/${id}`, token, { method: "PUT", body: JSON.stringify(data) }),
    deleteBlogPost: (token: string, id: number) =>
      authFetcher<void>(`/admin/blog/${id}`, token, { method: "DELETE" }),

    getTeam: (token: string) => authFetcher<TeamMember[]>("/admin/team", token),
    createTeamMember: (token: string, data: Partial<TeamMember>) =>
      authFetcher<TeamMember>("/admin/team", token, { method: "POST", body: JSON.stringify(data) }),
    updateTeamMember: (token: string, id: number, data: Partial<TeamMember>) =>
      authFetcher<TeamMember>(`/admin/team/${id}`, token, { method: "PUT", body: JSON.stringify(data) }),
    deleteTeamMember: (token: string, id: number) =>
      authFetcher<void>(`/admin/team/${id}`, token, { method: "DELETE" }),

    getContacts: (token: string) => authFetcher<ContactMessage[]>("/admin/contacts", token),
    markContactRead: (token: string, id: number) =>
      authFetcher<ContactMessage>(`/admin/contacts/${id}/read`, token, { method: "PUT" }),
    deleteContact: (token: string, id: number) =>
      authFetcher<void>(`/admin/contacts/${id}`, token, { method: "DELETE" }),

    getSettings: (token: string) => authFetcher<SiteSetting[]>("/admin/settings", token),
    updateSetting: (token: string, data: Partial<SiteSetting>) =>
      authFetcher<SiteSetting>("/admin/settings", token, { method: "PUT", body: JSON.stringify(data) }),

    uploadImage: async (token: string, file: File): Promise<{ url: string; filename: string }> => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(`${API_BASE}/admin/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });
      if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
      return res.json();
    },
    deleteImage: (token: string, filename: string) =>
      authFetcher<void>(`/admin/images/${filename}`, token, { method: "DELETE" }),
  },
};

// Types
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
  token: string; username: string; fullName: string; role: string;
}

export interface DashboardStats {
  totalServices: number; totalProjects: number; totalBlogPosts: number;
  totalTeamMembers: number; totalMessages: number; unreadMessages: number;
}

export interface PageResponse<T> {
  content: T[]; totalPages: number; totalElements: number;
  number: number; size: number;
}
