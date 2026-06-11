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

// 회귀 핀: layout openGraph는 서브페이지에 통째로 상속되므로 og:url을 두면
// 안 된다 (/ko/faq 공유가 /ko로 뭉침 — canonical과 모순). metadataBase는 www.
describe("layout generateMetadata", () => {
  it.each(["ko", "en", "th"])("og:url is absent; metadataBase is www (%s)", async (locale) => {
    const md = await generateMetadata({ params: Promise.resolve({ locale }) });
    expect(md.openGraph?.url).toBeUndefined();
    expect(String(md.metadataBase)).toBe("https://www.roami.kr/");
  });

  it("does not set alternates — pages declare their own (Issue 2A)", async () => {
    const md = await generateMetadata({ params: Promise.resolve({ locale: "ko" }) });
    expect(md.alternates).toBeUndefined();
  });
});
