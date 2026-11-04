import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'anthropic-ai',
          'Applebot-Extended',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://swe-rabia-aziz.vercel.app/sitemap.xml',
    host: 'https://swe-rabia-aziz.vercel.app',
  };
}
