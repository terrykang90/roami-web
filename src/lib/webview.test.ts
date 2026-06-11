import { describe, it, expect } from 'vitest'
import { detectInAppBrowser, bannerState } from './webview'

// Real-world UA strings (trimmed to the discriminating tokens).
const UA = {
  kakaoAndroid:
    'Mozilla/5.0 (Linux; Android 14; SM-S918N Build/UP1A) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.0.0 Mobile Safari/537.36 KAKAOTALK/10.4.3',
  kakaoIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 KAKAOTALK 10.4.2',
  lineAndroid:
    'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 Line/13.5.0/IAB',
  lineIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Safari Line/13.5.0',
  instagramAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/AP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.0.0 Mobile Safari/537.36 Instagram 320.0.0.32.110 Android',
  instagramIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 Instagram 320.0.0.23.109',
  facebookAndroid:
    'Mozilla/5.0 (Linux; Android 13; SM-G991B Build/TP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/123.0.0.0 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/450.0.0.0;]',
  facebookIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 [FBAN/FBIOS;FBAV/450.0.0;]',
  naverAndroid:
    'Mozilla/5.0 (Linux; Android 14; SM-S918N Build/UP1A; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.0.0 Mobile Safari/537.36 NAVER(inapp; search; 2000; 12.1.5)',
  genericAndroidWv:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8 Build/AP1A.240505.005; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/124.0.6367.54 Mobile Safari/537.36',
  iosWkWebview:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329',
  chromeAndroid:
    'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.6367.54 Mobile Safari/537.36',
  safariIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  chromeIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/124.0.6367.71 Mobile/15E148 Safari/604.1',
  firefoxIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/124.0 Mobile/15E148 Safari/604.1',
  edgeIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/124.0 Mobile/15E148 Safari/604.1',
  // The \bLine\/ word boundary must not match "Outline/" or similar tokens.
  outlineDesktop:
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Outline/1.2.3 Chrome/124.0.0.0 Safari/537.36',
  naverIos:
    'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/21A329 NAVER(inapp; search; 2000; 12.1.5)',
}

describe('detectInAppBrowser', () => {
  it.each([
    [UA.kakaoAndroid, 'kakaotalk'],
    [UA.kakaoIos, 'kakaotalk'],
    [UA.lineAndroid, 'line'],
    [UA.lineIos, 'line'],
    [UA.instagramAndroid, 'instagram'],
    [UA.instagramIos, 'instagram'],
    [UA.facebookAndroid, 'facebook'],
    [UA.facebookIos, 'facebook'],
    [UA.naverAndroid, 'naver'],
    [UA.genericAndroidWv, 'android_webview'],
    [UA.iosWkWebview, 'ios_webview'],
    // Real browsers / alt iOS browsers must NOT trigger the banner.
    [UA.chromeAndroid, null],
    [UA.safariIos, null],
    [UA.chromeIos, null],
    [UA.firefoxIos, null],
    [UA.edgeIos, null],
    // "Outline/" must not match the LINE word boundary.
    [UA.outlineDesktop, null],
    [null, null],
    ['', null],
  ])('%s → %s', (ua, expected) => {
    expect(detectInAppBrowser(ua)).toBe(expected)
  })
})

describe('bannerState', () => {
  const PAGE = 'https://www.roami.kr/ko/android?from=%2Fm%2Fabc-123'

  it('real browsers → no banner', () => {
    expect(bannerState(UA.chromeAndroid, PAGE)).toBeNull()
    expect(bannerState(UA.safariIos, PAGE)).toBeNull()
    expect(bannerState(null, PAGE)).toBeNull()
  })

  it('kakaotalk → escape via openExternal scheme, full URL encoded (from preserved)', () => {
    const s = bannerState(UA.kakaoAndroid, PAGE)
    expect(s).toEqual({
      mode: 'escape',
      app: 'kakaotalk',
      url: `kakaotalk://web/openExternal?url=${encodeURIComponent(PAGE)}`,
    })
    // iOS KakaoTalk uses the same scheme.
    expect(bannerState(UA.kakaoIos, PAGE)?.mode).toBe('escape')
  })

  it('line → appends openExternalBrowser=1 preserving the existing ?from=', () => {
    const s = bannerState(UA.lineAndroid, PAGE)
    if (s?.mode !== 'escape') throw new Error('expected escape mode')
    const u = new URL(s.url)
    expect(u.searchParams.get('openExternalBrowser')).toBe('1')
    expect(u.searchParams.get('from')).toBe('/m/abc-123')
    // and on a URL with no query at all
    const bare = bannerState(UA.lineIos, 'https://www.roami.kr/th/android')
    if (bare?.mode !== 'escape') throw new Error('expected escape mode')
    expect(bare.url).toBe('https://www.roami.kr/th/android?openExternalBrowser=1')
  })

  it('android in-app webviews → intent:// with scheme stripped, query intact', () => {
    for (const ua of [UA.instagramAndroid, UA.facebookAndroid, UA.naverAndroid, UA.genericAndroidWv]) {
      const s = bannerState(ua, PAGE)
      if (s?.mode !== 'escape') throw new Error(`expected escape mode for ${ua}`)
      expect(s.url).toBe(
        'intent://www.roami.kr/ko/android?from=%2Fm%2Fabc-123#Intent;scheme=https;end',
      )
    }
  })

  it('iOS embeds without a working scheme → manual mode', () => {
    expect(bannerState(UA.instagramIos, PAGE)).toEqual({ mode: 'manual', app: 'instagram' })
    expect(bannerState(UA.facebookIos, PAGE)).toEqual({ mode: 'manual', app: 'facebook' })
    expect(bannerState(UA.iosWkWebview, PAGE)).toEqual({ mode: 'manual', app: 'ios_webview' })
    // Naver app on iOS: detected by the named-app token, but no Android → manual.
    expect(bannerState(UA.naverIos, PAGE)).toEqual({ mode: 'manual', app: 'naver' })
  })
})
