import { headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/share";
import { CtaButton, Shell } from "./Shell";

// Branded not-found state with a REAL 404 status (the page calls notFound()
// when the API says the meetup is gone/hidden) — avoids soft-404ing infinite
// /m/<junk> URLs while keeping the "no dead ends" CTA.
export default async function ShareNotFound() {
  const h = await headers();
  const locale = resolveLocale(h.get("accept-language"));
  const t = await getTranslations({ locale, namespace: "share" });

  return (
    <Shell t={t}>
      <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center px-6 text-center">
        <p aria-hidden="true" className="text-[44px]">
          🗺️
        </p>
        <h1 className="mb-1.5 mt-3 text-[18px] font-bold">{t("notFoundTitle")}</h1>
        <p className="text-[13.5px] leading-normal text-text-secondary">{t("notFoundDesc")}</p>
      </div>
      <div className="mx-auto w-full max-w-[480px] px-4 pb-2">
        <CtaButton href="/" label={t("ctaNotFound")} />
      </div>
    </Shell>
  );
}
