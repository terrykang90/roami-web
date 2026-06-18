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
  androidAppLinkHref,
  iosAppLinkHref,
  normalizeTier,
  truncate,
  type CtaUrls,
} from './share'
import { LINK_HOST } from './applinks'
import { SITE_CANONICAL } from './config'

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
    ['active', 'ctaActive'],
    ['full', 'ctaFull'],
    ['completed', 'ctaCompleted'],
    ['cancelled', 'ctaCancelled'],
  ] as const)('%s → %s', (state, expected) => {
    expect(ctaLabelKey(state)).toBe(expected)
  })

  // Regression (plan 082): an ACTIVE meetup's primary button opens the meetup
  // in the app on EVERY platform (iOS link.roami.kr/open/m UL, Android
  // intent://), so the label must never be the install-blind "Join the Android
  // beta" — that wording belongs only at the /android fallback destination.
  it('active never labels the button as "join beta"', () => {
    expect(ctaLabelKey('active')).toBe('ctaActive')
    expect(ctaLabelKey('active')).not.toBe('androidBetaCta')
  })

  // The truth table above can't catch a key being renamed in the message
  // files — next-intl renders the raw key path instead of erroring.
  it('every reachable label key exists in the share namespace', async () => {
    const { default: en } = await import('../messages/en.json')
    const shareKeys = Object.keys(en.share)
    const states = ['active', 'full', 'completed', 'cancelled'] as const
    for (const state of states) {
      expect(shareKeys, `ctaLabelKey(${state})`).toContain(ctaLabelKey(state))
    }
    // SecondaryArea가 variant별로 직접 렌더하는 note 키들 — ctaLabelKey를 안
    // 거치므로 위 루프가 못 잡는다. JSX의 키 문자열 오타 방지용 고정.
    for (const noteKey of ['testflightNote', 'appStoreNote', 'androidBetaNote']) {
      expect(shareKeys, `SecondaryArea note key ${noteKey}`).toContain(noteKey)
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

describe('androidAppLinkHref (Android open-in-app intent, plan 074 D1)', () => {
  it('builds an intent:// that opens roami://m/{id} with the package set', () => {
    const href = androidAppLinkHref('abc123', 'https://www.roami.kr/ko/android', 'active')
    expect(href).toMatch(/^intent:\/\/m\/abc123#Intent;/)
    expect(href).toContain('scheme=roami')
    expect(href).toContain('package=kr.roami.app')
    expect(href).toMatch(/;end$/)
  })

  it('percent-encodes the fallback so its &/; cannot break the intent envelope', () => {
    const fallback = 'https://www.roami.kr/ko/android?from=/m/abc123&x=1'
    const href = androidAppLinkHref('abc123', fallback, 'active')
    expect(href).toContain(`S.browser_fallback_url=${encodeURIComponent(fallback)}`)
    // the raw & must not appear loose in the fragment
    expect(href).not.toContain('&x=1')
  })

  // B-light: ended meetups (completed/cancelled) also open the app — the app
  // finds the meetup gone and lands the recipient on the map (discovery), so
  // "find your next meetup" actually opens the app instead of the homepage.
  it.each(['active', 'completed', 'cancelled'] as const)(
    'state %s opens the app via intent://',
    (state) => {
      expect(androidAppLinkHref('abc123', '/', state)).toMatch(/^intent:\/\/m\/abc123#Intent;/)
    },
  )

  it('full keeps the funnel (the meetup still exists — "find similar", not open it)', () => {
    expect(androidAppLinkHref('abc123', '/', 'full')).toBe('/')
  })

  // Ended Android: the not-installed fallback must be the funnel (homepage),
  // NOT a /m/{id} link — otherwise Chrome's browser_fallback_url would bounce
  // back to the share page and loop. resolveCtaHref returns '/' for non-active,
  // so the fallback here is the homepage funnel.
  it.each(['completed', 'cancelled'] as const)(
    'ended state %s keeps the funnel (homepage) as browser_fallback_url — no loop',
    (state) => {
      const href = androidAppLinkHref('abc123', '/', state)
      expect(href).toContain(`S.browser_fallback_url=${encodeURIComponent('/')}`)
      expect(href).not.toContain('%2Fm%2Fabc123')
    },
  )
})

describe('iosAppLinkHref (iOS open-in-app cross-host UL, plan 082 D1/D8)', () => {
  it('active opens the bare link UL', () => {
    expect(iosAppLinkHref('abc123', '/', 'active')).toBe('https://link.roami.kr/open/m/abc123')
  })

  // Ended (completed/cancelled): same link UL + ?ended=1 so the not-installed
  // interstitial routes to discovery instead of looping. The installed app
  // ignores the query (path-based UL match + parsing) and still opens → map.
  it.each(['completed', 'cancelled'] as const)(
    'ended state %s opens the link UL with ?ended=1 (interstitial → discovery, no loop)',
    (state) => {
      expect(iosAppLinkHref('abc123', '/', state)).toBe(
        'https://link.roami.kr/open/m/abc123?ended=1',
      )
    },
  )

  it('full keeps the funnel (the meetup still exists — "find similar", not open it)', () => {
    expect(iosAppLinkHref('abc123', '/', 'full')).toBe('/')
  })

  // Host-split invariant (plan 082 D7): the share page lives on the canonical
  // www host; the iOS CTA MUST target a DIFFERENT host. iOS suppresses a
  // Universal Link whose host matches the current page, so collapsing these two
  // (e.g. a future "canonicalize everything to www" cleanup) would silently
  // kill the open-in-app — the page would just reload instead of opening the
  // app. This test fails loudly if they ever converge.
  it('iOS CTA host differs from the share-page (www) host', () => {
    const ctaHost = new URL(iosAppLinkHref('abc123', '/', 'active')).host
    const pageHost = new URL(SITE_CANONICAL).host
    expect(ctaHost).toBe(LINK_HOST)
    expect(ctaHost).not.toBe(pageHost)
  })
})
