import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPublicMeetup } from "@/lib/api";
import { categoryColor, categoryEmoji, formatStartTime, truncate } from "@/lib/share";

// Dynamic OG card, 1200×630 (D4). Always renders the active-style card —
// messenger platforms cache OG images, so state (full/ended) is unreliable
// here; the LIVE landing page is the accurate surface.
//
// DoS surface notes (this route is unauthenticated and uncached by default):
// - Font buffers are cached at module scope — no per-request disk reads.
// - not-found/error serve a STATIC pre-rendered PNG (public/og-fallback.png):
//   junk ids never reach a satori render.
// - The ok-path sets an explicit public cache header so CDNs absorb repeats.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "roami meetup";

const THAI_RE = /[฀-๿]/;
const OK_CACHE = "public, max-age=300, s-maxage=86400";

let baseFontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 700; style: "normal" }[]> | null = null;
let thaiFontPromise: Promise<ArrayBuffer | null> | null = null;
let fallbackPngPromise: Promise<Buffer> | null = null;

function getBaseFonts() {
  baseFontsPromise ??= (async () => {
    const dir = path.join(process.cwd(), "src", "assets", "fonts");
    const [rg, bd] = await Promise.all([
      readFile(path.join(dir, "LINESeedKR-Rg.otf")),
      readFile(path.join(dir, "LINESeedKR-Bd.otf")),
    ]);
    return [
      { name: "LINESeed", data: rg, weight: 400 as const, style: "normal" as const },
      { name: "LINESeed", data: bd, weight: 700 as const, style: "normal" as const },
    ];
  })();
  return baseFontsPromise;
}

// LINESeedKR has no Thai glyphs; pull Prompt once, best-effort (tofu for Thai
// beats a hung OG render — the title is host-controlled, so the fetch is
// attacker-triggerable and MUST be bounded).
function getThaiFont() {
  thaiFontPromise ??= (async () => {
    try {
      const css = await fetch(
        "https://fonts.googleapis.com/css2?family=Prompt:wght@700&display=swap",
        {
          headers: { "User-Agent": "Mozilla/5.0" },
          signal: AbortSignal.timeout(2000),
          next: { revalidate: 86400 },
        },
      ).then((r) => r.text());
      const url = css.match(/src: url\((.+?)\) format/)?.[1];
      if (!url) return null;
      return await fetch(url, {
        signal: AbortSignal.timeout(2000),
        next: { revalidate: 86400 },
      }).then((r) => r.arrayBuffer());
    } catch {
      thaiFontPromise = null; // allow a later retry instead of caching the failure
      return null;
    }
  })();
  return thaiFontPromise;
}

async function loadFonts(needsThai: boolean) {
  const fonts = [...(await getBaseFonts())];
  if (needsThai) {
    const thai = await getThaiFont();
    if (thai) {
      fonts.push({
        name: "LINESeed",
        data: Buffer.from(thai),
        weight: 700 as const,
        style: "normal" as const,
      });
    }
  }
  return fonts;
}

function staticFallback() {
  fallbackPngPromise ??= readFile(path.join(process.cwd(), "public", "og-fallback.png"));
  return fallbackPngPromise.then(
    (buf) =>
      new Response(new Uint8Array(buf), {
        headers: { "Content-Type": "image/png", "Cache-Control": OK_CACHE },
      }),
  );
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

  if (result.kind !== "ok") return staticFallback();

  try {
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
      { ...size, fonts, headers: { "Cache-Control": OK_CACHE } },
    );
  } catch (e) {
    // Never a broken unfurl — any satori/font failure degrades to the brand card.
    console.error(`og-image(${id}) render failed:`, e);
    return staticFallback();
  }
}
