import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ko', 'en', 'th'],
  defaultLocale: 'ko',
  // <head>/sitemap (src/lib/seo.ts) are the single source of hreflang. The
  // middleware's Link-header version must stay off: its x-default points at
  // the unprefixed (307-redirecting) URL, contradicting the head tags.
  alternateLinks: false,
})
