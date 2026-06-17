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
// browsable copy of the site (duplicate content / split SEO).
const LINK_HOST = 'link.roami.kr'
const WWW_ORIGIN = 'https://www.roami.kr'

// Paths that must NEVER be locale-redirected on www (shared links + OG bots +
// deep-link infra). Previously carved out via the matcher; now the host router
// runs on all page paths, so the carve-out lives here.
function isNoLocale(pathname: string): boolean {
  return (
    pathname.startsWith('/m/') ||
    pathname.startsWith('/open/m/') ||
    pathname.startsWith('/.well-known/')
  )
}

export default function middleware(req: NextRequest) {
  const host = req.headers.get('host')?.split(':')[0]
  const { pathname, search } = req.nextUrl

  if (host === LINK_HOST) {
    if (pathname.startsWith('/open/m/')) return NextResponse.next()
    // .well-known is excluded by the matcher (dot rule) and never reaches here;
    // every other link path is redirected to the canonical www host.
    return NextResponse.redirect(`${WWW_ORIGIN}${pathname}${search}`, 308)
  }

  // www / apex / preview hosts: preserve existing behavior.
  if (isNoLocale(pathname)) return NextResponse.next()
  return intl(req)
}

export const config = {
  // Run on all page requests (the host router decides per-path). Excludes
  // api/_next and any dotted path — so `/.well-known/apple-app-site-association`
  // and `assetlinks.json` bypass the middleware and are served directly by
  // their route/static handlers (the link-host AASA must NOT be redirected).
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
