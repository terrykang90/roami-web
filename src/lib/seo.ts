// hreflang/canonical single source — page metadata AND sitemap.ts both build
// their language maps here so the two can never disagree (Google treats
// mismatched head/sitemap hreflang as a conflicting signal and ignores it).
import { SITE_CANONICAL } from './config'
import { routing } from '@/i18n/routing'

// x-default is /en, NOT the bare root: the root 307-redirects to a locale,
// and "hreflang URL returns 3xx" is one of Google's flagged conflict
// patterns. /en keeps the whole cluster redirect-free 200s.
export function languagesFor(path = '') {
  return {
    ...Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_CANONICAL}/${l}${path}`]),
    ),
    'x-default': `${SITE_CANONICAL}/en${path}`,
  }
}

// path: what follows the locale segment ('' | '/faq' | '/privacy' ...)
export function localeAlternates(locale: string, path = '') {
  return {
    canonical: `${SITE_CANONICAL}/${locale}${path}`,
    languages: languagesFor(path),
  }
}
