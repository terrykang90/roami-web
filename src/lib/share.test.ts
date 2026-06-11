import { describe, it, expect } from 'vitest'
import {
  resolveState,
  resolveCta,
  resolveCtaHref,
  resolveLocale,
  detectPlatform,
  categoryEmoji,
  ctaLabelKey,
  flagEmoji,
  formatStartTime,
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
  it.each([
    ['ios', 'launched', 'stores'],
    ['android', 'launched', 'stores'],
    ['desktop', 'launched', 'desktop_panel'],
    ['ios', 'prelaunch', 'testflight'],
    ['android', 'prelaunch', 'android_beta'],
    ['desktop', 'prelaunch', 'desktop_panel'],
  ] as const)('(%s, %s) → %s', (platform, launchState, expected) => {
    expect(resolveCta(platform, launchState)).toBe(expected)
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
  const urls: CtaUrls = { testflight: 'https://tf.example', appStore: 'https://as.example', playStore: 'https://ps.example', androidBeta: '/ko/android' }
  it.each([
    // every non-active state routes to the marketing site, whatever the cta
    ['full', 'testflight', 'ios', '/'],
    ['completed', 'stores', 'android', '/'],
    ['cancelled', 'desktop_panel', 'desktop', '/'],
    // active funnels per cta variant
    ['active', 'testflight', 'ios', 'https://tf.example'],
    ['active', 'stores', 'ios', 'https://as.example'],
    ['active', 'stores', 'android', 'https://ps.example'],
    ['active', 'android_beta', 'android', '/ko/android'],
    ['active', 'desktop_panel', 'desktop', '/'],
  ] as const)('(%s, %s, %s) → %s', (state, cta, platform, expected) => {
    expect(resolveCtaHref(state, cta, platform, urls)).toBe(expected)
  })
})

describe('ctaLabelKey (label half of the CTA matrix)', () => {
  it.each([
    // active: android_beta is the only cta with its own label
    ['active', 'android_beta', 'androidBetaCta'],
    ['active', 'testflight', 'ctaActive'],
    ['active', 'stores', 'ctaActive'],
    ['active', 'desktop_panel', 'ctaActive'],
    // non-active states label by state, whatever the cta
    ['full', 'android_beta', 'ctaFull'],
    ['full', 'stores', 'ctaFull'],
    ['completed', 'testflight', 'ctaCompleted'],
    ['cancelled', 'android_beta', 'ctaCancelled'],
  ] as const)('(%s, %s) → %s', (state, cta, expected) => {
    expect(ctaLabelKey(state, cta)).toBe(expected)
  })

  // The truth table above can't catch a key being renamed in the message
  // files — next-intl renders the raw key path instead of erroring.
  it('every reachable label key exists in the share namespace', async () => {
    const { default: en } = await import('../messages/en.json')
    const shareKeys = Object.keys(en.share)
    const states = ['active', 'full', 'completed', 'cancelled'] as const
    const ctas = ['stores', 'testflight', 'android_beta', 'desktop_panel'] as const
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
