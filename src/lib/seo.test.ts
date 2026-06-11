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

  it('emits nothing while prelaunch, even with valid URLs', () => {
    expect(storeInstallUrls('prelaunch', APP, PLAY)).toEqual([])
  })

  it("drops the '/' env fallback and prefix-only garbage when launched", () => {
    expect(storeInstallUrls('launched', '/', 'httpsgarbage')).toEqual([])
    expect(storeInstallUrls('launched', APP, '/')).toEqual([APP])
  })

  it('emits all valid https store URLs when launched', () => {
    expect(storeInstallUrls('launched', APP, PLAY)).toEqual([APP, PLAY])
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
