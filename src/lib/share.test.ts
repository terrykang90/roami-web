import { describe, it, expect } from 'vitest'
import {
  androidBetaPath,
  resolveState,
  resolveCta,
  resolveCtaHref,
  resolveLocale,
  detectPlatform,
  categoryEmoji,
  ctaLabelKey,
  flagEmoji,
  formatStartTime,
  meetupReturnPath,
  normalizeTier,
  truncate,
  type CtaUrls,
} from './share'

// Eng-review Q2/T1: the state/CTA matrices are where landing bugs hide —
// exhaustive truth tables, not spot checks.

describe('resolveState', () => {
  it.each([
    ['active', false, 'active'],
    ['active', true, 'full'],
    ['completed', false, 'completed'],
    ['completed', true, 'completed'], // completed wins over full
    ['cancelled', false, 'cancelled'],
    ['cancelled', true, 'cancelled'], // cancelled wins over full
    ['something_new', false, 'active'], // unknown status → safe default
  ] as const)('(%s, full=%s) → %s', (status, full, expected) => {
    expect(resolveState(status, full)).toBe(expected)
  })
})

describe('resolveCta', () => {
  // platform × ios-state × android-state 전수 (plan 005 — 혼합 출시 상태 포함)
  it.each([
    // 양쪽 prelaunch (회귀 — 기존 동작 불변)
    ['ios', 'prelaunch', 'prelaunch', 'testflight'],
    ['android', 'prelaunch', 'prelaunch', 'android_beta'],
    ['desktop', 'prelaunch', 'prelaunch', 'desktop_panel'],
    // iOS만 launched (현재 상태: App Store 정식 + Play closed testing)
    ['ios', 'launched', 'prelaunch', 'app_store'],
    ['android', 'launched', 'prelaunch', 'android_beta'],
    ['desktop', 'launched', 'prelaunch', 'desktop_panel'],
    // Android만 launched (이론상 조합도 truth table에 고정)
    ['ios', 'prelaunch', 'launched', 'testflight'],
    ['android', 'prelaunch', 'launched', 'stores'],
    ['desktop', 'prelaunch', 'launched', 'desktop_panel'],
    // 양쪽 launched (최종 상태 — plan 070 'stores' 경로로 수렴)
    ['ios', 'launched', 'launched', 'stores'],
    ['android', 'launched', 'launched', 'stores'],
    ['desktop', 'launched', 'launched', 'desktop_panel'],
  ] as const)('(%s, ios:%s, android:%s) → %s', (platform, ios, android, expected) => {
    expect(resolveCta(platform, { ios, android })).toBe(expected)
  })
})

describe('resolveLocale (Accept-Language)', () => {
  it.each([
    ['ko-KR,ko;q=0.9,en-US;q=0.8', 'ko'],
    ['en-US,en;q=0.9', 'en'],
    ['th,en;q=0.8', 'th'],
    ['ja-JP,ja;q=0.9', 'en'], // unsupported → en fallback
    ['fr;q=0.7,ko;q=0.9', 'ko'], // q-ordering, not list order
    ['', 'en'],
    [null, 'en'],
    ['garbage;;;,', 'en'],
  ])('%s → %s', (header, expected) => {
    expect(resolveLocale(header)).toBe(expected)
  })
})

describe('detectPlatform', () => {
  it.each([
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'ios'],
    ['Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)', 'ios'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 'android'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)', 'desktop'],
    [null, 'desktop'],
  ])('%s → %s', (ua, expected) => {
    expect(detectPlatform(ua)).toBe(expected)
  })
})

describe('resolveCtaHref (funnel routing)', () => {
  // androidBeta carries a ?from= query in production — prove pass-through.
  const urls: CtaUrls = { testflight: 'https://tf.example', appStore: 'https://as.example', playStore: 'https://ps.example', androidBeta: '/ko/android?from=%2Fm%2F123' }
  it.each([
    // every non-active state routes to the marketing site, whatever the cta
    ['full', 'testflight', 'ios', '/'],
    ['completed', 'stores', 'android', '/'],
    ['cancelled', 'desktop_panel', 'desktop', '/'],
    // active funnels per cta variant
    ['active', 'testflight', 'ios', 'https://tf.example'],
    ['active', 'app_store', 'ios', 'https://as.example'],
    ['active', 'stores', 'ios', 'https://as.example'],
    ['active', 'stores', 'android', 'https://ps.example'],
    ['active', 'android_beta', 'android', '/ko/android?from=%2Fm%2F123'],
    ['active', 'desktop_panel', 'desktop', '/'],
  ] as const)('(%s, %s, %s) → %s', (state, cta, platform, expected) => {
    expect(resolveCtaHref(state, cta, platform, urls)).toBe(expected)
  })
})

describe('androidBetaPath (ROA-223 from param)', () => {
  it.each([['ko'], ['en'], ['th']] as const)('%s without from → plain path', (locale) => {
    expect(androidBetaPath(locale)).toBe(`/${locale}/android`)
  })
  it('encodes the from path into the query', () => {
    expect(androidBetaPath('ko', '/m/abc-123')).toBe('/ko/android?from=%2Fm%2Fabc-123')
  })
})

describe('meetupReturnPath (open-redirect guard)', () => {
  it.each([
    ['/m/0b8e6c2a-1f4d-4e8a-9c3b-2d5f6a7b8c9d', '/m/0b8e6c2a-1f4d-4e8a-9c3b-2d5f6a7b8c9d'],
    ['/m/abc-123', '/m/abc-123'],
    // everything below must be rejected
    ['//evil.com', null],
    ['https://evil.com/m/x', null],
    ['/m/x/../admin', null],
    ['/m/x%2Fy', null], // encoded slash — % not in charset
    ['/m/', null],
    [`/m/${'a'.repeat(65)}`, null], // over the 64-char id cap
    ['/android', null],
    ['', null],
    [null, null],
  ])('%s → %s', (from, expected) => {
    expect(meetupReturnPath(from)).toBe(expected)
  })
})

describe('ctaLabelKey (label half of the CTA matrix)', () => {
  it.each([
    // active: android_beta is the only cta with its own label
    ['active', 'android_beta', 'androidBetaCta'],
    ['active', 'testflight', 'ctaActive'],
    ['active', 'app_store', 'ctaActive'],
    ['active', 'stores', 'ctaActive'],
    ['active', 'desktop_panel', 'ctaActive'],
    // non-active states label by state, whatever the cta
    ['full', 'android_beta', 'ctaFull'],
    ['full', 'stores', 'ctaFull'],
    ['full', 'app_store', 'ctaFull'],
    ['completed', 'testflight', 'ctaCompleted'],
    ['completed', 'app_store', 'ctaCompleted'],
    ['cancelled', 'android_beta', 'ctaCancelled'],
    ['cancelled', 'app_store', 'ctaCancelled'],
  ] as const)('(%s, %s) → %s', (state, cta, expected) => {
    expect(ctaLabelKey(state, cta)).toBe(expected)
  })

  // The truth table above can't catch a key being renamed in the message
  // files — next-intl renders the raw key path instead of erroring.
  it('every reachable label key exists in the share namespace', async () => {
    const { default: en } = await import('../messages/en.json')
    const shareKeys = Object.keys(en.share)
    const states = ['active', 'full', 'completed', 'cancelled'] as const
    const ctas = ['stores', 'app_store', 'testflight', 'android_beta', 'desktop_panel'] as const
    for (const state of states) {
      for (const cta of ctas) {
        expect(shareKeys, `ctaLabelKey(${state}, ${cta})`).toContain(ctaLabelKey(state, cta))
      }
    }
  })
})

describe('formatStartTime (Asia/Bangkok display)', () => {
  it('invalid/empty ISO → empty string (date row silently omitted)', () => {
    expect(formatStartTime('garbage', 'en')).toBe('')
    expect(formatStartTime('', 'ko')).toBe('')
  })
  it('UTC instant converts with +7 day rollover', () => {
    // 2026-06-15T17:30Z = 2026-06-16 00:30 in Bangkok
    const out = formatStartTime('2026-06-15T17:30:00Z', 'en')
    expect(out).toContain('16')
    expect(out).toContain('00:30')
  })
  it('locale branches render localized month names', () => {
    const iso = '2026-06-12T12:00:00Z'
    expect(formatStartTime(iso, 'ko')).toContain('월')
    expect(formatStartTime(iso, 'en')).toContain('June')
    expect(formatStartTime(iso, 'th')).toMatch(/มิถุนายน|มิ\.ย\./)
  })
})

describe('normalizeTier', () => {
  it.each([
    ['trusted', 'trusted'],
    ['veteran', 'veteran'],
    ['first_completed', 'first_completed'],
    ['new_member', 'new_member'],
    ['gold_superhost', 'new_member'], // unknown future tier → safe fallback
    ['', 'new_member'],
  ])('%s → %s', (input, expected) => {
    expect(normalizeTier(input)).toBe(expected)
  })
})

describe('truncate (code-point safe)', () => {
  it('short strings pass through, long strings get ellipsis', () => {
    expect(truncate('hello', 10)).toBe('hello')
    expect(truncate('a'.repeat(40), 10)).toBe('a'.repeat(9) + '…')
  })
  it('never splits an emoji surrogate pair at the boundary', () => {
    const s = '🍜'.repeat(40)
    const out = truncate(s, 10)
    expect(out).toBe('🍜'.repeat(9) + '…')
    expect(out).not.toMatch(/[\uD800-\uDBFF]…$/)
  })
})

describe('presentation helpers', () => {
  it('every category has an emoji; unknown falls back', () => {
    for (const c of ['eat', 'cafe', 'drinks', 'activity', 'sightseeing']) {
      expect(categoryEmoji(c)).not.toBe('📍')
    }
    expect(categoryEmoji('mystery')).toBe('📍')
  })

  it('flagEmoji: KR → 🇰🇷, null/invalid → null (no broken flag)', () => {
    expect(flagEmoji('KR')).toBe('🇰🇷')
    expect(flagEmoji('th')).toBe('🇹🇭')
    expect(flagEmoji(null)).toBeNull()
    expect(flagEmoji('KOR')).toBeNull()
    expect(flagEmoji('')).toBeNull()
  })
})
