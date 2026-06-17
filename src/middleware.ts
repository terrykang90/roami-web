import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intl = createMiddleware(routing)

// `link.roami.kr` is a DEDICATED deep-link host (plan 082). It exists only so
// the share page's "open in app" button can target a host DIFFERENT from www
// (iOS suppresses Universal Links that point at the same host you're already
// on). link therefore serves ONLY two surfaces:
//   /.well-known/*  → the AASA (claims /open/m/*; served by the route handler,
//                     excluded from this middleware by the dot rule below)
//   /open/m/*       → the not-installed interstitial
// Everything else on link 308s to canonical www so link never becomes a second
// browsable copy of the site (duplicate content / split SEO). And /open/m on a
// NON-link host 308s ONTO link, so the interstitial's "open in app" CTA (→ www/m)
// is always cross-host from the page it is served on.
const LINK_HOST = 'link.roami.kr'
const WWW_ORIGIN = 'https://www.roami.kr'

// Normalize the Host header before comparison: strip port, lowercase, drop a
// trailing dot (`link.roami.kr.`). Brittle host matching silently serves the
// wrong AASA / disables link routing.
function hostname(req: NextRequest): string {
  return (req.headers.get('host') ?? '').split(':')[0].toLowerCase().replace(/\.$/, '')
}

// Paths that must NEVER be locale-redirected on www (shared links + OG bots).
// /open/m and /.well-known are handled explicitly above, not here.
function isNoLocale(pathname: string): boolean {
  return pathname.startsWith('/m/') || pathname.startsWith('/.well-known/')
}

export default function middleware(req: NextRequest) {
  const host = hostname(req)
  const { pathname, search } = req.nextUrl

  // The interstitial is the dedicated host's surface — keep it ON link so its
  // CTA stays cross-host. link → serve; any other host → 308 onto link.
  if (pathname.startsWith('/open/m/')) {
    if (host === LINK_HOST) return NextResponse.next()
    return NextResponse.redirect(`https://${LINK_HOST}${pathname}${search}`, 308)
  }

  if (host === LINK_HOST) {
    // .well-known is excluded by the matcher (dot rule) and never reaches here;
    // every other link path is redirected to the canonical www host.
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308)
  }

  // www / apex / preview hosts: preserve existing behavior.
  if (isNoLocale(pathname)) return NextResponse.next()
  return intl(req)
}

export const config = {
  // Run on all page requests (the host router decides per-path). `/(ko|en|th)`
  // is listed explicitly so locale-prefixed routes still match even if a path
  // contains a dot. The dot rule excludes api/_next/static + the dotted
  // `/.well-known/*` paths so the AASA route/static handler serves them directly
  // (the link-host AASA must NOT be redirected).
  matcher: ['/', '/(ko|en|th)/:path*', '/((?!api|_next|.*\\..*).*)'],
}
