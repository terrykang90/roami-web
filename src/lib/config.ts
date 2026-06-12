// Single source for site-wide config. Env reads happen ONCE here — never read
// process.env.NEXT_PUBLIC_* inline at call sites (two read sites WILL drift).
import type { PlatformLaunch } from './share'

export const SITE_BASE = 'https://roami.kr'
// Final host after the apex 307 redirect. Use for URLs that crawlers FETCH
// (og:image etc.) — some scrapers (notably KakaoTalk) are unreliable through
// redirects, while og:url/QR links are fine on the apex.
export const SITE_CANONICAL = 'https://www.roami.kr'

// Chiang Mai public beta link — also used by the marketing homepage.
// `||` not `??`: an empty-but-defined env var must still fall back — `href=""`
// is a same-page no-op link, the one thing these constants must never produce.
export const TESTFLIGHT_URL =
  process.env.NEXT_PUBLIC_TESTFLIGHT_URL || 'https://testflight.apple.com/join/AU2THE4z'

// Until the store listings exist these default to the marketing site (never a dead link).
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL || '/'
export const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL || '/'

// 플랫폼별 출시 상태 (plan 005). 두 가지 의도적 설계:
// 1) 글로벌 NEXT_PUBLIC_LAUNCH_STATE fallback 없음 — 레거시 글로벌 값이 남아
//    있으면 Android까지 조용히 launched로 끌려가는 롤백 함정 (eng review C1).
// 2) 스토어 URL이 실제 https가 아니면 launched여도 prelaunch로 강등 — 스위치
//    env만 켜고 URL env를 깜빡하면 모든 "App Store" 버튼이 '/'(홈 루프)가
//    되는 조용한 실패를 기존 베타 화면 유지로 바꾼다 (/review 1A, cross-model).
export const LAUNCH: PlatformLaunch = {
  ios:
    process.env.NEXT_PUBLIC_IOS_LAUNCH_STATE === 'launched' &&
    APP_STORE_URL.startsWith('https://')
      ? 'launched'
      : 'prelaunch',
  android:
    process.env.NEXT_PUBLIC_ANDROID_LAUNCH_STATE === 'launched' &&
    PLAY_STORE_URL.startsWith('https://')
      ? 'launched'
      : 'prelaunch',
}
