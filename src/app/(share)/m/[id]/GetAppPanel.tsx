/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { APP_STORE_URL, LAUNCH_STATE, PLAY_STORE_URL, TESTFLIGHT_URL } from "@/lib/config";
import type { ShareT } from "@/lib/share";

function AppleLogo({ size = 16 }: { size?: number }) {
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

export function StoreBadges({ t, column = false }: { t: ShareT; column?: boolean }) {
  const badge =
    "flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border border-border-default bg-white px-3 py-2 text-text-primary transition-colors hover:border-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40";
  return (
    <div className={`flex justify-center gap-2 ${column ? "flex-col" : ""}`}>
      <a href={APP_STORE_URL} className={badge}>
        <AppleLogo />
        <span className="text-left">
          <small className="block text-[10px] leading-tight text-text-secondary">
            {t("storeAppleSmall")}
          </small>
          <b className="block text-[13px] font-bold leading-tight">{t("storeApple")}</b>
        </span>
      </a>
      <a href={PLAY_STORE_URL} className={badge}>
        <PlayLogo />
        <span className="text-left">
          <small className="block text-[10px] leading-tight text-text-secondary">
            {t("storeGoogleSmall")}
          </small>
          <b className="block text-[13px] font-bold leading-tight">{t("storeGoogle")}</b>
        </span>
      </a>
    </div>
  );
}

// Default 15, not 16: the Play glyph fills more of its viewBox than the Apple
// mark, so equal nominal size renders optically larger next to AppleLogo.
function PlayLogo({ size = 15 }: { size?: number }) {
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

// Desktop right column (≥768px, meetup-desktop.html): QR is the hero — you
// can't install on a PC, so scan-to-phone leads and store paths are secondary.
export default function GetAppPanel({
  qrDataUrl,
  androidBetaHref,
  t,
}: {
  qrDataUrl: string;
  androidBetaHref: string;
  t: ShareT;
}) {
  const betaBtn =
    "flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border border-border-default bg-white px-3 py-2 text-[13px] font-bold text-text-primary transition-colors hover:border-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40";
  return (
    <aside className="sticky top-5 rounded-[20px] border border-border-subtle bg-white p-6 text-center shadow-[0_16px_36px_rgba(26,22,20,0.08)]">
      <h2 className="text-[21px] font-bold tracking-[-0.02em]">{t("getAppTitle")}</h2>
      <p className="mb-5 mt-2 text-[13.5px] leading-normal text-text-secondary">{t("getAppLede")}</p>

      <div className="mx-auto h-[172px] w-[172px] rounded-2xl border border-border-subtle bg-white p-2.5">
        <img src={qrDataUrl} alt={t("qrAlt")} width={300} height={300} className="block h-full w-full" />
      </div>
      <p className="mb-1 mt-3.5 text-[13px] font-bold text-text-primary">📱 {t("qrScan")}</p>
      <p className="mb-5 text-[12px] text-text-secondary">{t("qrSub")}</p>

      <div className="mb-4 flex items-center gap-2.5 text-[11.5px] text-text-secondary before:h-px before:flex-1 before:bg-border-subtle after:h-px after:flex-1 after:bg-border-subtle">
        {t("or")}
      </div>

      {LAUNCH_STATE === "launched" ? (
        <StoreBadges t={t} column />
      ) : (
        <div className="space-y-3">
          <a href={TESTFLIGHT_URL} className={betaBtn}>
            <AppleLogo /> {t("testflightCta")}
          </a>
          <Link href={androidBetaHref} className={betaBtn}>
            <PlayLogo /> {t("androidBetaCta")}
          </Link>
        </div>
      )}
    </aside>
  );
}
