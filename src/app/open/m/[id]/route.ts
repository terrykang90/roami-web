import { type NextRequest } from 'next/server'
import { APP_STORE_URL, SITE_CANONICAL } from '@/lib/config'
import { detectPlatform, androidBetaPath, resolveLocale, type ShareLocale } from '@/lib/share'

// Not-installed / old-binary interstitial for the dedicated deep-link host
// (plan 082, D6). When the app IS installed and claims link.roami.kr/open/m/*,
// iOS/Android intercept the tap and this route NEVER loads. So reaching this
// handler in a browser means: not installed, OR an old binary that doesn't yet
// claim /open/m/*, OR stale AASA verification.
//
// We do NOT blind-redirect to the store (that dumps old-binary-but-installed
// users out of their app). Instead we show two choices:
//   "Open in app" → www.roami.kr/m/{id}  — www /m/* is STILL claimed (plan 074),
//                   so a user TAP re-tries the Universal Link; old/stale installs
//                   open the app, truly-not-installed land on the share page.
//   "Get the app" → platform store / Android beta onboarding.
//
// Served as raw HTML (no layout dependency); noindex so link never gets indexed.
export const dynamic = 'force-dynamic'

const ID_RE = /^[A-Za-z0-9-]{1,64}$/

const COPY: Record<ShareLocale, { title: string; open: string; get: string; hint: string }> = {
  ko: {
    title: 'Roami에서 이 모임 열기',
    open: '앱에서 열기',
    get: 'Roami 앱 받기',
    hint: '앱이 안 열리면 아래에서 설치하세요.',
  },
  en: {
    title: 'Open this meetup in Roami',
    open: 'Open in app',
    get: 'Get the Roami app',
    hint: "If the app doesn't open, install it below.",
  },
  th: {
    title: 'เปิดมีตอัปนี้ใน Roami',
    open: 'เปิดในแอป',
    get: 'ดาวน์โหลดแอป Roami',
    hint: 'หากแอปไม่เปิด ติดตั้งด้านล่าง',
  },
}

const ESC: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}
function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ESC[c] ?? c)
}

function page(appUrl: string, storeUrl: string, t: (typeof COPY)[ShareLocale], lang: string): string {
  const a = esc(appUrl)
  const s = esc(storeUrl)
  return `<!doctype html><html lang="${lang}"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${esc(t.title)}</title>
<style>
  :root{color-scheme:light}
  body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#FAF7F2;color:#1A1614;
    display:flex;min-height:100vh;align-items:center;justify-content:center;padding:24px}
  main{max-width:360px;width:100%;text-align:center}
  h1{font-size:20px;font-weight:800;margin:0 0 22px;letter-spacing:-.02em}
  a{display:block;min-height:52px;line-height:52px;border-radius:14px;font-size:17px;
    font-weight:700;text-decoration:none;margin:10px 0}
  .open{background:#2CB5AE;color:#fff;box-shadow:0 9px 22px rgba(44,181,174,.34)}
  .get{background:#fff;color:#1A1614;border:1px solid #E6DFD5}
  p{font-size:13px;color:#7a7166;margin:16px 0 0}
</style></head><body><main>
<h1>${esc(t.title)}</h1>
<a class="open" href="${a}">${esc(t.open)}</a>
<a class="get" href="${s}">${esc(t.get)}</a>
<p>${esc(t.hint)}</p>
</main></body></html>`
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params
  const locale = resolveLocale(req.headers.get('accept-language'))
  const t = COPY[locale]

  // Bad id → just send them to the marketing site.
  if (!ID_RE.test(id)) {
    return Response.redirect(SITE_CANONICAL, 302)
  }

  // "Open in app" re-tries the still-claimed www Universal Link on a user tap.
  const appUrl = `${SITE_CANONICAL}/m/${id}`

  // "Get the app": iOS → App Store, Android → beta onboarding (closed testing,
  // never the bare Play Store), desktop → marketing site.
  const platform = detectPlatform(req.headers.get('user-agent'))
  const storeUrl =
    platform === 'ios'
      ? APP_STORE_URL
      : platform === 'android'
        ? `${SITE_CANONICAL}${androidBetaPath(locale, `/m/${id}`)}`
        : SITE_CANONICAL

  const lang = locale === 'ko' ? 'ko' : locale === 'th' ? 'th' : 'en'
  return new Response(page(appUrl, storeUrl, t, lang), {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'x-robots-tag': 'noindex',
      // Personalized on Accept-Language + User-Agent → must NOT be shared-cached
      // (a CDN would serve the first visitor's locale/platform to everyone).
      'cache-control': 'no-store',
    },
  })
}
