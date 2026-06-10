/* eslint-disable @next/next/no-img-element */
import type { PublicMeetup } from "@/lib/api";
import {
  flagEmoji,
  formatStartTime,
  normalizeTier,
  type ShareLocale,
  type ShareState,
  type ShareT,
} from "@/lib/share";
import MiniMap from "./MiniMap";

// The hybrid meetup card (locked mockup: meetup-hybrid.html / meetup-states.html).
// All copy comes in via `t`; all D1 content fallbacks (no description, missing
// avatar/nationality/nickname, 0 reviews, unknown tier) are handled here.

const TIER_SHIELD = new Set(["trusted", "veteran"]);

export default function ShareCard({
  meetup,
  state,
  locale,
  t,
}: {
  meetup: PublicMeetup;
  state: ShareState;
  locale: ShareLocale;
  t: ShareT;
}) {
  const dimmed = state === "completed" || state === "cancelled";
  const stateBadge =
    state === "full"
      ? { label: `🔒 ${t("stateFull")}`, tone: "dark" as const }
      : state === "completed"
        ? { label: `✓ ${t("stateCompleted")}`, tone: "dark" as const }
        : state === "cancelled"
          ? { label: `✕ ${t("stateCancelled")}`, tone: "orange" as const }
          : null;

  const dateText = formatStartTime(meetup.startTime, locale);
  const dateSuffix =
    state === "completed" ? t("dateSuffixCompleted") : state === "cancelled" ? t("dateSuffixCancelled") : null;

  const host = meetup.host;
  const nickname = host.nickname?.trim() || t("hostFallback");
  const flag = flagEmoji(host.nationality);
  // Whitelisted tier → never leaks a raw i18n key path if the backend adds a tier.
  const tier = normalizeTier(host.tierBadge);
  const tierLabel = t(`tier_${tier}`);
  // D1: a brand-new host shows the tier chip only — no "hosted 0 · 👍 0" line.
  const trustParts: string[] = [];
  if (host.hostedCount > 0) trustParts.push(t("hostedCount", { count: host.hostedCount }));
  if (host.positiveReviewCount > 0) {
    trustParts.push(`👍 ${t("recommendedCount", { count: host.positiveReviewCount })}`);
  }
  const showParticipants = meetup.max > 0 && (state === "active" || state === "full");

  return (
    <article className="overflow-hidden rounded-[18px] border border-border-subtle bg-white shadow-[0_12px_30px_rgba(33,149,143,0.12)]">
      <MiniMap
        category={meetup.category}
        city={meetup.city}
        locationLabel={meetup.locationLabel}
        mapAria={t("mapAria", { city: meetup.city || "Roami" })}
        stateBadge={stateBadge}
        categoryLabel={meetup.categoryLabel}
        dimmed={dimmed}
      />

      <div className={`px-4 pb-4 pt-[15px] md:px-6 md:pb-6 md:pt-5 ${dimmed ? "opacity-65" : ""}`}>
        <h1 className="mb-2 mt-0.5 line-clamp-2 text-[21px] font-bold leading-[1.22] tracking-[-0.02em] md:text-[25px]">
          {meetup.title}
        </h1>

        {/* D1: title-only meetup → no empty description gap */}
        {meetup.description.trim() && (
          <p className="mb-3 line-clamp-3 text-[14px] leading-normal text-text-secondary md:line-clamp-4 md:text-[15px]">
            {meetup.description}
          </p>
        )}

        <p className="my-2 flex items-center gap-2 text-[13.5px] text-text-secondary md:text-[15px]">
          <span aria-hidden="true" className="w-4 text-center text-secondary">
            🗓️
          </span>
          <span>
            {dateText}
            {dateSuffix && <span> · {dateSuffix}</span>}
          </span>
        </p>

        <div aria-hidden="true" className="my-[13px] h-px bg-border-subtle" />

        <div className="flex items-center gap-2.5">
          {/* avatar — monogram fallback, never a broken image (D1) */}
          <span className="relative h-10 w-10 flex-none">
            {host.profileImageUrl ? (
              <img
                src={host.profileImageUrl}
                alt={nickname}
                width={40}
                height={40}
                referrerPolicy="no-referrer"
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-light text-[16px] font-bold text-teal-dark">
                {nickname.slice(0, 1).toUpperCase()}
              </span>
            )}
            {flag && (
              <span aria-hidden="true" className="absolute -bottom-[3px] -right-[3px] text-[15px]">
                {flag}
              </span>
            )}
          </span>

          <span className="min-w-0">
            <span className="block text-[14px] font-bold">
              {nickname}
              <span className="ml-1.5 inline-block rounded-full bg-teal-light px-2 py-0.5 align-middle text-[10px] font-bold text-teal-dark">
                {TIER_SHIELD.has(tier) && <span aria-hidden="true">🛡️ </span>}
                {tierLabel}
              </span>
            </span>
            {trustParts.length > 0 && (
              <span className="block text-[12px] text-text-secondary">{trustParts.join(" · ")}</span>
            )}
          </span>

          {showParticipants && (
            <span
              className={`ml-auto rounded-full px-3 py-1.5 text-[13px] font-bold text-white ${state === "full" ? "bg-text-muted" : "bg-teal"}`}
            >
              {meetup.current}/{meetup.max}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
