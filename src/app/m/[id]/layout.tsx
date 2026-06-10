import { headers } from "next/headers";
import localFont from "next/font/local";
import { Prompt } from "next/font/google";
import { resolveLocale } from "@/lib/share";
import "../../globals.css";

// The share landing lives OUTSIDE the [locale] segment (shared links must not
// be locale-redirected), so this layout owns its own <html>/<body> and resolves
// the viewer's language from Accept-Language (D2/D3).

const lineSeedKR = localFont({
  src: [
    { path: "../../../assets/fonts/LINESeedKR-Rg.otf", weight: "400", style: "normal" },
    { path: "../../../assets/fonts/LINESeedKR-Bd.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});

// Thai script isn't covered by LINESeedKR; Prompt matches the app's Thai font.
const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export default async function ShareLayout({ children }: { children: React.ReactNode }) {
  const h = await headers();
  const locale = resolveLocale(h.get("accept-language"));

  return (
    <html lang={locale}>
      <body
        className={`${locale === "th" ? prompt.className : lineSeedKR.className} antialiased bg-bg-secondary text-text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
