// Pure helpers for the ROA-192 share landing (/m/[id]). Kept free of React/Next
// imports so the state/CTA truth tables are unit-testable (eng-review Q2/T1).
// applinks is a pure constants module (no React/Next), so importing the
// deep-link host here keeps this file unit-testable.
import { LINK_HOST } from './applinks'

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
 * States whose primary CTA opens the app via the meetup deep link.
 *  - active  → opens the meetup detail.
 *  - completed/cancelled (ENDED) → the app opens, finds the meetup gone, and
 *    lands the recipient on the map. So "Find your next meetup on Roami"
 *    actually opens the app's discovery instead of dead-ending on the marketing
 *    homepage (B-light: no new deep-link path / app release needed — reuses the
 *    existing /open/m + intent:// claims; the app's "no longer available" toast
 *    is the only rough edge, removable later with a dedicated open-home link).
 *  - full → NOT here: the meetup still exists, so opening it would contradict
 *    the "Find SIMILAR meetups" label; it keeps the funnel.
 */
function opensAppForState(state: ShareState): boolean {
  return state === 'active' || state === 'completed' || state === 'cancelled'
}

/**
 * Android `intent://` deep link that opens the meetup in the app via the
 * `roami://m/{id}` scheme, with a built-in browser fallback to the store/beta
 * funnel when the app isn't installed (Chrome handles the fallback natively,
 * no JS). Used as the Android primary CTA (plan 074 D1).
 *
 * `id` is the already-validated meetup id (api.ts charset). `fallbackUrl` is
 * whatever the normal funnel would have used (resolveCtaHref). Returns the
 * plain `fallbackUrl` for states that don't open the app (see opensAppForState).
 */
export function androidAppLinkHref(
  id: string,
  fallbackUrl: string,
  state: ShareState,
): string {
  if (!opensAppForState(state)) return fallbackUrl
  // intent:// fragment params are ;-delimited; the fallback URL is percent-
  // encoded so its own &/; can't break out of the intent envelope.
  return `intent://m/${id}#Intent;scheme=roami;package=kr.roami.app;S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`
}

/**
 * iOS open-in-app link: the dedicated cross-host Universal Link
 * `link.roami.kr/open/m/{id}` (plan 082 D1/D8). It MUST be a different host
 * from the share page (www) — iOS suppresses a Universal Link whose host
 * matches the current page, so a www→www tap would never open the app. The
 * `link` host claims `/open/m/*`; if the app isn't installed (or is an old
 * binary that doesn't claim it yet) the tap loads the `/open/m/{id}`
 * interstitial instead of dead-ending. States that don't open the app fall back
 * to the funnel (see opensAppForState). (Host-split invariant D7: share host =
 * www, iOS CTA host = link — never collapse them.)
 */
export function iosAppLinkHref(id: string, fallbackUrl: string, state: ShareState): string {
  if (!opensAppForState(state)) return fallbackUrl
  // Ended meetups (completed/cancelled) carry ?ended=1 so the NOT-installed
  // `/open/m/{id}` interstitial sends the user to discovery instead of looping
  // back to the share page (whose ended CTA would deep-link here again). The
  // installed app ignores the query (the UL matches on path, and
  // meetupIdFromUri parses path segments), so it still opens the meetup → "no
  // longer available" → map.
  const ended = state === 'completed' || state === 'cancelled'
  return `https://${LINK_HOST}/open/m/${id}${ended ? '?ended=1' : ''}`
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
 * The label half of the CTA matrix — i18n key for the primary button. Depends
 * only on `state`: for an ACTIVE meetup every platform's button now opens the
 * meetup in the app (iOS → link.roami.kr/open/m UL, Android → intent://), so
 * the label is always `ctaActive` ("Open this meetup in the app").
 *
 * Previously active+android returned `androidBetaCta` ("Join the Android beta")
 * — an install-blind FALSE label: the button actually opens the app (the beta
 * page is only the not-installed fallback). The "join beta" wording now lives
 * only at the fallback destination (`/android`). ctaFull interpolates {city}.
 */
export function ctaLabelKey(state: ShareState): string {
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
