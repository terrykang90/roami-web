import { describe, expect, it, vi } from "vitest";

// generateMetadata만 검증 — 무거운 의존성은 전부 mock.
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "accept-language": "ko" }),
}));
vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => `[${key}]`,
}));
vi.mock("@/lib/api", () => ({ getPublicMeetup: vi.fn() }));
vi.mock("qrcode", () => ({ default: { toDataURL: async () => "data:," } }));
vi.mock("./ShareCard", () => ({ default: () => null }));
vi.mock("./GetAppPanel", () => ({ default: () => null, StoreBadges: () => null }));
vi.mock("./Shell", () => ({ Shell: () => null, CtaButton: () => null }));

import { generateMetadata } from "./page";
import { getPublicMeetup } from "@/lib/api";

const params = Promise.resolve({ id: "abc123" });

// 회귀 핀: robots.ts가 /m/ 크롤링을 허용하는 전제가 "모든 분기 noindex"다.
// 2026-06-11 리뷰에서 성공 분기에 noindex가 빠져 있던 걸 발견 — base로 이동.
describe("share page generateMetadata — noindex on every branch", () => {
  it("live meetup pages are noindexed", async () => {
    vi.mocked(getPublicMeetup).mockResolvedValue({
      kind: "ok",
      meetup: { title: "T", description: "D", city: "Chiang Mai", categoryLabel: "Eat" },
    } as never);
    const md = await generateMetadata({ params });
    expect(md.robots).toEqual({ index: false });
    // og:image 해석은 www로 코드 고정 (Vercel env 의존 제거)
    expect(String(md.metadataBase)).toBe("https://www.roami.kr/");
  });

  it("not-found pages are noindexed", async () => {
    vi.mocked(getPublicMeetup).mockResolvedValue({ kind: "not_found" } as never);
    const md = await generateMetadata({ params });
    expect(md.robots).toEqual({ index: false });
  });
});
