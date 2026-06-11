# roami-web Development Guide

마케팅/공유 랜딩 사이트 (roami.kr). Next.js 16 App Router + next-intl (ko/en/th) + Tailwind v4.

- Run: `npm run dev`
- Test: `npm test` (vitest)
- Lint: `npm run lint`
- Build: `npm run build`
- 배포: Vercel (main 머지 시 자동)

## Conventions

- main 직커밋 금지 — 브랜치 + PR
- SEO: hreflang/canonical은 `src/lib/seo.ts`가 단일 소스. 새 페이지 추가 시
  `src/app/sitemap.ts`의 `PATHS`에 등록하고 페이지에서 `localeAlternates()` 선언
  (어느 한쪽이라도 누락하면 `sitemap.test.ts` drift 테스트가 실패함)
- next-intl `alternateLinks`는 꺼져 있음 — 다시 켜지 말 것 (head/sitemap과 모순)
- 공유 페이지 `/m/[id]`는 noindex + apex og:url (KakaoTalk 호환) — 건드리기 전에
  `src/lib/config.ts` 주석 확인

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
