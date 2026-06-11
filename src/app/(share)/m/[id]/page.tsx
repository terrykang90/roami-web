import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import QRCode from "qrcode";
import { getPublicMeetup } from "@/lib/api";
import {
  APP_STORE_URL,
  LAUNCH_STATE,
  PLAY_STORE_URL,
  SITE_BASE,
  TESTFLIGHT_URL,
} from "@/lib/config";
import {
  androidBetaPath,
  ctaLabelKey,
  detectPlatform,
  resolveCta,
  resolveCtaHref,
  resolveLocale,
  resolveState,
  type CtaVariant,
  type ShareLocale,
  type ShareState,
  type ShareT,
} from "@/lib/share";
import ShareCard from "./ShareCard";
import GetAppPanel, { StoreBadges } from "./GetAppPanel";
import { CtaButton, Shell } from "./Shell";

// Public share landing (ROA-192 Phase 2). Server-rendered; personalizes on
// Accept-Language (chrome locale) + User-Agent (CTA platform), so the route is
// dynamic — the API fetch itself is data-cached (revalidate: 60). Next emits
// `private, no-store` for the HTML; if a CDN is ever put in front, /m/* HTML
// must NOT be force-cached (locale/platform poisoning — see DESIGN.md).

type Params = { params: Promise<{ id: string }> };

// androidBeta is the locale-prefixed self-onboarding page (Google Group →
// opt-in → install) — same destination as the landing hero's Android tile,
// plus ?from= so the user can return to this meetup afterwards (ROA-223).
function ctaUrls(locale: ShareLocale, meetupId: string) {
  return {
    testflight: TESTFLIGHT_URL,
    appStore: APP_STORE_URL,
    playStore: PLAY_STORE_URL,
    androidBeta: androidBetaPath(locale, `/m/${meetupId}`),
  };
}

async function viewerLocale(): Promise<ShareLocale> {
  const h = await headers();
  return resolveLocale(h.get("accept-language"));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const locale = await viewerLocale();
  const t = await getTranslations({ locale, namespace: "share" });
  const result = await getPublicMeetup(id, locale);

  const base: Metadata = {
    openGraph: {
      url: `${SITE_BASE}/m/${id}`,
      siteName: "roami",
      type: "website",
      locale: locale === "ko" ? "ko_KR" : locale === "th" ? "th_TH" : "en_US",
    },
    twitter: { card: "summary_large_image" },
  };

  if (result.kind !== "ok") {
    const title = result.kind === "not_found" ? t("notFoundTitle") : "roami";
    return {
      ...base,
      title: `${title} · roami`,
      description: t("notFoundDesc"),
      openGraph: { ...base.openGraph, title, description: t("notFoundDesc") },
      robots: { index: false },
    };
  }

  const m = result.meetup;
  const description = m.description.trim() || `${m.city} · ${m.categoryLabel} · roami`;
  return {
    ...base,
    title: `${m.title} · roami`,
    description,
    openGraph: { ...base.openGraph, title: m.title, description },
    twitter: { ...base.twitter, title: m.title, description },
  };
}

export default async function ShareLandingPage({ params }: Params) {
  const { id } = await params;
  const h = await headers();
  const locale = resolveLocale(h.get("accept-language"));
  const platform = detectPlatform(h.get("user-agent"));
  const t = await getTranslations({ locale, namespace: "share" });
  const result = await getPublicMeetup(id, locale);

  // Gone/hidden meetup → branded not-found WITH a real 404 status (not-found.tsx).
  if (result.kind === "not_found") notFound();

  // Transient API failure: same shell, apologetic copy, still funnels to "/".
  if (result.kind === "error") {
    return (
      <Shell t={t}>
        <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center px-6 text-center">
          <p aria-hidden="true" className="text-[44px]">
            ⚠️
          </p>
          <h1 className="mb-1.5 mt-3 text-[18px] font-bold">{t("errorTitle")}</h1>
          <p className="text-[13.5px] leading-normal text-text-secondary">{t("errorDesc")}</p>
        </div>
        <div className="mx-auto w-full max-w-[480px] px-4 pb-2">
          <CtaButton href="/" label={t("ctaNotFound")} />
        </div>
      </Shell>
    );
  }

  const meetup = result.meetup;
  const state = resolveState(meetup.status, meetup.full);
  const cta = resolveCta(platform, LAUNCH_STATE);
  const urls = ctaUrls(locale, id);
  const ctaHref = resolveCtaHref(state, cta, platform, urls);
  const qrDataUrl = await QRCode.toDataURL(`${SITE_BASE}/m/${id}`, {
    width: 300,
    margin: 0,
    color: { dark: "#1A1614", light: "#FFFFFF" },
  });

  return (
    <Shell t={t}>
      <div className="mx-auto flex w-full max-w-[1000px] flex-1 items-start justify-center gap-10 px-4 pb-6 pt-2 md:px-10 md:pt-8">
        {/* card column */}
        <div className="w-full max-w-[480px]">
          <ShareCard meetup={meetup} state={state} locale={locale} t={t} />

          {/* mobile CTA area (desktop uses the right panel) */}
          <div className="mt-4 md:hidden">
            <CtaButton
              href={ctaHref}
              label={t(ctaLabelKey(state, cta), { city: meetup.city || "Roami" })}
            />
            <SecondaryArea state={state} cta={cta} t={t} />
          </div>
        </div>

        {/* desktop get-app panel */}
        <div className="hidden w-[320px] flex-none md:block">
          <GetAppPanel qrDataUrl={qrDataUrl} androidBetaHref={urls.androidBeta} t={t} />
        </div>
      </div>
    </Shell>
  );
}

// Below the mobile CTA: state note (full/done/cancel) or install paths (active).
function SecondaryArea({ state, cta, t }: { state: ShareState; cta: CtaVariant; t: ShareT }) {
  if (state !== "active") {
    const note =
      state === "full" ? t("noteFull") : state === "completed" ? t("noteCompleted") : t("noteCancelled");
    return <p className="mt-2.5 text-center text-[12px] text-text-secondary">{note}</p>;
  }
  if (cta === "testflight") {
    return <p className="mt-2.5 text-center text-[12px] text-text-secondary">{t("testflightNote")}</p>;
  }
  if (cta === "android_beta") {
    return <p className="mt-2.5 text-center text-[12px] text-text-secondary">{t("androidBetaNote")}</p>;
  }
  if (cta === "stores") {
    return (
      <div className="mt-3">
        <StoreBadges t={t} />
      </div>
    );
  }
  return null;
}
