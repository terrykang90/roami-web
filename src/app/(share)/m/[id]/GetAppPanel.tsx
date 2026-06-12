/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { APP_STORE_URL, LAUNCH, PLAY_STORE_URL, TESTFLIGHT_URL } from "@/lib/config";
import { AppleLogo, PlayLogo } from "@/components/StoreLogos";
import type { ShareT } from "@/lib/share";

// 배지 마크업 단일소스 — Apple 배지가 StoreBadges(양쪽)와 혼합 상태(단독)
// 두 곳에서 쓰여서, 복제하면 hover/focus 스타일이 따로 드리프트한다.
const badgeClass =
  "flex min-h-[44px] items-center justify-center gap-2 rounded-[11px] border border-border-default bg-white px-3 py-2 text-text-primary transition-colors hover:border-text-muted focus:outline-none focus:ring-2 focus:ring-teal/40";

function StoreBadge({
  href,
  logo,
  small,
  big,
}: {
  href: string;
  logo: React.ReactNode;
  small: string;
  big: string;
}) {
  return (
    <a href={href} className={badgeClass}>
      {logo}
      <span className="text-left">
        <small className="block text-[10px] leading-tight text-text-secondary">{small}</small>
        <b className="block text-[13px] font-bold leading-tight">{big}</b>
      </span>
    </a>
  );
}

/** Apple 단일 배지 — iOS만 출시된 혼합 상태에서 StoreBadges의 Apple쪽만 노출. */
function AppleBadge({ t }: { t: ShareT }) {
  return (
    <StoreBadge
      href={APP_STORE_URL}
      logo={<AppleLogo />}
      small={t("storeAppleSmall")}
      big={t("storeApple")}
    />
  );
}

export function StoreBadges({ t, column = false }: { t: ShareT; column?: boolean }) {
  return (
    <div className={`flex justify-center gap-2 ${column ? "flex-col" : ""}`}>
      <AppleBadge t={t} />
      <StoreBadge
        href={PLAY_STORE_URL}
        logo={<PlayLogo />}
        small={t("storeGoogleSmall")}
        big={t("storeGoogle")}
      />
    </div>
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

  // 2×2 전사분면 (plan 005 + /review 2A): resolveCta 진리표와 패널이 일치해야
  // 한다 — android만 launched인 롤백 시나리오에서 모바일은 Play로 보내는데
  // 데스크톱만 베타로 보내는 모순 방지.
  const bothLaunched = LAUNCH.ios === "launched" && LAUNCH.android === "launched";
  const iosOnlyLaunched = LAUNCH.ios === "launched" && !bothLaunched;
  const androidOnlyLaunched = LAUNCH.android === "launched" && !bothLaunched;

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

      {bothLaunched ? (
        <StoreBadges t={t} column />
      ) : iosOnlyLaunched ? (
        <div className="space-y-3">
          <AppleBadge t={t} />
          <Link href={androidBetaHref} className={betaBtn}>
            <PlayLogo /> {t("androidBetaCta")}
          </Link>
        </div>
      ) : androidOnlyLaunched ? (
        <div className="space-y-3">
          <StoreBadge
            href={PLAY_STORE_URL}
            logo={<PlayLogo />}
            small={t("storeGoogleSmall")}
            big={t("storeGoogle")}
          />
          <a href={TESTFLIGHT_URL} className={betaBtn}>
            <AppleLogo /> {t("testflightCta")}
          </a>
        </div>
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
