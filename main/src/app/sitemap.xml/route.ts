import { SERVICES } from '../../lib/constants'

export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://tprcs.com' 
    : 'http://localhost:3000'

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  const servicePages = SERVICES.map(service => ({
    url: `${baseUrl}/?service=${service.id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const allPages = [...staticPages, ...servicePages]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map(
          page => `
        <url>
          <loc>${page.url}</loc>
          <lastmod>${page.lastModified}</lastmod>
          <changefreq>${page.changeFrequency}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}