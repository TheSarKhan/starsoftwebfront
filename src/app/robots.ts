import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/images/'],
    },
    sitemap: 'https://starsoft.az/sitemap.xml',
  };
}
