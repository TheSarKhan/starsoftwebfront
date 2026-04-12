import { MetadataRoute } from 'next';
import { api } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://starsoft.az';

  // Base static routes
  const routes = [
    '',
    '/about',
    '/services',
    '/projects',
    '/blog',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic blog posts
    // We fetch the first page. For a full production sitemap, you might need to paginately fetch all or have a dedicated endpoint for sitemaps.
    const blogRes = await api.getBlogPosts(0);
    const blogRoutes = (blogRes.content || []).map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt || post.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    // Fallback to basic routes if API fails
    return routes;
  }
}
