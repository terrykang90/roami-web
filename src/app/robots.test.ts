import { afterEach, describe, expect, it, vi } from 'vitest'
import robots from './robots'
import { SITE_CANONICAL } from '@/lib/config'

describe('robots', () => {
  afterEach(() => vi.unstubAllEnvs())

  it('allows everything and points at the www sitemap (prod/local)', () => {
    const r = robots()
    expect(r.rules).toEqual({ userAgent: '*', allow: '/' })
    expect(r.sitemap).toBe(`${SITE_CANONICAL}/sitemap.xml`)
  })

  it('disallows everything on non-production Vercel deploys', () => {
    vi.stubEnv('VERCEL_ENV', 'preview')
    const r = robots()
    expect(r.rules).toEqual({ userAgent: '*', disallow: '/' })
    expect(r.sitemap).toBeUndefined()
  })
})
