import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import localFont from "next/font/local";
import { Prompt } from "next/font/google";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";

const lineSeedKR = localFont({
  src: [
    { path: "../../assets/fonts/LINESeedKR-Rg.otf", weight: "400", style: "normal" },
    { path: "../../assets/fonts/LINESeedKR-Bd.otf", weight: "700", style: "normal" },
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
      url: "https://roami.kr",
      siteName: "roami",
      locale: locale === "ko" ? "ko_KR" : locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
