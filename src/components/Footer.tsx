"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Image src="/logo.svg" alt="Roami" width={130} height={46} />
            <p className="text-sm text-text-muted mt-2">{t("tagline")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{t("services")}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://plan.roami.kr/${locale}`}
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    {t("planner")}
                  </a>
                </li>
                <li>
                  <Link
                    href={`/${locale}/faq`}
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    {t("faqLink")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{t("legal")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/terms`}
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-3">{t("contact")}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@roami.kr"
                    className="text-sm text-text-secondary hover:text-teal transition-colors"
                  >
                    hello@roami.kr
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border-default">
          <p className="text-xs text-text-muted text-center">
            &copy; {new Date().getFullYear()} Roami. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
