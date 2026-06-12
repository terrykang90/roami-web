# iOS 정식 출시 CTA 전환 (플랫폼별 Launch State) Implementation Plan

## Overview

iOS가 App Store 정식 출시됨 (`https://apps.apple.com/app/roami/id6760629019`, v0.1.0). Android는 아직 Play closed testing (공개 링크 없음). 단일 `LAUNCH_STATE` flip은 Android CTA를 죽이므로 **launch state를 플랫폼별로 분리**, iOS 표면만 TestFlight → App Store로 전환.

승인된 결정 (2026-06-12): 방식 A(플랫폼별 분리), 프리뷰 `previews/share-ios-launched.html` 확인 완료, eng review 완료 (하단 리포트).

## Current State Analysis

- `src/lib/config.ts:12-13` — 단일 `LAUNCH_STATE`. `resolveCta`(share.ts:53-57)는 launched면 양 플랫폼 모두 `'stores'` → Android가 죽은 링크로 감.
- 영향 표면: 공유 모바일 CTA(`m/[id]/page.tsx:132,174`), 데스크톱 패널(`GetAppPanel.tsx:93`), 랜딩 hero(`(site)/[locale]/page.tsx:349`) + **hero 위 베타 뱃지(`:323 hero("betaBadge")`)**, `/android` 크로스링크(`android/page.tsx:114`) + **그 라벨 카피**, SEO `storeInstallUrls`(seo.ts:36).
- 별도: backend `IOS_STORE_URL`(config.go:64)이 placeholder — 강제업데이트 화면이 이 URL 사용.
- 기존 재사용: StoreBadges + `storeApple`/`storeAppleSmall` i18n 키 존재.

## Desired End State

- iOS 방문자(공유/랜딩//android): App Store 연결 + "정식 출시" 카피, 모순되는 베타 문구 없음
- Android 방문자: 기존 `/android` 베타 온보딩 무변화
- Android 정식 출시 시: `NEXT_PUBLIC_ANDROID_LAUNCH_STATE=launched` + `NEXT_PUBLIC_PLAY_STORE_URL`로 share 표면 전환 (랜딩 hero는 그때 소규모 코드 작업 — 아래 NOT doing)

## What We're NOT Doing

- Android 정식 출시 flip (closed testing 후 별도)
- **랜딩 hero의 Android-launched 분기** — eng review D2에서 YAGNI로 절단. Android 출시 때 hero 작업 1회 필요 (그때 QA에 묻어감)
- 글로벌 `NEXT_PUBLIC_LAUNCH_STATE` fallback — eng review C1로 **제거** (양쪽 fallback은 롤백 함정: 레거시 글로벌 값이 남아 있으면 Android까지 silently launched). 플랫폼별 env만 사용
- TestFlight 상수/키 삭제 (롤백 + prelaunch 분기용 유지)
- config.ts 미스컨피그 가드 (eng review 이슈1 → 1C: 운영 주의로 커버, 가드 코드 없음 — misconfig 동작은 테스트로만 문서화)
- 앱 내부 딥링크 로직 변경

## Implementation Approach

`LaunchState`를 `{ ios, android }`로 분리 (타입 `PlatformLaunch`는 **share.ts에 배치** — config가 share를 import하는 기존 방향 유지, 역의존 금지 / eng review C6). `CtaVariant`에 `'app_store'` 추가 (단일스토어 상태 — Codex #5 검토 후 유지 결정: 명시적 variant > 흩어진 분기).

## Phase 1: backend `IOS_STORE_URL` env (선행 — eng review C9)

웹이 App Store로 보내기 시작하는 시점에 강제업데이트 복구 경로도 같은 URL이어야 함. 작고 독립적이므로 먼저 처리.

- prod + staging Cloud Run env: `IOS_STORE_URL=https://apps.apple.com/app/roami/id6760629019` (ROA-207 체계: tfvars 또는 `gcloud run services update`)

**Success:** `/client-info` 응답 `iosStoreUrl`이 실제 URL.

## Phase 2: roami-web 코드

#### 1. config — 플랫폼별 분리 (글로벌 fallback 없음)
**File**: `src/lib/config.ts`
```ts
import type { PlatformLaunch } from './share'
export const LAUNCH: PlatformLaunch = {
  ios: process.env.NEXT_PUBLIC_IOS_LAUNCH_STATE === 'launched' ? 'launched' : 'prelaunch',
  android: process.env.NEXT_PUBLIC_ANDROID_LAUNCH_STATE === 'launched' ? 'launched' : 'prelaunch',
}
```
기존 `LAUNCH_STATE` export 제거, 소비처 교체. **배포 전 prerequisite: Vercel 전 환경에서 레거시 `NEXT_PUBLIC_LAUNCH_STATE` 존재 여부 확인·삭제** (Codex C1).

#### 2. CTA 매트릭스
**File**: `src/lib/share.ts` — `PlatformLaunch` 타입 정의 + `CtaVariant`에 `'app_store'`:
- ios → `launch.ios==='launched'` ? (`launch.android==='launched'` ? `'stores'` : `'app_store'`) : `'testflight'`
- android → `launch.android==='launched'` ? `'stores'` : `'android_beta'`
- `resolveCtaHref`: `'app_store'` → `urls.appStore` / `ctaLabelKey`: `'app_store'`는 `'testflight'`와 동일 매핑 (active → `ctaActive`)
- resolveCta 위 주석에 platform×state ASCII 매트릭스 표 추가 (기존 주석 갱신)

#### 3. 공유 페이지
- `m/[id]/page.tsx`: `resolveCta(platform, LAUNCH)`; `SecondaryArea`에 `'app_store'` → `appStoreNote`
- `GetAppPanel.tsx`: 3분기 — 양쪽 launched → `StoreBadges` / iOS만 → Apple 배지 + Android 베타 버튼 / 양쪽 pre → 기존

#### 4. 랜딩 hero (iOS만)
**File**: `(site)/[locale]/page.tsx`
- iOS 다크 버튼: `LAUNCH.ios==='launched'` → href `APP_STORE_URL`, 카피 `hero.iosTaglineLaunched`/`iosCtaLaunched`
- **베타 뱃지(:323)**: `LAUNCH.ios==='launched'` → `hero.badgeIosLaunched` ("iOS 정식 출시 · Android 베타" 류)로 교체 (Codex C4 — "App Store에서 받기" 위에 "베타" 뱃지 모순 제거)
- Android 버튼: 무변화

#### 5. /android 페이지 (href + 카피 — Codex C3)
**File**: `(site)/[locale]/android/page.tsx:112-114`
- iOS 크로스링크: `LAUNCH.ios==='launched'` → href `APP_STORE_URL` + **라벨/iosNote 카피도 분기** (신규 키 `androidPage.iosNoteLaunched` — "iPhone이세요? App Store에서 받으세요" 류). href만 바꾸면 "TestFlight" 라벨이 App Store 링크에 남음.

#### 6. SEO
`storeInstallUrls(launch: PlatformLaunch, appStore, playStore)` — launched인 플랫폼 URL만, `https://` 필터 유지.

#### 7. StoreLogos 추출 (eng review 2A)
**New**: `src/components/StoreLogos.tsx` — `AppleLogo`/`PlayLogo` 단일소스. `GetAppPanel.tsx:6`의 정의 이동 + 랜딩 인라인 SVG 교체 (글리프 통일).

#### 8. i18n (ko/en/th)
| 키 | ko | en | th |
|---|---|---|---|
| `hero.iosTaglineLaunched` | iOS 정식 출시 | Now on the App Store | มีบน App Store แล้ว |
| `hero.iosCtaLaunched` | App Store에서 받기 | Get it on the App Store | รับผ่าน App Store |
| `hero.badgeIosLaunched` | iOS 정식 출시 · Android 베타 | iOS on the App Store · Android beta | iOS บน App Store · Android เบต้า |
| `share.appStoreNote` | 정식 버전 — App Store에서 바로 설치돼요 | Official release — installs right from the App Store | เวอร์ชันทางการ — ติดตั้งจาก App Store ได้เลย |
| `androidPage.iosNoteLaunched` | iPhone이세요? App Store에서 받으세요 | On iPhone? Get it on the App Store | ใช้ iPhone? รับได้บน App Store |

기존 `iosTagline`/`iosCta`/`testflight*` 키 유지 (prelaunch 분기 + 롤백).

#### 9. 테스트 (vitest)
- `share.test.ts`: resolveCta 전수 매트릭스 (platform × ios × android, prelaunch 회귀 포함) + `resolveCtaHref('app_store')` + **ctaLabelKey full/completed/cancelled × app_store (3A)** + **기존 reachable-CTA truth table(:123)에 `'app_store'` 포함 — 라벨/메시지 키 reachability 드리프트 방지 (Codex C8)**
- `seo.test.ts`: 혼합 상태 + **launched인데 URL `'/'`(non-https) → 필터 제외 (3A — 1C 결정의 misconfig 동작 문서화)**

**Success (Phase 2):** `npm test` / lint / build 통과. 로컬 검증은 **실제 UA 헤더를 바꾼 요청**으로 (`curl -H "User-Agent: ..."` 또는 DevTools 네트워크 조건 + 하드리로드) — responsive 모드만으론 서버 렌더 분기 검증 안 됨 (Codex C10).

## Phase 3: Vercel env + 배포 + prod 검증

1. **레거시 env 감사**: `vercel env ls`로 `NEXT_PUBLIC_LAUNCH_STATE` 전 환경 확인, 있으면 삭제 (C1 prerequisite)
2. env 추가 (Production): `NEXT_PUBLIC_IOS_LAUNCH_STATE=launched`, `NEXT_PUBLIC_APP_STORE_URL=https://apps.apple.com/app/roami/id6760629019` (빌드타임 — redeploy 필수)
3. PR 머지 → 배포 → 검증: 랜딩 iOS 버튼/뱃지, `/m/{id}` iOS·Android UA, 데스크톱 패널, `/android` 라벨 — 실기기 + curl UA

## Testing Strategy

- Unit: 위 Phase 2-9 (매트릭스 전수 + truth table + 엣지 2)
- Manual: `~/.gstack/projects/terrykang90-roami-web/terry-main-eng-review-test-plan-20260612-194640.md` (UA는 실제 헤더로)

## Performance Considerations
없음 — 빌드타임 상수.

## Migration Notes
- 롤백: `NEXT_PUBLIC_IOS_LAUNCH_STATE` 삭제 + redeploy (카피 키 분리로 코드 롤백 불필요)
- Android 정식 출시: `NEXT_PUBLIC_ANDROID_LAUNCH_STATE=launched` + `NEXT_PUBLIC_PLAY_STORE_URL` (share 표면) + **랜딩 hero/뱃지 소규모 코드 작업 1회** (D2에서 의도적 연기)

## What already exists (재사용)
- plan 070 CTA 매트릭스/StoreBadges/env 스위치 — 확장 (재구축 없음)
- `storeApple`/`storeAppleSmall` i18n 키, `androidBetaPath`, webview escape (무변화 — App Store 링크는 TestFlight보다 웹뷰에서 더 안정적)

## References
- 프리뷰: `previews/share-ios-launched.html` / 선행: plan 070, 004 / App Store: id6760629019

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | — |
| Codex Review | `/codex review` | Independent 2nd opinion | 1 | CLEAR (outside voice) | 10 findings: 7 absorbed, 1 rejected (#5 variant), 1 moot (#2 stale plan), 1 doc-only (#10) |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAR | 3 issues (env guard→1C 운영커버, StoreLogos 추출→2A, 테스트 엣지 2→3A) + scope trim (hero Android 분기 절단) |
| Design Review | `/plan-design-review` | UI/UX gaps | 0 | — | HTML 프리뷰로 사전 승인됨 (share-ios-launched.html) |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | — |

- **CODEX:** outside voice 10건 — 핵심 캐치: /android TestFlight 라벨 잔존(C3), hero 베타 뱃지 모순(C4), 글로벌 env fallback 롤백 함정(C1→fallback 제거), 타입 역의존(C6), Phase 순서(C9). 전부 플랜 본문에 흡수.
- **CROSS-MODEL:** Codex #5(`app_store` variant 제거)만 Claude 리뷰와 충돌 — 사용자 결정으로 variant 유지 (explicit > clever).
- **VERDICT:** ENG CLEARED — ready to implement.

NO UNRESOLVED DECISIONS
