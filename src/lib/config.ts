// Single source for site-wide config. Env reads happen ONCE here — never read
// process.env.NEXT_PUBLIC_* inline at call sites (two read sites WILL drift).
import type { PlatformLaunch } from './share'

export const SITE_BASE = 'https://roami.kr'
// Final host after the apex 307 redirect. Use for URLs that crawlers FETCH
// (og:image etc.) — some scrapers (notably KakaoTalk) are unreliable through
// redirects, while og:url/QR links are fine on the apex.
export const SITE_CANONICAL = 'https://www.roami.kr'

// 플랫폼별 출시 상태 (plan 005). 글로벌 NEXT_PUBLIC_LAUNCH_STATE fallback은
// 의도적으로 없음 — 레거시 글로벌 값이 환경에 남아 있으면 Android까지 조용히
// launched로 끌려가는 롤백 함정이 된다 (eng review C1). 플랫폼별 env만 읽는다.
export const LAUNCH: PlatformLaunch = {
  ios: process.env.NEXT_PUBLIC_IOS_LAUNCH_STATE === 'launched' ? 'launched' : 'prelaunch',
  android: process.env.NEXT_PUBLIC_ANDROID_LAUNCH_STATE === 'launched' ? 'launched' : 'prelaunch',
}

// Chiang Mai public beta link — also used by the marketing homepage.
// `||` not `??`: an empty-but-defined env var must still fall back — `href=""`
// is a same-page no-op link, the one thing these constants must never produce.
export const TESTFLIGHT_URL =
  process.env.NEXT_PUBLIC_TESTFLIGHT_URL || 'https://testflight.apple.com/join/AU2THE4z'

// Until the store listings exist these default to the marketing site (never a dead link).
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL || '/'
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '/'
