import { categoryEmoji } from "@/lib/share";

// CSS-built warm mini-map (locked mockup: meetup-hybrid.html). The blobs are
// decorative (aria-hidden); the pin carries an accessible label and the
// location is also present as card text, so no information is map-only (D3).
// A real static-map tile (Mapbox/Google, warm style) is a follow-up polish.

export type StateBadge = { label: string; tone: "dark" | "orange" } | null;

export default function MiniMap({
  category,
  city,
  locationLabel,
  mapAria,
  stateBadge,
  categoryLabel,
  dimmed,
}: {
  category: string;
  city: string;
  locationLabel: string;
  mapAria: string;
  stateBadge: StateBadge;
  categoryLabel: string;
  dimmed: boolean;
}) {
  const placeTag = [city, locationLabel].filter(Boolean).join(" · ");

  return (
    <div
      className={`relative h-[150px] overflow-hidden bg-map-land md:h-[200px] ${dimmed ? "grayscale-[0.7] opacity-85" : ""}`}
    >
      {/* decorative geography */}
      <div aria-hidden="true">
        <div className="absolute -right-[34px] -top-[44px] h-[120px] w-[120px] rotate-[14deg] rounded-[38px] bg-map-green" />
        <div className="absolute -bottom-[34px] left-[-30%] h-[90px] w-[150%] -rotate-[12deg] rounded-[40px] bg-map-water" />
        <div className="absolute left-[20px] top-[24px] h-[30px] w-[46px] rounded-[5px] bg-map-block" />
        <div className="absolute left-[78px] top-[18px] h-[40px] w-[34px] rounded-[5px] bg-map-block" />
        <div className="absolute bottom-[30px] right-[96px] h-[26px] w-[40px] rounded-[5px] bg-map-block" />
        <div className="absolute right-[40px] top-[40px] h-[30px] w-[30px] rounded-[5px] bg-map-block opacity-60" />
        <div className="absolute left-[-15%] top-[64px] h-[7px] w-[130%] -rotate-[7deg] rounded-[2px] bg-map-road" />
        <div className="absolute left-[120px] top-[-10%] h-[150%] w-[7px] rotate-[6deg] rounded-[2px] bg-map-road" />
        <div className="absolute left-[30%] top-[104px] h-[5px] w-[90%] rotate-[9deg] rounded-[2px] bg-map-road opacity-80" />
      </div>

      {/* pin marker */}
      <div
        role="img"
        aria-label={mapAria}
        className="absolute left-1/2 top-1/2 z-[4] -translate-x-1/2 -translate-y-[78%] text-center"
      >
        <div className="flex h-12 w-12 rotate-45 items-center justify-center rounded-[50%_50%_50%_8px] border-[3px] border-white bg-teal shadow-[0_8px_16px_rgba(33,149,143,0.4)]">
          <span className="-rotate-45 text-[22px]">{categoryEmoji(category)}</span>
        </div>
        <div aria-hidden="true" className="mx-auto mt-1.5 h-[7px] w-[22px] rounded-full bg-[rgba(26,22,20,0.18)] blur-[1px]" />
      </div>

      {/* state overlay (full / completed / cancelled) */}
      {stateBadge && (
        <div
          className={`absolute inset-0 z-[6] flex items-center justify-center text-[14px] font-bold text-white ${
            stateBadge.tone === "orange" ? "bg-[rgba(224,122,69,0.55)]" : "bg-[rgba(26,22,20,0.48)]"
          }`}
        >
          {stateBadge.label}
        </div>
      )}

      {/* place tag + category pill */}
      {placeTag && (
        <div className="absolute bottom-3 left-3 z-[5] rounded-full bg-white/90 px-3 py-1.5 text-[11.5px] font-bold text-text-primary backdrop-blur-[2px]">
          📍 {placeTag}
        </div>
      )}
      <div
        className={`absolute right-3 top-3 z-[5] rounded-full px-3 py-1.5 text-[11px] font-bold text-white ${dimmed ? "bg-text-muted" : "bg-secondary"}`}
      >
        {categoryEmoji(category)} {categoryLabel}
      </div>
    </div>
  );
}
