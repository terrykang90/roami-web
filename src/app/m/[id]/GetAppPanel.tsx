/* eslint-disable @next/next/no-img-element */
import type { LaunchState } from "@/lib/share";
import AndroidBetaForm, { type AndroidBetaLabels } from "./AndroidBetaForm";

type T = (key: string, values?: Record<string, string | number>) => string;

export function StoreBadges({
  appStoreUrl,
  playStoreUrl,
  t,
  column = false,
}: {
  appStoreUrl: string;
  playStoreUrl: string;
  t: T;
  column?: boolean;
}) {
  const badge =
    "flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border border-border-default bg-white px-3 py-2 text-text-primary transition-colors hover:border-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40";
  return (
    <div className={`flex justify-center gap-2 ${column ? "flex-col" : ""}`}>
      <a href={appStoreUrl} className={badge}>
        <span aria-hidden="true" className="text-[18px]">

        </span>
        <span className="text-left">
          <small className="block text-[9px] leading-tight text-text-muted">{t("storeAppleSmall")}</small>
          <b className="block text-[13px] font-bold leading-tight">{t("storeApple")}</b>
        </span>
      </a>
      <a href={playStoreUrl} className={badge}>
        <span aria-hidden="true" className="text-[16px]">
          ▶
        </span>
        <span className="text-left">
          <small className="block text-[9px] leading-tight text-text-muted">{t("storeGoogleSmall")}</small>
          <b className="block text-[13px] font-bold leading-tight">{t("storeGoogle")}</b>
        </span>
      </a>
    </div>
  );
}

// Desktop right column (≥768px, meetup-desktop.html): QR is the hero — you
// can't install on a PC, so scan-to-phone leads and store paths are secondary.
export default function GetAppPanel({
  qrDataUrl,
  launchState,
  testflightUrl,
  appStoreUrl,
  playStoreUrl,
  meetupId,
  androidBetaLabels,
  t,
}: {
  qrDataUrl: string;
  launchState: LaunchState;
  testflightUrl: string;
  appStoreUrl: string;
  playStoreUrl: string;
  meetupId: string | null;
  androidBetaLabels: AndroidBetaLabels;
  t: T;
}) {
  return (
    <aside className="sticky top-5 rounded-[20px] border border-border-subtle bg-white p-6 text-center shadow-[0_16px_36px_rgba(26,22,20,0.08)]">
      <h2 className="text-[21px] font-bold tracking-[-0.02em]">{t("getAppTitle")}</h2>
      <p className="mb-5 mt-2 text-[13.5px] leading-normal text-text-secondary">{t("getAppLede")}</p>

      <div className="mx-auto h-[172px] w-[172px] rounded-2xl border border-border-subtle bg-white p-2.5">
        <img src={qrDataUrl} alt={t("qrAlt")} width={300} height={300} className="block h-full w-full" />
      </div>
      <p className="mb-1 mt-3.5 text-[13px] font-bold text-text-primary">📱 {t("qrScan")}</p>
      <p className="mb-5 text-[12px] text-text-secondary">{t("qrSub")}</p>

      <div className="mb-4 flex items-center gap-2.5 text-[11.5px] text-text-muted before:h-px before:flex-1 before:bg-border-subtle after:h-px after:flex-1 after:bg-border-subtle">
        {t("or")}
      </div>

      {launchState === "launched" ? (
        <StoreBadges appStoreUrl={appStoreUrl} playStoreUrl={playStoreUrl} t={t} column />
      ) : (
        <div className="space-y-3">
          <a
            href={testflightUrl}
            className="flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border border-border-default bg-white px-3 py-2 text-[13px] font-bold text-text-primary transition-colors hover:border-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40"
          >
            <span aria-hidden="true"></span> {t("testflightCta")}
          </a>
          <AndroidBetaForm meetupId={meetupId} labels={androidBetaLabels} />
        </div>
      )}
    </aside>
  );
}
