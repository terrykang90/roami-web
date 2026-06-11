import type { MetadataRoute } from 'next'
import { SITE_CANONICAL } from '@/lib/config'

// /m/ (share pages) is intentionally NOT disallowed: those pages rely on a
// noindex meta tag, and crawlers can only see it if crawling is allowed.
// Disallowing would let externally-linked share URLs surface as URL-only
// index entries.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_CANONICAL}/sitemap.xml`,
  }
}
