export async function GET() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://tprcs.com' 
    : 'http://localhost:3000'

  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}