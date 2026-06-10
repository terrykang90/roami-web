import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPublicMeetup } from "@/lib/api";
import { categoryColor, categoryEmoji, formatStartTime } from "@/lib/share";

// Dynamic OG card, 1200×630 (D4). Always renders the active-style card —
// messenger platforms cache OG images, so state (full/ended) is unreliable
// here; the LIVE landing page is the accurate surface. Falls back to a generic
// branded card on any failure: never a broken/empty unfurl.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "roami meetup";

const THAI_RE = /[฀-๿]/;

function truncate(s: string, max: number): string {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

async function loadFonts(needsThai: boolean) {
  const dir = path.join(process.cwd(), "src", "assets", "fonts");
  const [rg, bd] = await Promise.all([
    readFile(path.join(dir, "LINESeedKR-Rg.otf")),
    readFile(path.join(dir, "LINESeedKR-Bd.otf")),
  ]);
  const fonts = [
    { name: "LINESeed", data: rg, weight: 400 as const, style: "normal" as const },
    { name: "LINESeed", data: bd, weight: 700 as const, style: "normal" as const },
  ];
  if (needsThai) {
    // LINESeedKR has no Thai glyphs; pull Prompt best-effort (skip on failure).
    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Prompt:wght@700&display=swap",
        { headers: { "User-Agent": "Mozilla/5.0" } },
      ).then((r) => r.text());
      const url = css.match(/src: url\((.+?)\) format/)?.[1];
      if (url) {
        const data = await fetch(url).then((r) => r.arrayBuffer());
        fonts.push({
          name: "LINESeed",
          data: Buffer.from(data),
          weight: 700 as const,
          style: "normal" as const,
        });
      }
    } catch {
      // tofu for Thai beats a broken image
    }
  }
  return fonts;
}

function Wordmark({ size: fz }: { size: number }) {
  return (
    <div style={{ display: "flex", fontSize: fz, fontWeight: 700, letterSpacing: "-0.03em" }}>
      <span style={{ color: "#2CB5AE" }}>roa</span>
      <span style={{ color: "#E07A45" }}>mi</span>
    </div>
  );
}

export default async function OgImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // OG crawlers rarely send Accept-Language; en matches the backend fallback.
  const result = await getPublicMeetup(id, "en");

  if (result.kind !== "ok") {
    const fonts = await loadFonts(false);
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            background: "linear-gradient(135deg, #E6F8F6 0%, #F8F6F4 60%)",
            fontFamily: "LINESeed",
          }}
        >
          <Wordmark size={96} />
          <div style={{ display: "flex", fontSize: 36, color: "#6B6460" }}>
            travel meetups, right on the map
          </div>
        </div>
      ),
      { ...size, fonts },
    );
  }

  const m = result.meetup;
  const color = categoryColor(m.category);
  const title = truncate(m.title, 36);
  const place = [m.city, m.locationLabel].filter(Boolean).join(" · ");
  const date = formatStartTime(m.startTime, "en");
  const hostName = m.host.nickname?.trim() || "Host";
  const fonts = await loadFonts(THAI_RE.test(`${m.title}${place}`));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: `linear-gradient(135deg, ${color}26 0%, #F8F6F4 55%, #FFFFFF 100%)`,
          fontFamily: "LINESeed",
          color: "#1A1614",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Wordmark size={52} />
          <div
            style={{
              display: "flex",
              background: color,
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
              padding: "10px 28px",
              borderRadius: 999,
            }}
          >
            {m.categoryLabel}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 96 }}>{categoryEmoji(m.category)}</div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#6B6460" }}>
            📍 {place || "roami"} · {date}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#6B6460",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 999,
                background: "#E6F8F6",
                color: "#21958F",
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {hostName.slice(0, 1).toUpperCase()}
            </div>
            <span>{hostName}</span>
          </div>
          {m.max > 0 && (
            <div
              style={{
                display: "flex",
                background: "#2CB5AE",
                color: "#FFFFFF",
                fontWeight: 700,
                padding: "10px 26px",
                borderRadius: 999,
              }}
            >
              {m.current}/{m.max}
            </div>
          )}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
