import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://khansoft.az";
  const lastModified = new Date();

  const routes = [
    { url: "", priority: 1.0 },
    { url: "/about", priority: 0.8 },
    { url: "/services", priority: 0.9 },
    { url: "/projects", priority: 0.8 },
    { url: "/blog", priority: 0.8 },
    { url: "/contact", priority: 0.9 },
  ];

  return routes.map(({ url, priority }) => ({
    url: `${baseUrl}${url}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
