import { headers } from "next/headers";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import QRCode from "qrcode";
import { getPublicMeetup, type PublicMeetup } from "@/lib/api";
import {
  detectPlatform,
  resolveCta,
  resolveLocale,
  resolveState,
  type LaunchState,
  type ShareLocale,
  type ShareState,
} from "@/lib/share";
import ShareCard from "./ShareCard";
import GetAppPanel, { StoreBadges } from "./GetAppPanel";
import AndroidBetaForm, { type AndroidBetaLabels } from "./AndroidBetaForm";

// Public share landing (ROA-192 Phase 2). Server-rendered; personalizes on
// Accept-Language (chrome locale) + User-Agent (CTA platform), so the route is
// dynamic — the API fetch itself is data-cached (revalidate: 60).

const SITE_BASE = "https://roami.kr";
// Flip to the full store funnel at launch by changing ONE env var (plan 4b).
const LAUNCH_STATE: LaunchState =
  process.env.NEXT_PUBLIC_LAUNCH_STATE === "launched" ? "launched" : "prelaunch";
const TESTFLIGHT_URL =
  process.env.NEXT_PUBLIC_TESTFLIGHT_URL ?? "https://testflight.apple.com/join/AU2THE4z";
// Until the store listings exist these default to the marketing site (never a dead link).
const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "/";
const PLAY_STORE_URL = process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "/";

type Params = { params: Promise<{ id: string }> };

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

  const androidBetaLabels: AndroidBetaLabels = {
    title: t("androidBetaTitle"),
    placeholder: t("androidBetaPlaceholder"),
    submit: t("androidBetaSubmit"),
    submitting: t("androidBetaSubmitting"),
    success: t("androidBetaSuccess"),
    error: t("androidBetaError"),
    duplicate: t("androidBetaDuplicate"),
  };

  if (result.kind !== "ok") {
    const isNotFound = result.kind === "not_found";
    return (
      <Shell t={t}>
        <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center px-6 text-center">
          <p aria-hidden="true" className="text-[44px]">
            {isNotFound ? "🗺️" : "⚠️"}
          </p>
          <h1 className="mb-1.5 mt-3 text-[18px] font-bold">
            {isNotFound ? t("notFoundTitle") : t("errorTitle")}
          </h1>
          <p className="text-[13.5px] leading-normal text-text-secondary">
            {isNotFound ? t("notFoundDesc") : t("errorDesc")}
          </p>
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
            {cta === "android_beta_email" && state === "active" ? (
              <AndroidBetaForm meetupId={meetup.id} labels={androidBetaLabels} />
            ) : (
              <CtaButton href={ctaHref(state, cta)} label={ctaLabel(state, t, meetup)} />
            )}
            <SecondaryArea state={state} cta={cta} t={t} />
          </div>
        </div>

        {/* desktop get-app panel */}
        <div className="hidden w-[320px] flex-none md:block">
          <GetAppPanel
            qrDataUrl={qrDataUrl}
            launchState={LAUNCH_STATE}
            testflightUrl={TESTFLIGHT_URL}
            appStoreUrl={APP_STORE_URL}
            playStoreUrl={PLAY_STORE_URL}
            meetupId={meetup.id}
            androidBetaLabels={androidBetaLabels}
            t={t}
          />
        </div>
      </div>
    </Shell>
  );

  // CTA destination: active funnels into the app (per platform/launch state);
  // every other state funnels to the marketing site — no dead ends.
  function ctaHref(s: ShareState, c: string): string {
    if (s !== "active") return "/";
    if (c === "testflight") return TESTFLIGHT_URL;
    if (c === "stores") return platform === "ios" ? APP_STORE_URL : PLAY_STORE_URL;
    return "/"; // desktop CTA is informational; the panel carries the funnel
  }
}

function ctaLabel(
  state: ShareState,
  t: (k: string, v?: Record<string, string | number>) => string,
  meetup: PublicMeetup,
): string {
  switch (state) {
    case "active":
      return t("ctaActive");
    case "full":
      return t("ctaFull", { city: meetup.city || "Roami" });
    case "completed":
      return t("ctaCompleted");
    case "cancelled":
      return t("ctaCancelled");
  }
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  const cls =
    "block min-h-[48px] rounded-full bg-teal px-6 py-[15px] text-center text-[16px] font-bold tracking-[-0.01em] text-white shadow-[0_9px_22px_rgba(44,181,174,0.34)] transition-colors hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/50 focus:ring-offset-2";
  return external ? (
    <a href={href} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

// Below the mobile CTA: state note (full/done/cancel) or install paths (active).
function SecondaryArea({
  state,
  cta,
  t,
}: {
  state: ShareState;
  cta: string;
  t: (k: string, v?: Record<string, string | number>) => string;
}) {
  if (state !== "active") {
    const note =
      state === "full" ? t("noteFull") : state === "completed" ? t("noteCompleted") : t("noteCancelled");
    return <p className="mt-2.5 text-center text-[12px] text-text-secondary">{note}</p>;
  }
  if (cta === "testflight") {
    return <p className="mt-2.5 text-center text-[12px] text-text-secondary">{t("testflightNote")}</p>;
  }
  if (cta === "stores") {
    return (
      <div className="mt-3">
        <StoreBadges
          appStoreUrl={process.env.NEXT_PUBLIC_APP_STORE_URL ?? "/"}
          playStoreUrl={process.env.NEXT_PUBLIC_PLAY_STORE_URL ?? "/"}
          t={t}
        />
      </div>
    );
  }
  return null;
}

function Shell({
  children,
  t,
}: {
  children: React.ReactNode;
  t: (k: string) => string;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 pb-3 pt-5 md:px-10">
        <Link
          href="/"
          className="text-[19px] font-bold tracking-[-0.03em] focus:outline-none focus:ring-2 focus:ring-teal/40 rounded"
        >
          <span className="text-teal">roa</span>
          <span className="text-secondary">mi</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="px-4 pb-6 pt-4 text-center text-[10.5px] text-text-secondary">
        {t("footerTagline")}
      </footer>
    </div>
  );
}
