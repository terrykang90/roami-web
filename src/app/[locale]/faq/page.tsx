import { getTranslations } from "next-intl/server";
import FAQAccordion from "./FAQAccordion";

export async function generateMetadata() {
  const t = await getTranslations("faq");
  return {
    title: `${t("title")} — Roami`,
    description: t("subtitle"),
  };
}

export default async function FAQPage() {
  const t = await getTranslations("faqPage");
  const faq = await getTranslations("faq");

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
    { question: t("q6"), answer: t("a6") },
    { question: t("q7"), answer: t("a7") },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{faq("title")}</h1>
        <p className="text-sm text-gray-500">{faq("subtitle")}</p>
      </div>

      <FAQAccordion faqs={faqs} />

      <div className="mt-14 text-center bg-gray-50 rounded-2xl p-8">
        <p className="text-sm text-gray-500 mb-3">{faq("contactPrompt")}</p>
        <a
          href="mailto:hello@roami.kr"
          className="inline-block text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
        >
          {faq("contactLink")}
        </a>
      </div>
    </div>
  );
}
