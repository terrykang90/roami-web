import { describe, expect, it } from 'vitest'
import { languagesFor, localeAlternates, storeInstallUrls } from './seo'
import { SITE_CANONICAL } from './config'

// x-default=/en은 next-intl 문서 패턴(루트)과 의도적으로 다른 지점 —
// 루트는 307이라 "hreflang URL이 3xx" 충돌 패턴에 걸린다. 회귀에 가장
// 취약한 동작이므로 여기서 고정한다.
describe('languagesFor', () => {
  it.each(['', '/faq'])('builds a redirect-free 4-key map for path "%s"', (path) => {
    const langs = languagesFor(path)
    expect(Object.keys(langs).sort()).toEqual(['en', 'ko', 'th', 'x-default'])
    expect(langs.ko).toBe(`${SITE_CANONICAL}/ko${path}`)
    expect(langs.en).toBe(`${SITE_CANONICAL}/en${path}`)
    expect(langs.th).toBe(`${SITE_CANONICAL}/th${path}`)
    expect(langs['x-default']).toBe(`${SITE_CANONICAL}/en${path}`)
  })

  it('only emits the www canonical host', () => {
    for (const url of Object.values(languagesFor('/privacy'))) {
      expect(url.startsWith('https://www.roami.kr/')).toBe(true)
    }
  })

  it("rejects paths missing the leading slash — 'faq' would silently become /kofaq", () => {
    expect(() => languagesFor('faq')).toThrow(/must start with/)
  })
})

describe('storeInstallUrls', () => {
  const APP = 'https://apps.apple.com/app/roami'
  const PLAY = 'https://play.google.com/store/apps/details?id=kr.roami.app'
  const BOTH_PRE = { ios: 'prelaunch', android: 'prelaunch' } as const
  const IOS_ONLY = { ios: 'launched', android: 'prelaunch' } as const
  const BOTH = { ios: 'launched', android: 'launched' } as const

  it('emits nothing while both prelaunch, even with valid URLs', () => {
    expect(storeInstallUrls(BOTH_PRE, APP, PLAY)).toEqual([])
  })

  it('emits only the App Store URL in the iOS-only launched mixed state', () => {
    expect(storeInstallUrls(IOS_ONLY, APP, PLAY)).toEqual([APP])
  })

  it('emits only the Play URL in the android-only launched state (2x2 완성)', () => {
    expect(storeInstallUrls({ ios: 'prelaunch', android: 'launched' } as const, APP, PLAY)).toEqual([
      PLAY,
    ])
  })

  // plan 005 이슈1(1C): launched인데 URL env 미설정이면 코드 가드 없이
  // 여기서 조용히 필터된다 — misconfig 동작을 문서화하는 유일한 지점.
  it("drops the '/' env fallback and prefix-only garbage when launched", () => {
    expect(storeInstallUrls(BOTH, '/', 'httpsgarbage')).toEqual([])
    expect(storeInstallUrls(BOTH, APP, '/')).toEqual([APP])
    expect(storeInstallUrls(IOS_ONLY, '/', PLAY)).toEqual([])
  })

  it('emits all valid https store URLs when both launched', () => {
    expect(storeInstallUrls(BOTH, APP, PLAY)).toEqual([APP, PLAY])
  })
})

describe('localeAlternates', () => {
  it.each([
    ['ko', ''],
    ['en', ''],
    ['th', '/faq'],
  ])('canonical is self-referencing for %s + "%s"', (locale, path) => {
    const alt = localeAlternates(locale, path)
    expect(alt.canonical).toBe(`${SITE_CANONICAL}/${locale}${path}`)
    // 페이지 hreflang과 sitemap hreflang은 같은 함수를 공유한다
    expect(alt.languages).toEqual(languagesFor(path))
  })
})
