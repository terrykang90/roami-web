import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const lineSeedKR = localFont({
  src: [
    { path: "../assets/fonts/LINESeedKR-Rg.otf", weight: "400", style: "normal" },
    { path: "../assets/fonts/LINESeedKR-Bd.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-line-seed",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roami — 여행 동행, 지도에서 바로 찾기",
  description:
    "여행지에서 함께 밥 먹을 사람, 카페 갈 사람, 한잔 할 사람을 지도에서 바로 찾아보세요. 한국인 여행자를 위한 지도 기반 동행 매칭 앱, Roami.",
  keywords: ["여행", "동행", "여행 동행", "한국인 여행자", "travel meetup", "roami", "지도"],
  openGraph: {
    title: "Roami — 여행 동행, 지도에서 바로 찾기",
    description: "여행지에서 함께 밥 먹을 사람, 카페 갈 사람, 한잔 할 사람을 지도에서 바로 찾아보세요.",
    url: "https://roami.app",
    siteName: "Roami",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roami — 여행 동행, 지도에서 바로 찾기",
    description: "여행지에서 함께 밥 먹을 사람, 카페 갈 사람, 한잔 할 사람을 지도에서 바로 찾아보세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${lineSeedKR.className} antialiased bg-white text-gray-900`}>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
