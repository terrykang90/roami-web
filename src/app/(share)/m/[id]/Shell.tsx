import Link from "next/link";
import type { ShareT } from "@/lib/share";

// Shared chrome for the share landing's page + not-found boundary:
// wordmark header, flexible main, tagline footer.
export function Shell({ children, t }: { children: React.ReactNode; t: ShareT }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-5 pb-3 pt-5 md:px-10">
        <Link
          href="/"
          className="rounded text-[19px] font-bold tracking-[-0.03em] focus:outline-none focus:ring-2 focus:ring-teal/40"
        >
          <span className="text-teal">roa</span>
          <span className="text-secondary">mi</span>
        </Link>
      </header>
      <main className="flex flex-1 flex-col">{children}</main>
      <footer className="px-4 pb-6 pt-4 text-center text-[10.5px] text-text-secondary">
        {t("footerTagline")}
      </footer>
    </div>
  );
}

export function CtaButton({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  const cls =
    "block min-h-[48px] rounded-full bg-teal px-6 py-[15px] text-center text-[16px] font-bold tracking-[-0.01em] text-white shadow-[0_9px_22px_rgba(44,181,174,0.34)] transition-colors hover:bg-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/50 focus:ring-offset-2";
  return external ? (
    <a href={href} className={cls}>
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
