import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Android App Link auto-verification requires EVERY fingerprint in
// assetlinks.json to be valid SHA-256 colon-hex. A malformed/placeholder entry
// doesn't just fail to add a key — it can invalidate the whole statement list,
// silently breaking verification for the build whose key IS present. AASA has
// applinks.test.ts; this is the assetlinks equivalent guard.
//
// Currently lists the upload-key SHA-256 only. This is enough to ship the WEB
// side (web-first deploy). Before the MOBILE app ships, the Play App Signing
// key SHA-256 (Play Console → App integrity → App signing) MUST be added too —
// Play-distributed installs are signed with Google's key, not the upload key,
// so without it their App Links won't auto-verify (they open in browser).
// This guard keeps the file well-formed (a malformed entry poisons the whole
// statement list); it can't know the Play cert is missing, so see the mobile
// PR checklist + TODOS for that gate.
describe('assetlinks.json', () => {
  const raw = readFileSync(
    join(process.cwd(), 'public/.well-known/assetlinks.json'),
    'utf8',
  )
  const doc = JSON.parse(raw)
  const SHA256 = /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/i

  it('declares the app via handle_all_urls for kr.roami.app', () => {
    expect(doc[0].relation).toContain('delegate_permission/common.handle_all_urls')
    expect(doc[0].target.namespace).toBe('android_app')
    expect(doc[0].target.package_name).toBe('kr.roami.app')
  })

  it('has no unfilled placeholder (fill Play App Signing SHA before deploy)', () => {
    expect(raw).not.toContain('__')
  })

  it('every fingerprint is valid SHA-256 colon-hex', () => {
    const fps: string[] = doc[0].target.sha256_cert_fingerprints
    expect(fps.length).toBeGreaterThan(0)
    for (const fp of fps) expect(fp).toMatch(SHA256)
  })
})
