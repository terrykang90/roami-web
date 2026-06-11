import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import { Prompt } from "next/font/google";
import type { Metadata } from "next";
import { SITE_CANONICAL } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../../globals.css";

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_CANONICAL),
    // alternates(canonical/hreflang)는 의도적으로 layout에 두지 않는다 — 여기
    // 두면 alternates 없는 미래 페이지가 홈의 canonical을 상속해 "홈의 복제본"
    // 으로 조용히 디인덱스된다. 각 page.tsx가 localeAlternates()로 직접 선언.
    title: t("title"),
    description: t("description"),
    keywords:
      locale === "ko"
        ? ["여행", "모임", "여행 모임", "travel meetup", "roami", "지도"]
        : locale === "th"
          ? ["ท่องเที่ยว", "มีตอัป", "เพื่อนเที่ยว", "travel meetup", "roami", "แผนที่"]
          : ["travel", "meetup", "travel meetups", "nearby meetup", "roami", "map"],
    openGraph: {
      title: t("title"),
      description: t("description"),
      // og:url은 의도적으로 비움 — layout의 openGraph는 서브페이지에 통째로
      // 상속되므로, 여기 url을 박으면 /ko/faq 공유가 /ko로 뭉친다 (canonical과
      // 모순). og:url 부재 시 스크레이퍼는 실제 fetch URL을 쓴다.
      siteName: "roami",
      locale: locale === "ko" ? "ko_KR" : locale === "th" ? "th_TH" : "en_US",
      type: "website",
      images: [
        {
          url: `${SITE_CANONICAL}/og.png`,
          width: 1200,
          height: 630,
          alt: "roami — travel meetups, right on the map",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${SITE_CANONICAL}/og.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${locale === "th" ? prompt.className : lineSeedKR.className} antialiased bg-bg-primary text-text-primary`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
