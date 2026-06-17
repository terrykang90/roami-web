import { NextResponse, type NextRequest } from 'next/server'
import { aasaDocument } from '@/lib/applinks'

// Apple fetches this at install time and does NOT follow redirects — must be a
// direct 200 with application/json on the claiming host. NextResponse.json sets
// the content-type a static extensionless public file would not get.
//
// HOST-AWARE (plan 082): www → /m/*, link.roami.kr → /open/m/*. So this must be
// dynamic (read the Host header per request) rather than force-static.
export const dynamic = 'force-dynamic'

export function GET(req: NextRequest) {
  return NextResponse.json(aasaDocument(req.headers.get('host')), {
    headers: { 'cache-control': 'public, max-age=3600' },
  })
}
