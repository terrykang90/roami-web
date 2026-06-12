// Pure helpers for the ROA-192 share landing (/m/[id]). Kept free of React/Next
// imports so the state/CTA truth tables are unit-testable (eng-review Q2/T1).

export const SHARE_LOCALES = ['ko', 'en', 'th'] as const
export type ShareLocale = (typeof SHARE_LOCALES)[number]

/** Translator shape passed from the server page into share components. */
export type ShareT = (key: string, values?: Record<string, string | number>) => string

/**
 * Viewer locale for the landing chrome. /m/[id] sits OUTSIDE the [locale]
 * segment, so next-intl's request locale does not apply — we parse the
 * Accept-Language header ourselves. Fallback: en (matches the backend).
 */
export function resolveLocale(acceptLanguage: string | null): ShareLocale {
  if (!acceptLanguage) return 'en'
  // RFC 7231-ish: "ko-KR,ko;q=0.9,en;q=0.8" → ordered by q desc.
  const candidates = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qParam = params.find((p) => p.trim().startsWith('q='))
      const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1
      return { lang: tag.trim().toLowerCase().split('-')[0], q: Number.isNaN(q) ? 0 : q }
    })
    .sort((a, b) => b.q - a.q)
  for (const { lang } of candidates) {
    if ((SHARE_LOCALES as readonly string[]).includes(lang)) return lang as ShareLocale
  }
  return 'en'
}

// ── State matrix ──────────────────────────────────────────────────────────────
// completed/cancelled win over full; full only applies to a still-active meetup.
export type ShareState = 'active' | 'full' | 'completed' | 'cancelled'

export function resolveState(status: string, full: boolean): ShareState {
  if (status === 'completed') return 'completed'
  if (status === 'cancelled') return 'cancelled'
  if (full) return 'full'
  return 'active'
}

// ── CTA matrix (launch state × recipient platform) ───────────────────────────
export type Platform = 'ios' | 'android' | 'desktop'
export type LaunchState = 'prelaunch' | 'launched'

/** 플랫폼별 출시 상태 (plan 005) — iOS는 App Store 정식, Android는 closed
 * testing인 혼합 기간을 표현. config.ts가 env에서 채운다. (타입은 여기 —
 * config→share import 방향 유지, 역의존 금지.) */
export interface PlatformLaunch {
  ios: LaunchState
  android: LaunchState
}

export type CtaVariant =
  | 'stores' // both launched — store badges, CTA opens the right store
  | 'app_store' // iOS launched + Android not — single-store funnel to the App Store
  | 'testflight' // pre-launch iOS → TestFlight public link
  | 'android_beta' // pre-launch Android → /android self-onboarding (Google Group → opt-in → install)
  | 'desktop_panel' // desktop → QR + state-appropriate store/beta links

/**
 * platform × launch → variant truth table:
 *
 *               │ android: prelaunch  │ android: launched
 *  ─────────────┼─────────────────────┼───────────────────
 *  ios: pre     │ ios → testflight    │ ios → testflight
 *               │ and → android_beta  │ and → stores
 *  ios: launched│ ios → app_store     │ ios → stores
 *               │ and → android_beta  │ and → stores
 *  desktop      │ always desktop_panel
 */
export function resolveCta(platform: Platform, launch: PlatformLaunch): CtaVariant {
  if (platform === 'desktop') return 'desktop_panel'
  if (platform === 'ios') {
    if (launch.ios !== 'launched') return 'testflight'
    return launch.android === 'launched' ? 'stores' : 'app_store'
  }
  return launch.android === 'launched' ? 'stores' : 'android_beta'
}

export interface CtaUrls {
  testflight: string
  appStore: string
  playStore: string
  androidBeta: string // locale-prefixed /android page (self-onboarding steps)
}

/** Locale-prefixed Android self-onboarding page — single construction site for
 * every surface that links to it (share landing CTA matrix, landing hero).
 * `from` (ROA-223) is the share-landing path to return to after onboarding. */
export function androidBetaPath(locale: ShareLocale, from?: string): string {
  const base = `/${locale}/android`
  return from ? `${base}?from=${encodeURIComponent(from)}` : base
}

/**
 * Validates a ?from= value before it's rendered as a back-link href on
 * /android (ROA-223). Mirrors the meetup-id charset enforced in api.ts —
 * no `/` `%` `:` beyond the literal `/m/` prefix, so `//evil.com`, schemes,
 * traversal, and encoded slashes are all rejected (open-redirect guard).
 */
export function meetupReturnPath(from: string | null): string | null {
  return from && /^\/m\/[A-Za-z0-9-]{1,64}$/.test(from) ? from : null
}

/**
 * The funnel half of the CTA matrix: where the primary button actually goes.
 * Only an ACTIVE meetup funnels into the app; every other state routes to the
 * marketing site (no dead ends). Desktop's button is informational — the
 * sticky panel carries the funnel.
 */
export function resolveCtaHref(
  state: ShareState,
  cta: CtaVariant,
  platform: Platform,
  urls: CtaUrls,
): string {
  if (state !== 'active') return '/'
  switch (cta) {
    case 'testflight':
      return urls.testflight
    case 'app_store':
      return urls.appStore
    case 'stores':
      return platform === 'ios' ? urls.appStore : urls.playStore
    case 'android_beta':
      return urls.androidBeta
    case 'desktop_panel':
      return '/'
  }
}

/**
 * The label half of the CTA matrix — i18n key for the primary button. Kept
 * beside resolveCtaHref so label and href can't drift apart silently when the
 * funnel rules change. ctaFull is the only key that interpolates {city}.
 */
export function ctaLabelKey(state: ShareState, cta: CtaVariant): string {
  if (state === 'active' && cta === 'android_beta') return 'androidBetaCta'
  switch (state) {
    case 'active':
      return 'ctaActive'
    case 'full':
      return 'ctaFull'
    case 'completed':
      return 'ctaCompleted'
    case 'cancelled':
      return 'ctaCancelled'
  }
}

// Tiers the share UI knows how to label; unknown future values must never leak
// a raw i18n key path into the trust chip — fall back to new_member.
export const KNOWN_TIERS = ['new_member', 'first_completed', 'trusted', 'veteran'] as const
export type KnownTier = (typeof KNOWN_TIERS)[number]

export function normalizeTier(tierBadge: string): KnownTier {
  return (KNOWN_TIERS as readonly string[]).includes(tierBadge)
    ? (tierBadge as KnownTier)
    : 'new_member'
}

/** Code-point-safe truncation (UTF-16 slicing can split emoji surrogate pairs). */
export function truncate(s: string, max: number): string {
  const cps = Array.from(s)
  return cps.length > max ? `${cps.slice(0, max - 1).join('')}…` : s
}

export function detectPlatform(userAgent: string | null): Platform {
  if (!userAgent) return 'desktop'
  if (/android/i.test(userAgent)) return 'android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
  return 'desktop'
}

// ── Category presentation (D1) — keys mirror the Flutter client + backend ────
export const CATEGORY_EMOJI: Record<string, string> = {
  eat: '🍜',
  cafe: '☕',
  drinks: '🍺',
  activity: '🎯',
  sightseeing: '🗺️',
}

// Matches --color-* category tokens in globals.css.
export const CATEGORY_COLOR: Record<string, string> = {
  eat: '#E07A45',
  cafe: '#A78B6B',
  drinks: '#D9A63A',
  activity: '#5C7CE6',
  sightseeing: '#4CAF7A',
}

export function categoryEmoji(category: string): string {
  return CATEGORY_EMOJI[category] ?? '📍'
}

export function categoryColor(category: string): string {
  return CATEGORY_COLOR[category] ?? '#2CB5AE'
}

/** ISO 3166-1 alpha-2 → flag emoji via regional indicators; null-safe (D1). */
export function flagEmoji(countryCode: string | null): string | null {
  if (!countryCode || !/^[A-Za-z]{2}$/.test(countryCode)) return null
  const base = 0x1f1e6
  const a = countryCode.toUpperCase().charCodeAt(0) - 65
  const b = countryCode.toUpperCase().charCodeAt(1) - 65
  return String.fromCodePoint(base + a, base + b)
}

/**
 * Meetup start time for display. The public DTO has no timezone; the beta
 * footprint (Thailand/Vietnam) is uniformly UTC+7, so we format in
 * Asia/Bangkok. Revisit when meetups span other offsets.
 */
export function formatStartTime(iso: string, locale: ShareLocale): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale === 'ko' ? 'ko-KR' : locale === 'th' ? 'th-TH' : 'en-US', {
    timeZone: 'Asia/Bangkok',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}
