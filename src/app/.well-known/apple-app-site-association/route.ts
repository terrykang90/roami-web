import { NextResponse } from 'next/server'
import { aasaDocument } from '@/lib/applinks'

// Apple fetches this at install time and does NOT follow redirects — must be a
// direct 200 with application/json on the apex. NextResponse.json sets the
// content-type that a static extensionless public file would not get.
export const dynamic = 'force-static'

export function GET() {
  return NextResponse.json(aasaDocument(), {
    headers: { 'cache-control': 'public, max-age=3600' },
  })
}
