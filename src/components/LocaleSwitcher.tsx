"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";

const LOCALES = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "th", label: "ไทย" },
] as const;

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside the dropdown.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchTo(code: string) {
    setOpen(false);
    if (code === locale) return;
    const segments = pathname.split("/");
    segments[1] = code;
    // Preserve query + hash so locale switches keep UTM params and section anchors.
    const suffix =
      typeof window !== "undefined" ? window.location.search + window.location.hash : "";
    router.push(segments.join("/") + suffix);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls="locale-menu"
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
        {current.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id="locale-menu"
          className="absolute right-0 mt-2 min-w-[128px] py-1 rounded-xl bg-white border border-border-subtle shadow-lg z-50"
        >
          {LOCALES.map((l) => (
            <li key={l.code}>
              <button
                aria-current={l.code === locale ? "true" : undefined}
                onClick={() => switchTo(l.code)}
                className={`w-full text-left px-4 py-2 text-sm cursor-pointer transition-colors hover:bg-bg-secondary ${
                  l.code === locale ? "text-teal font-semibold" : "text-text-secondary"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
