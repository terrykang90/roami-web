"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const t = useTranslations("waitlistForm");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("https://api.roami.kr/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, city, language }),
      });

      if (!res.ok) {
        if (res.status === 409) {
          throw new Error(t("errorDuplicate"));
        }
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || data?.message || t("errorDefault"));
      }

      setStatus("success");
      setEmail("");
      setCity("");
      setLanguage("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : t("errorDefault"));
    }
  }

  if (status === "success") {
    return (
      <div className="bg-teal-light rounded-2xl p-8 text-center max-w-md mx-auto">
        <div className="text-4xl mb-3">&#10003;</div>
        <h3 className="text-lg font-bold text-teal-dark mb-2">{t("successTitle")}</h3>
        <p className="text-sm text-gray-600">{t("successDesc")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-teal hover:text-teal-dark underline underline-offset-2 transition-colors"
        >
          {t("successAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <div>
        <label htmlFor="waitlist-email" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("emailLabel")}
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-sm"
        />
      </div>
      <div>
        <label htmlFor="waitlist-city" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("cityLabel")}
        </label>
        <input
          id="waitlist-city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder={t("cityPlaceholder")}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-sm"
        />
      </div>
      <div>
        <label htmlFor="waitlist-language" className="block text-sm font-medium text-gray-700 mb-1.5">
          {t("languageLabel")}
        </label>
        <select
          id="waitlist-language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal transition-all text-sm"
        >
          <option value="">&mdash;</option>
          <option value="ko">{t("languageKo")}</option>
          <option value="en">{t("languageEn")}</option>
          <option value="vi">{t("languageVi")}</option>
          <option value="zh">{t("languageZh")}</option>
          <option value="th">{t("languageTh")}</option>
          <option value="ja">{t("languageJa")}</option>
          <option value="both">{t("languageBoth")}</option>
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-2.5">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-teal hover:bg-teal-dark text-white font-semibold py-3.5 px-6 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
      >
        {status === "loading" ? t("submitting") : t("submit")}
      </button>

      <p className="text-xs text-gray-400 text-center">{t("spam")}</p>
    </form>
  );
}
