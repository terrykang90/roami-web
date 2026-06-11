import { describe, expect, it, vi } from "vitest";

// next/font는 Next 컴파일러 밖(vitest)에서 호출되면 죽는다 — 모듈 로드 전에 mock.
vi.mock("next/font/local", () => ({
  default: () => ({ variable: "--font-mock", className: "font-mock" }),
}));
vi.mock("next/font/google", () => ({
  Prompt: () => ({ className: "font-mock" }),
}));
vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => `[${key}]`,
  getMessages: async () => ({}),
}));

import { generateMetadata } from "./layout";

// 회귀 핀: og:url은 apex(SITE_BASE)가 아니라 canonical 호스트(www)여야 한다.
// apex는 307이라 link equity가 갈라진다 — plan 003 Phase 1의 의도적 변경.
describe("layout generateMetadata", () => {
  it.each(["ko", "en", "th"])("og:url uses the www canonical host (%s)", async (locale) => {
    const md = await generateMetadata({ params: Promise.resolve({ locale }) });
    expect(md.openGraph?.url).toBe(`https://www.roami.kr/${locale}`);
    expect(String(md.metadataBase)).toBe("https://www.roami.kr/");
  });

  it("does not set alternates — pages declare their own (Issue 2A)", async () => {
    const md = await generateMetadata({ params: Promise.resolve({ locale: "ko" }) });
    expect(md.alternates).toBeUndefined();
  });
});
