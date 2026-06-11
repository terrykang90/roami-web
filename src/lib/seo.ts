// hreflang/canonical single source — page metadata AND sitemap.ts both build
// their language maps here so the two can never disagree (Google treats
// mismatched head/sitemap hreflang as a conflicting signal and ignores it).
import { SITE_CANONICAL } from './config'
import type { LaunchState } from './share'
import { routing } from '@/i18n/routing'

// x-default is /en, NOT the bare root: the root 307-redirects to a locale,
// and "hreflang URL returns 3xx" is one of Google's flagged conflict
// patterns. /en keeps the whole cluster redirect-free 200s.
export function languagesFor(path = '') {
  // 'faq'를 받으면 조용히 /kofaq 가 나간다 — 빌드에서 즉사시키는 게 낫다.
  if (path && !path.startsWith('/')) {
    throw new Error(`SEO path must start with '/': "${path}"`)
  }
  return {
    // fromEntries는 키를 string으로 뭉개므로 locale 키 타입을 복원한다
    ...(Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_CANONICAL}/${l}${path}`]),
    ) as Record<(typeof routing.locales)[number], string>),
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

// MobileApplication.installUrl 가드 — launched여도 env가 절반만 설정되면
// 스토어 URL이 기본값 '/'인 채 남는다. 풀 프리픽스(https://)만 통과시켜
// 쓰레기 installUrl이 구조화 데이터로 나가는 사고를 막는다.
export function storeInstallUrls(state: LaunchState, ...urls: string[]) {
  if (state !== 'launched') return []
  return urls.filter((u) => u.startsWith('https://'))
}
