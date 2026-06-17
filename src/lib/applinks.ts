// Universal Links (iOS) association document. Served at
// /.well-known/apple-app-site-association by a route handler (extensionless +
// application/json — Vercel won't set that content-type for a static public
// file). Apple fetches this at app install/update time and does NOT follow
// redirects, so the route must return 200 directly on whichever host claims it.
//
// HOST-AWARE (plan 082):
//   www.roami.kr  → claims `/m/*`       (existing share-link deep links, plan 074)
//   link.roami.kr → claims `/open/m/*`  (dedicated deep-link host: the share
//                   page's "open in app" button targets link.roami.kr/open/m/{id},
//                   cross-host from the www page so iOS same-domain suppression
//                   doesn't fire — verified on device).
//
// One typo here silently kills iOS deep linking, so the shapes are frozen by
// applinks.test.ts. Pure data (no Next imports) to keep it unit-testable.

// Apple team ID + bundle id. Team ID from Runner.xcodeproj DEVELOPMENT_TEAM.
export const APPLE_APP_ID = 'ZU4XGWGUCR.kr.roami.app'

// The dedicated deep-link host. Its AASA claims /open/m/*.
export const LINK_HOST = 'link.roami.kr'

// www claims /m/* (existing); link claims /open/m/* (the CTA target).
export const WWW_DEEPLINK_PATH = '/m/*'
export const LINK_DEEPLINK_PATH = '/open/m/*'

/**
 * Returns the AASA for the given request host. link.roami.kr claims /open/m/*,
 * every other host (www, apex, preview) keeps the legacy /m/* claim so plan-074
 * share links keep auto-opening. `host` is the raw Host header (may include a
 * port in dev — we match on the hostname prefix).
 */
export function aasaDocument(host?: string | null) {
  // Normalize before compare: strip port, lowercase, drop trailing dot — a
  // brittle match silently serves the wrong host's AASA.
  const h = (host ?? '').split(':')[0].toLowerCase().replace(/\.$/, '')
  const path = h === LINK_HOST ? LINK_DEEPLINK_PATH : WWW_DEEPLINK_PATH
  return {
    applinks: {
      // `apps` must be present and empty (legacy Apple requirement).
      apps: [],
      details: [
        {
          appIDs: [APPLE_APP_ID],
          components: [{ '/': path, comment: 'meetup links open in the app' }],
        },
      ],
    },
  }
}
