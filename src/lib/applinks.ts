// Universal Links (iOS) association document. Served at
// /.well-known/apple-app-site-association by a route handler (extensionless +
// application/json — Vercel won't set that content-type for a static public
// file). Apple fetches this at app install/update time and does NOT follow
// redirects, so the route must return 200 directly on the apex (roami.kr),
// which is the host every share link uses (expanded_card_sheet.dart, QR).
//
// One typo here silently kills ALL iOS deep linking, so the shape is frozen by
// applinks.test.ts. Pure data (no Next imports) to keep it unit-testable.

// Apple team ID + bundle id. Team ID from Runner.xcodeproj DEVELOPMENT_TEAM.
export const APPLE_APP_ID = 'ZU4XGWGUCR.kr.roami.app'

// Only meetup share links route into the app. Everything else stays in browser.
export const DEEPLINK_PATH = '/m/*'

export function aasaDocument() {
  return {
    applinks: {
      // `apps` must be present and empty (legacy Apple requirement).
      apps: [],
      details: [
        {
          appIDs: [APPLE_APP_ID],
          components: [
            { '/': DEEPLINK_PATH, comment: 'meetup share links open in the app' },
          ],
        },
      ],
    },
  }
}
