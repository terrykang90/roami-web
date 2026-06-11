// In-app webview detection + external-browser escape for /[locale]/android
// (ROA-222). Pure and React/Next-free like share.ts, so the UA truth tables
// are unit-testable in node vitest. Consumed SERVER-SIDE (eng review issue 3:
// the escape hatch must exist in the first HTML, never behind hydration).

export type InAppBrowser =
  | 'kakaotalk'
  | 'line'
  | 'instagram'
  | 'facebook'
  | 'naver'
  | 'android_webview'
  | 'ios_webview'
  | null

export function detectInAppBrowser(ua: string | null): InAppBrowser {
  if (!ua) return null
  // Named apps first — they have their own escape mechanics.
  if (/KAKAOTALK/i.test(ua)) return 'kakaotalk'
  // LINE appends " Line/x.y.z" (and LIFF embeds add "Liff"); the word boundary
  // avoids matching unrelated tokens like "Outline/".
  if (/\bLine\/|\bLiff\b/.test(ua)) return 'line'
  if (/Instagram/i.test(ua)) return 'instagram'
  if (/FBAN|FBAV|FB_IAB|FB4A|FBIOS/.test(ua)) return 'facebook'
  if (/NAVER\(inapp/i.test(ua)) return 'naver'
  // Generic Android WebView: the "; wv)" token (Lollipop+) or the legacy
  // "Version/X.X Chrome/Y" combo that real Chrome never sends.
  if (/Android/i.test(ua) && (/;\s*wv\)/.test(ua) || /Version\/\d+\.\d+.*Chrome\//.test(ua)))
    return 'android_webview'
  // Generic iOS WKWebView heuristic: WebKit UA without the Safari/ token
  // (real Safari, CriOS, FxiOS, EdgiOS all keep it). Best-effort.
  if (
    /iP(hone|ad|od)/.test(ua) &&
    /AppleWebKit/i.test(ua) &&
    !/Safari\//.test(ua) &&
    !/CriOS|FxiOS|EdgiOS/.test(ua)
  )
    return 'ios_webview'
  return null
}

export type BannerState =
  | { mode: 'escape'; app: Exclude<InAppBrowser, null>; url: string }
  | { mode: 'manual'; app: Exclude<InAppBrowser, null> }
  | null

/**
 * The page's single entry API: which banner (if any) to server-render, and
 * the <a href> that reopens currentUrl in an external browser. currentUrl
 * must carry the full path INCLUDING ?from= so meetup context survives the hop.
 *
 *   kakaotalk → kakaotalk://web/openExternal  [best-effort — Kakao has a
 *               history of closing escape routes; the always-visible manual
 *               hint is the safety net, not this scheme]
 *   line      → ?openExternalBrowser=1        [officially supported]
 *   instagram/facebook/naver/android_webview, on Android UA
 *             → intent:// with https scheme    [best-effort]
 *   anything on iOS without a scheme (incl. ios_webview) → manual only
 */
export function bannerState(ua: string | null, currentUrl: string): BannerState {
  const app = detectInAppBrowser(ua)
  if (!app) return null

  if (app === 'kakaotalk') {
    return { mode: 'escape', app, url: `kakaotalk://web/openExternal?url=${encodeURIComponent(currentUrl)}` }
  }
  if (app === 'line') {
    const u = new URL(currentUrl)
    u.searchParams.set('openExternalBrowser', '1')
    return { mode: 'escape', app, url: u.toString() }
  }
  // intent:// only works on Android; iOS embeds of these apps get manual mode.
  if (/Android/i.test(ua ?? '')) {
    return { mode: 'escape', app, url: `intent://${currentUrl.replace(/^https?:\/\//, '')}#Intent;scheme=https;end` }
  }
  return { mode: 'manual', app }
}
