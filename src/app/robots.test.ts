import { describe, expect, it } from 'vitest'
import robots from './robots'
import { SITE_CANONICAL } from '@/lib/config'

describe('robots', () => {
  it('allows everything and points at the www sitemap', () => {
    const r = robots()
    expect(r.rules).toEqual({ userAgent: '*', allow: '/' })
    expect(r.sitemap).toBe(`${SITE_CANONICAL}/sitemap.xml`)
  })
})
