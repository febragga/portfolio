import { absoluteUrl, site } from '@/lib/site'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: site.url,
  }
}
