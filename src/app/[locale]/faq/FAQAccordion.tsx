"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-colors ${
              isOpen ? "border-teal/20 bg-teal-light/20" : "border-border-subtle bg-white"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-text-primary">{faq.question}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`flex-shrink-0 text-text-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-5">
                <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
