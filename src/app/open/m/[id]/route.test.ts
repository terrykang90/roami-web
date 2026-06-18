import { describe, it, expect } from 'vitest'
import { NextRequest } from 'next/server'
import { GET } from './route'

async function render(url: string, lang = 'en'): Promise<string> {
  const req = new NextRequest(url, { headers: { 'accept-language': lang } })
  const res = await GET(req, { params: Promise.resolve({ id: 'abc123' }) })
  return res.text()
}

describe('/open/m/[id] interstitial (not-installed / old-binary landing)', () => {
  it('active meetup: primary "Open in app" re-tries the www Universal Link', async () => {
    const html = await render('https://link.roami.kr/open/m/abc123')
    expect(html).toContain('href="https://www.roami.kr/m/abc123"')
    expect(html).toContain('Open in app')
  })

  // The regression this guards (codex): an ENDED meetup's share CTA deep-links
  // here; if the primary still pointed at www/m/{id} the not-installed user
  // would bounce back to the share page and re-deep-link here forever. With
  // ?ended=1 the primary must go to discovery (homepage), not the share page.
  it('ended meetup (?ended=1): primary goes to homepage discovery, never back to /m/{id}', async () => {
    const html = await render('https://link.roami.kr/open/m/abc123?ended=1')
    expect(html).toContain('This meetup has ended')
    expect(html).toContain('Find more meetups')
    expect(html).toContain('class="open" href="https://www.roami.kr"')
    // the looping share-page link must NOT be the primary action
    expect(html).not.toContain('href="https://www.roami.kr/m/abc123"')
  })

  it.each([
    ['ko', '이 모임은 끝났어요', '다른 모임 찾기'],
    ['th', 'มีตอัปนี้สิ้นสุดแล้ว', 'หามีตอัปอื่น'],
  ])('localizes the ended copy (%s)', async (lang, title, open) => {
    const html = await render('https://link.roami.kr/open/m/abc123?ended=1', lang)
    expect(html).toContain(title)
    expect(html).toContain(open)
  })
})
