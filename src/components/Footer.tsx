"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="text-lg font-bold tracking-tight">
              <span style={{ color: "#194F54" }}>r</span>
              <span style={{ color: "#3B9293" }}>o</span>
              <span style={{ color: "#195055" }}>a</span>
              <span style={{ color: "#3B9293" }}>m</span>
              <span style={{ color: "#195055" }}>i</span>
            </span>
            <p className="text-sm text-gray-400 mt-2">{t("tagline")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t("services")}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`https://plan.roami.kr/${locale}`}
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    {t("planner")}
                  </a>
                </li>
                <li>
                  <Link
                    href={`/${locale}/faq`}
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    {t("faqLink")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t("legal")}</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href={`/${locale}/privacy`}
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    {t("privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/terms`}
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    {t("terms")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">{t("contact")}</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@roami.kr"
                    className="text-sm text-gray-500 hover:text-teal transition-colors"
                  >
                    hello@roami.kr
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Roami. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
