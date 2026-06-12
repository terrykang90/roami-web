import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// LAUNCH는 모듈 로드 시 env를 읽는다 — 케이스마다 resetModules + 동적 import.
describe('LAUNCH env 강등 가드 (/review 1A)', () => {
  beforeEach(() => {
    vi.resetModules()
  })
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('launched + https 스토어 URL → launched', async () => {
    vi.stubEnv('NEXT_PUBLIC_IOS_LAUNCH_STATE', 'launched')
    vi.stubEnv('NEXT_PUBLIC_APP_STORE_URL', 'https://apps.apple.com/app/roami/id6760629019')
    const { LAUNCH } = await import('./config')
    expect(LAUNCH.ios).toBe('launched')
  })

  it('launched인데 스토어 URL env 미설정 → prelaunch 강등 (홈 루프 방지)', async () => {
    vi.stubEnv('NEXT_PUBLIC_IOS_LAUNCH_STATE', 'launched')
    const { LAUNCH } = await import('./config')
    expect(LAUNCH.ios).toBe('prelaunch')
  })

  it('android도 동일 가드 — launched + URL 없으면 prelaunch', async () => {
    vi.stubEnv('NEXT_PUBLIC_ANDROID_LAUNCH_STATE', 'launched')
    const { LAUNCH } = await import('./config')
    expect(LAUNCH.android).toBe('prelaunch')
  })

  it('env 전무 → 양쪽 prelaunch (기본값 회귀)', async () => {
    const { LAUNCH } = await import('./config')
    expect(LAUNCH.ios).toBe('prelaunch')
    expect(LAUNCH.android).toBe('prelaunch')
  })

  it('레거시 글로벌 NEXT_PUBLIC_LAUNCH_STATE는 무시된다 (C1 롤백 함정)', async () => {
    vi.stubEnv('NEXT_PUBLIC_LAUNCH_STATE', 'launched')
    vi.stubEnv('NEXT_PUBLIC_APP_STORE_URL', 'https://apps.apple.com/app/roami/id6760629019')
    const { LAUNCH } = await import('./config')
    expect(LAUNCH.ios).toBe('prelaunch')
    expect(LAUNCH.android).toBe('prelaunch')
  })
})
