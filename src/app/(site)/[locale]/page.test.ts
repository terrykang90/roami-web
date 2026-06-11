import { describe, expect, it, vi } from "vitest";

// generateMetadata만 검증 — 페이지 본문 의존성은 mock (share page.test.ts 패턴).
vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => `[${key}]`,
  getLocale: async () => "ko",
}));
vi.mock("@/components/ScrollReveal", () => ({ default: () => null }));
vi.mock("@/components/WaitlistForm", () => ({ default: () => null }));
vi.mock("./faq/FAQAccordion", () => ({ default: () => null }));

import { generateMetadata } from "./page";
import { routing } from "@/i18n/routing";
import { SITE_CANONICAL } from "@/lib/config";

// 회귀 핀: 미들웨어 matcher가 점(.) 포함 경로를 흘려보내므로 [locale] raw
// 세그먼트가 임의 문자열일 수 있다 — 검증 없이 canonical에 반사하면 안 된다.
describe("home generateMetadata — locale validation", () => {
  it("reflects a valid locale as self-referencing canonical", async () => {
    const md = await generateMetadata({ params: Promise.resolve({ locale: "th" }) });
    expect(md.alternates.canonical).toBe(`${SITE_CANONICAL}/th`);
  });

  it("falls back to defaultLocale for an arbitrary raw segment (no reflection)", async () => {
    const md = await generateMetadata({
      params: Promise.resolve({ locale: "favicon.ico" }),
    });
    expect(md.alternates.canonical).toBe(`${SITE_CANONICAL}/${routing.defaultLocale}`);
    expect(JSON.stringify(md)).not.toContain("favicon.ico");
  });
});
