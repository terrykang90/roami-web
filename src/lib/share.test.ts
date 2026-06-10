import { describe, it, expect } from 'vitest'
import {
  resolveState,
  resolveCta,
  resolveLocale,
  detectPlatform,
  categoryEmoji,
  flagEmoji,
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
    ['android', 'prelaunch', 'android_beta_email'],
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
