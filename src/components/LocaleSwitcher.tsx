"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = locale === "ko" ? "en" : "ko";
  const label = locale === "ko" ? "EN" : "한국어";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale;
    router.push(segments.join("/"));
  }

  return (
    <button
      onClick={switchLocale}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-secondary hover:bg-bg-tertiary cursor-pointer transition-colors"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
      {label}
    </button>
  );
}
