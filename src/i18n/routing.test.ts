import { describe, expect, it } from 'vitest'
import { routing } from './routing'

describe('routing', () => {
  // 회귀 핀: next-intl 미들웨어의 Link-header hreflang은 꺼져 있어야 한다 —
  // 그 버전의 x-default는 무프리픽스(307) URL을 가리켜 head/sitemap과 모순됨.
  // (CLAUDE.md: "다시 켜지 말 것")
  it('keeps middleware alternate links off — head/sitemap are the single source', () => {
    expect(routing.alternateLinks).toBe(false)
  })
})
