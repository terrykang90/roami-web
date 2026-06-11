import type { MetadataRoute } from 'next'
import { SITE_CANONICAL } from '@/lib/config'
import { routing } from '@/i18n/routing'
import { languagesFor } from '@/lib/seo'

// Every indexable page under (site)/[locale]. A new page directory that's
// missing here fails the drift test in sitemap.test.ts — add it to BOTH.
// priority/changeFrequency/lastModified are deliberately omitted: Google
// ignores the first two, and a build-time lastModified marks every page
// "changed" on every deploy, eroding crawl trust.
export const PATHS = [
  '',
  '/faq',
  '/safety',
  '/android',
  '/privacy',
  '/terms',
  '/child-safety',
  '/delete-account',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE_CANONICAL}/${locale}${path}`,
      alternates: { languages: languagesFor(path) },
    })),
  )
}
