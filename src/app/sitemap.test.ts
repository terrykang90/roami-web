import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import sitemap, { PATHS } from './sitemap'
import { languagesFor } from '@/lib/seo'
import { SITE_CANONICAL } from '@/lib/config'

const LOCALE_DIR = join(process.cwd(), 'src/app/(site)/[locale]')

describe('sitemap', () => {
  const entries = sitemap()

  it('emits 8 paths × 3 locales = 24 unique entries', () => {
    expect(entries).toHaveLength(24)
    expect(new Set(entries.map((e) => e.url)).size).toBe(24)
  })

  it('every entry is on the www host with a 4-key alternates map', () => {
    for (const e of entries) {
      expect(e.url.startsWith(`${SITE_CANONICAL}/`)).toBe(true)
      const langs = e.alternates?.languages as Record<string, string>
      expect(Object.keys(langs).sort()).toEqual(['en', 'ko', 'th', 'x-default'])
    }
  })

  it('page hreflang and sitemap hreflang share the same source', () => {
    const home = entries.find((e) => e.url === `${SITE_CANONICAL}/ko`)
    expect(home?.alternates?.languages).toEqual(languagesFor(''))
  })
})

// Drift guard: a page added under (site)/[locale] must be registered in
// PATHS (sitemap membership) AND declare its own canonical/hreflang.
// 재귀 스캔 — 중첩 라우트(legal/privacy 등)가 생겨도 잡는다.
describe('sitemap drift', () => {
  const pagePaths = (readdirSync(LOCALE_DIR, { recursive: true }) as string[])
    .filter((p) => p === 'page.tsx' || p.endsWith('/page.tsx'))
    .map((p) => (p === 'page.tsx' ? '' : `/${p.slice(0, -'/page.tsx'.length)}`))
    .sort()

  it('PATHS matches the page files on disk (recursive)', () => {
    expect(pagePaths).toEqual([...PATHS].sort())
    expect(existsSync(join(LOCALE_DIR, 'page.tsx'))).toBe(true)
  })

  it('every page declares localeAlternates with ITS OWN path', () => {
    for (const p of pagePaths) {
      const file = join(LOCALE_DIR, p === '' ? 'page.tsx' : `${p.slice(1)}/page.tsx`)
      const src = readFileSync(file, 'utf8')
      // 소스 검사 — layout 상속에 기대지 않고 페이지가 직접 선언해야 하고
      // (Issue 2A: 상속이면 누락 시 "홈의 복제본" canonical이 나간다),
      // path 인자가 디렉토리와 일치해야 한다 (복붙 오타 = 잘못된 canonical).
      const expected =
        p === ''
          ? /localeAlternates\(locale\)/
          : new RegExp(`localeAlternates\\(locale,\\s*["']${p}["']\\)`)
      expect(src, `${file} must call localeAlternates(locale${p && `, "${p}"`})`).toMatch(expected)
    }
  })
})
