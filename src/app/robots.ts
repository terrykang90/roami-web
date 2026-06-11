import type { MetadataRoute } from 'next'
import { SITE_CANONICAL } from '@/lib/config'

// /m/ (share pages) is intentionally NOT disallowed: those pages rely on a
// noindex meta tag, and crawlers can only see it if crawling is allowed.
// Disallowing would let externally-linked share URLs surface as URL-only
// index entries.
export default function robots(): MetadataRoute.Robots {
  // 빌드타임 env(Vercel) — 프리뷰/커스텀 스테이징 도메인이 allow-all robots와
  // prod sitemap을 서빙하는 사고 방지. 로컬(env 없음)과 prod는 allow.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production') {
    return { rules: { userAgent: '*', disallow: '/' } }
  }
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_CANONICAL}/sitemap.xml`,
  }
}
