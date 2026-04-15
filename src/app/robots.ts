import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    host: 'https://starsoft.az',
    sitemap: 'https://starsoft.az/sitemap.xml',
  };
}
