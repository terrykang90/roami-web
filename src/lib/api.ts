// Single source of truth for the backend base URL (used by the share landing
// SSR fetch and the client-side waitlist form).
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://api.roami.kr'

/** Share-safe meetup projection served by GET /public/meetups/:id (ROA-192 Phase 1). */
export interface PublicHost {
  nickname: string | null
  profileImageUrl: string | null
  nationality: string | null // ISO country code; flag derived client-side
  tierBadge: 'new_member' | 'first_completed' | 'trusted' | 'veteran' | string
  hostedCount: number
  positiveReviewCount: number
}

export interface PublicMeetup {
  id: string
  title: string
  description: string
  category: string
  categoryLabel: string
  city: string
  locationLabel: string
  latitude: number
  longitude: number
  precision: string
  status: 'active' | 'completed' | 'cancelled' | string
  full: boolean
  current: number
  max: number
  startTime: string
  host: PublicHost
}

export type PublicMeetupResult =
  | { kind: 'ok'; meetup: PublicMeetup }
  | { kind: 'not_found' }
  | { kind: 'error' }

/**
 * SSR fetch for the share landing. Distinguishes 404 (not-found state) from
 * network/5xx/timeout (generic error state) — D5. The 3s abort keeps a slow or
 * down API from hanging OG crawlers. `revalidate: 60` caches the DATA (the page
 * itself is dynamic because it personalizes on Accept-Language / User-Agent).
 */
export async function getPublicMeetup(id: string, locale: string): Promise<PublicMeetupResult> {
  // Defense-in-depth: ids are UUID-ish; refuse anything that could mangle the URL.
  if (!/^[A-Za-z0-9-]{1,64}$/.test(id)) return { kind: 'not_found' }
  try {
    const res = await fetch(`${API_BASE}/public/meetups/${id}`, {
      headers: { 'Accept-Language': locale },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(3000),
    })
    if (res.status === 404) return { kind: 'not_found' }
    if (!res.ok) return { kind: 'error' }
    const meetup = (await res.json()) as PublicMeetup
    return { kind: 'ok', meetup }
  } catch {
    return { kind: 'error' }
  }
}
