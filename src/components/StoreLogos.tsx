// 스토어 로고 글리프 단일소스 (plan 005 eng-review 2A) — GetAppPanel과 랜딩
// hero가 각자 다른 사과 패스를 인라인으로 들고 있던 중복을 여기로 합친다.
// 로고를 바꿀 일이 생기면(다크모드 등) 이 파일만 고친다.

export function AppleLogo({ size = 16 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

// Default 15, not 16: the Play glyph fills more of its viewBox than the Apple
// mark, so equal nominal size renders optically larger next to AppleLogo.
export function PlayLogo({ size = 15 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className="shrink-0"
    >
      <path d="M3.6 1.8c-.4.2-.6.6-.6 1.1v18.2c0 .5.2.9.6 1.1l9.5-10.2L3.6 1.8zM14.6 10.6 5.3 1l11.6 6.6-2.3 3zM5.3 23l9.3-9.6 2.3 3L5.3 23zM17.9 8.2l-2.6 3.8 2.6 3.8 3.5-2c1-.6 1-2.9 0-3.5l-3.5-2.1z" />
    </svg>
  );
}
