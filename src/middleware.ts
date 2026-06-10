import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // `m/` (public share landing, ROA-192) and `.well-known/` (future Universal
  // Links AASA/assetlinks) live OUTSIDE the locale segment — they must never be
  // locale-redirected (/m/{id} → /ko/m/{id} would break shared links + OG bots).
  matcher: ['/', '/(ko|en|th)/:path*', '/((?!api|_next|m/|\\.well-known|.*\\..*).*)'],
}
