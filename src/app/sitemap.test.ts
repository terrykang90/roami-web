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
describe('sitemap drift', () => {
  const pageDirs = readdirSync(LOCALE_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(LOCALE_DIR, d.name, 'page.tsx')))
    .map((d) => `/${d.name}`)
    .sort()

  it('PATHS matches the page directories on disk', () => {
    const subPaths = PATHS.filter((p) => p !== '').slice().sort()
    expect(pageDirs).toEqual(subPaths)
    // 홈('')은 [locale]/page.tsx 자체
    expect(existsSync(join(LOCALE_DIR, 'page.tsx'))).toBe(true)
  })

  it('every page declares localeAlternates (canonical/hreflang)', () => {
    const pages = [
      join(LOCALE_DIR, 'page.tsx'),
      ...pageDirs.map((p) => join(LOCALE_DIR, p.slice(1), 'page.tsx')),
    ]
    for (const file of pages) {
      // 소스 grep — layout 상속에 기대지 않고 페이지가 직접 선언해야 한다
      // (Issue 2A: 상속이면 누락 시 "홈의 복제본" canonical이 나간다)
      expect(readFileSync(file, 'utf8'), `${file} is missing localeAlternates(`).toContain(
        'localeAlternates(',
      )
    }
  })
})
