import { describe, expect, it } from 'vitest'
import {
  aasaDocument,
  APPLE_APP_ID,
  WWW_DEEPLINK_PATH,
  LINK_DEEPLINK_PATH,
  LINK_HOST,
} from './applinks'

// A typo in the AASA document silently breaks iOS Universal Links (Apple caches
// it at install time and gives no error). Freeze the exact shapes so CI catches
// drift instead of a device QA pass weeks later.
describe('aasaDocument', () => {
  it('declares the app under the frozen team+bundle id', () => {
    expect(APPLE_APP_ID).toBe('ZU4XGWGUCR.kr.roami.app')
    expect(aasaDocument('www.roami.kr').applinks.details[0].appIDs).toEqual([APPLE_APP_ID])
  })

  it('www host routes only /m/* into the app (legacy plan 074)', () => {
    expect(WWW_DEEPLINK_PATH).toBe('/m/*')
    const c = aasaDocument('www.roami.kr').applinks.details[0].components
    expect(c).toHaveLength(1)
    expect(c[0]['/']).toBe('/m/*')
  })

  it('falls back to the www /m/* claim for apex / unknown / missing host', () => {
    for (const host of ['roami.kr', 'preview.vercel.app', undefined, null, '']) {
      expect(aasaDocument(host).applinks.details[0].components[0]['/']).toBe('/m/*')
    }
  })

  it('link.roami.kr host claims /open/m/* (the CTA target, plan 082)', () => {
    expect(LINK_HOST).toBe('link.roami.kr')
    expect(LINK_DEEPLINK_PATH).toBe('/open/m/*')
    expect(aasaDocument('link.roami.kr').applinks.details[0].components[0]['/']).toBe('/open/m/*')
  })

  it('normalizes the link host (port / case / trailing dot)', () => {
    for (const h of ['link.roami.kr:3000', 'LINK.Roami.KR', 'link.roami.kr.', 'Link.Roami.Kr.:443']) {
      expect(aasaDocument(h).applinks.details[0].components[0]['/']).toBe('/open/m/*')
    }
  })

  it('keeps the legacy empty apps array Apple requires + serializes', () => {
    const doc = aasaDocument('link.roami.kr')
    expect(doc.applinks.apps).toEqual([])
    expect(() => JSON.parse(JSON.stringify(doc))).not.toThrow()
  })
})
