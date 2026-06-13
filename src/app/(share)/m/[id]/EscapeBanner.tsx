import { bannerState, type InAppBrowser } from "@/lib/webview";
import type { ShareT } from "@/lib/share";

// In-app browser escape banner for the share page. Kakao/LINE/Instagram etc.
// open links in their own webview, where iOS Universal Links are bypassed (the
// app never opens). webview.ts (ROA-222) already knows how to bounce out to an
// external browser per app; reused verbatim here so a shared meetup link can
// actually reach the app. SERVER-rendered — the escape path must be in the
// first HTML, never behind hydration (eng review ROA-222 issue 1).
export default function EscapeBanner({
  ua,
  currentUrl,
  t,
}: {
  ua: string | null;
  currentUrl: string;
  t: ShareT;
}) {
  const banner = bannerState(ua, currentUrl);
  if (!banner) return null;

  const title =
    banner.app === "kakaotalk"
      ? t("webviewTitleKakao")
      : banner.app === "line"
        ? t("webviewTitleLine")
        : t("webviewTitleGeneric");

  return (
    <div className="mb-4 rounded-2xl border border-secondary/30 bg-secondary-light px-5 py-4">
      <p className="text-sm font-bold leading-relaxed text-text-primary">📱 {title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
        {banner.mode === "escape" ? t("webviewSub") : t("webviewManualOnly")}
      </p>
      {banner.mode === "escape" && (
        <>
          <a
            href={banner.url}
            className="mt-3 inline-flex min-h-[44px] items-center rounded-full bg-secondary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary/90"
          >
            {t("webviewCta")}
          </a>
          {/* Always visible: scheme-navigation failure is undetectable from JS,
              so the manual fallback can't be hidden (eng review ROA-222). */}
          <p className="mt-2.5 text-xs leading-relaxed text-text-secondary">{t("webviewManual")}</p>
        </>
      )}
    </div>
  );
}

// Re-export so the page doesn't need a second webview.ts import just for typing.
export type { InAppBrowser };
