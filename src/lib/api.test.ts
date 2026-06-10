import { describe, it, expect, vi, afterEach } from 'vitest'
import { getPublicMeetup } from './api'

afterEach(() => {
  vi.unstubAllGlobals()
})

const VALID = {
  id: 'abc',
  title: 'T',
  description: 'D',
  category: 'eat',
  categoryLabel: 'Eat',
  city: 'Chiang Mai',
  locationLabel: '',
  latitude: 0,
  longitude: 0,
  precision: 'area',
  status: 'active',
  full: false,
  current: 1,
  max: 4,
  startTime: '2026-06-12T12:00:00Z',
  host: { nickname: 'J', profileImageUrl: null, nationality: null, tierBadge: 'trusted', hostedCount: 1, positiveReviewCount: 0 },
}

function stubFetch(response: Partial<Response> | (() => never)) {
  const fn = typeof response === 'function' ? vi.fn(response) : vi.fn(async () => response as Response)
  vi.stubGlobal('fetch', fn)
  return fn
}

describe('getPublicMeetup', () => {
  it('rejects malformed ids without ever calling fetch (defense-in-depth)', async () => {
    const fn = stubFetch({ ok: true } as Response)
    for (const bad of ['../admin', 'a/b', '', 'x'.repeat(65), 'a%2eb']) {
      expect(await getPublicMeetup(bad, 'en')).toEqual({ kind: 'not_found' })
    }
    expect(fn).not.toHaveBeenCalled()
  })

  it('404 → not_found; 5xx → error; network throw → error', async () => {
    stubFetch({ ok: false, status: 404 } as Response)
    expect(await getPublicMeetup('abc', 'en')).toEqual({ kind: 'not_found' })

    stubFetch({ ok: false, status: 500 } as Response)
    expect(await getPublicMeetup('abc', 'en')).toEqual({ kind: 'error' })

    stubFetch(() => {
      throw new Error('boom')
    })
    expect(await getPublicMeetup('abc', 'en')).toEqual({ kind: 'error' })
  })

  it('valid payload passes through; partial payload degrades to error (no 500 mid-render)', async () => {
    stubFetch({ ok: true, status: 200, json: async () => VALID } as unknown as Response)
    expect(await getPublicMeetup('abc', 'en')).toEqual({ kind: 'ok', meetup: VALID })

    for (const broken of [{}, { id: 'abc' }, { ...VALID, host: null }, { ...VALID, title: 42 }]) {
      stubFetch({ ok: true, status: 200, json: async () => broken } as unknown as Response)
      expect(await getPublicMeetup('abc', 'en')).toEqual({ kind: 'error' })
    }
  })
})
