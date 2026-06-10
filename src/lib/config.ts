// Single source for site-wide config. Env reads happen ONCE here — never read
// process.env.NEXT_PUBLIC_* inline at call sites (two read sites WILL drift).
import type { LaunchState } from './share'

export const SITE_BASE = 'https://roami.kr'
// Final host after the apex 307 redirect. Use for URLs that crawlers FETCH
// (og:image etc.) — some scrapers (notably KakaoTalk) are unreliable through
// redirects, while og:url/QR links are fine on the apex.
export const SITE_CANONICAL = 'https://www.roami.kr'

// Flip to the full store funnel at launch by changing ONE env var (plan 070 4b).
export const LAUNCH_STATE: LaunchState =
  process.env.NEXT_PUBLIC_LAUNCH_STATE === 'launched' ? 'launched' : 'prelaunch'

// Chiang Mai public beta link — also used by the marketing homepage.
export const TESTFLIGHT_URL =
  process.env.NEXT_PUBLIC_TESTFLIGHT_URL ?? 'https://testflight.apple.com/join/AU2THE4z'

// Until the store listings exist these default to the marketing site (never a dead link).
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? '/'
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? '/'
