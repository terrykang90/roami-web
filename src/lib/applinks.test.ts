import { describe, expect, it } from 'vitest'
import { aasaDocument, APPLE_APP_ID, DEEPLINK_PATH } from './applinks'

// A typo in the AASA document silently breaks ALL iOS Universal Links (Apple
// caches it at install time and gives no error). Freeze the exact shape so CI
// catches drift instead of a device QA pass weeks later.
describe('aasaDocument', () => {
  const doc = aasaDocument()

  it('declares the app under the frozen team+bundle id', () => {
    expect(APPLE_APP_ID).toBe('ZU4XGWGUCR.kr.roami.app')
    expect(doc.applinks.details[0].appIDs).toEqual([APPLE_APP_ID])
  })

  it('routes only /m/* into the app', () => {
    expect(DEEPLINK_PATH).toBe('/m/*')
    expect(doc.applinks.details[0].components).toHaveLength(1)
    expect(doc.applinks.details[0].components[0]['/']).toBe('/m/*')
  })

  it('keeps the legacy empty apps array Apple requires', () => {
    expect(doc.applinks.apps).toEqual([])
  })

  it('serializes to valid JSON', () => {
    expect(() => JSON.parse(JSON.stringify(doc))).not.toThrow()
  })
})
