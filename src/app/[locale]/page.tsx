import Image from "next/image";
import Link from "next/link";
import { getTranslations, getLocale } from "next-intl/server";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";
import FAQAccordion from "./faq/FAQAccordion";

export default async function Home() {
  const locale = await getLocale();
  const hero = await getTranslations("hero");
  const problem = await getTranslations("problem");
  const solution = await getTranslations("solution");
  const features = await getTranslations("features");
  const howItWorks = await getTranslations("howItWorks");
  const whyRoami = await getTranslations("whyRoami");
  const cases = await getTranslations("useCases");
  const preview = await getTranslations("preview");
  const trust = await getTranslations("trust");
  const waitlist = await getTranslations("waitlist");
  const faq = await getTranslations("faq");

  const categories = [
    {
      name: "Eat",
      label: features("eatLabel"),
      description: features("eatDesc"),
      color: "bg-eat",
      lightBg: "bg-[#FFF1EA]",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 2l1 18c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2L16 2" />
          <path d="M3 2c0 1.1 2.5 2 5.5 2s5.5-.9 5.5-2" />
          <path d="M16 8h3a3 3 0 010 6h-2" />
        </svg>
      ),
    },
    {
      name: "Cafe",
      label: features("cafeLabel"),
      description: features("cafeDesc"),
      color: "bg-cafe",
      lightBg: "bg-[#F5EDE4]",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 8h1a4 4 0 010 8h-1" />
          <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" />
          <path d="M6 1v3" />
          <path d="M10 1v3" />
        </svg>
      ),
    },
    {
      name: "Drinks",
      label: features("drinksLabel"),
      description: features("drinksDesc"),
      color: "bg-drinks",
      lightBg: "bg-[#FFF7E2]",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D9A63A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22h8" />
          <path d="M12 11v11" />
          <path d="M20 3l-8 8-8-8h16z" />
        </svg>
      ),
    },
    {
      name: "Activity",
      label: features("activityLabel"),
      description: features("activityDesc"),
      color: "bg-activity",
      lightBg: "bg-[#EEF3FF]",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5C7CE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
    },
    {
      name: "Sightseeing",
      label: features("sightseeingLabel"),
      description: features("sightseeingDesc"),
      color: "bg-sightseeing",
      lightBg: "bg-[#EAFAF0]",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4CAF7A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      ),
    },
  ];

  const steps = [
    {
      step: "01",
      title: howItWorks("step1Title"),
      description: howItWorks("step1Desc"),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
          <line x1="8" y1="2" x2="8" y2="18" />
          <line x1="16" y1="6" x2="16" y2="22" />
        </svg>
      ),
    },
    {
      step: "02",
      title: howItWorks("step2Title"),
      description: howItWorks("step2Desc"),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      ),
    },
    {
      step: "03",
      title: howItWorks("step3Title"),
      description: howItWorks("step3Desc"),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      ),
    },
    {
      step: "04",
      title: howItWorks("step4Title"),
      description: howItWorks("step4Desc"),
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
  ];

  const problemCards = [
    {
      title: problem("card1Title"),
      description: problem("card1Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      title: problem("card2Title"),
      description: problem("card2Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
    },
    {
      title: problem("card3Title"),
      description: problem("card3Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
  ];

  const trustPoints = [
    {
      title: trust("point1Title"),
      description: trust("point1Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
      ),
    },
    {
      title: trust("point2Title"),
      description: trust("point2Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    },
    {
      title: trust("point3Title"),
      description: trust("point3Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      title: trust("point4Title"),
      description: trust("point4Desc"),
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
  ];

  const landingFaqs = [
    { question: faq("q1"), answer: faq("a1") },
    { question: faq("q2"), answer: faq("a2") },
    { question: faq("q3"), answer: faq("a3") },
    { question: faq("q4"), answer: faq("a4") },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-light/40 to-white" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-0 md:pt-36 md:pb-0 text-center">
          <ScrollReveal>
            <Image
              src="/icon.svg"
              alt="Roami"
              width={100}
              height={100}
              className="mx-auto mb-6"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <span className="inline-block bg-teal/10 text-teal-dark text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
              {hero("comingSoon")}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight mb-6">
              {hero("headlinePart1")}<br />
              <span className="text-teal">{hero("headlinePart2")}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              {hero("subheadline")}<br className="hidden md:block" />
              {hero("subheadline2")}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <a
              href="#waitlist"
              className="inline-block mt-10 bg-secondary hover:bg-secondary/90 text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-secondary/20"
            >
              {hero("cta")}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">{problem("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {problem("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {problemCards.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-bg-secondary rounded-2xl p-6 h-full border border-border-subtle">
                  <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center text-text-muted mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={300}>
            <div className="mt-14 text-center">
              <div className="inline-flex items-center gap-3 bg-teal-light/60 rounded-2xl px-6 py-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-sm font-medium text-teal-dark">
                  {problem("highlight")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="py-20 md:py-28 bg-secondary-light/60">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-3">{solution("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight max-w-2xl mx-auto">
                {solution("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[solution("point1"), solution("point2"), solution("point3"), solution("point4")].map((point, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-border-subtle">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E07A45" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-sm text-text-primary font-medium">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES / CATEGORIES ─── */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">{features("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-4">
                {features("title")}
              </h2>
              <p className="text-text-secondary max-w-lg mx-auto text-sm leading-relaxed">
                {features("subtitle")}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 100}>
                <div className={`${cat.lightBg} rounded-2xl p-6 h-full border border-transparent hover:border-border-default transition-colors`}>
                  <div className="mb-4">{cat.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
                      {cat.name}
                    </span>
                  </div>
                  <h3 className="font-bold text-text-primary mb-2">{cat.label}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{cat.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-14 bg-white rounded-2xl p-8 md:p-10 border border-border-subtle text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <h3 className="font-bold text-text-primary">{features("mapFirstTitle")}</h3>
              </div>
              <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                {features("mapFirstDesc")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-3">{howItWorks("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {howItWorks("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 100}>
                <div className="text-center">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${i % 2 === 0 ? 'bg-teal-light' : 'bg-secondary-light'}`}>
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-bold text-teal/60 uppercase tracking-widest">
                    Step {s.step}
                  </span>
                  <h3 className="font-bold text-text-primary mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY ROAMI ─── */}
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">{whyRoami("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {whyRoami("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[whyRoami("point1"), whyRoami("point2"), whyRoami("point3"), whyRoami("point4")].map((point, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex items-start gap-3 bg-white rounded-xl p-5 border border-border-subtle">
                  <div className="w-8 h-8 rounded-lg bg-teal-light flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-sm text-text-primary font-medium leading-relaxed pt-1">{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section className="py-20 md:py-28 bg-secondary-light/40">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-xs font-semibold text-secondary uppercase tracking-widest mb-3">{cases("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {cases("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {[
              { text: cases("case1"), emoji: "🍽️" },
              { text: cases("case2"), emoji: "☕" },
              { text: cases("case3"), emoji: "🍻" },
              { text: cases("case4"), emoji: "📸" },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="flex items-center gap-4 bg-bg-secondary rounded-xl p-5 border border-border-subtle">
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="text-sm text-text-primary font-medium">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP SCREENSHOTS (uncomment when ready) ───
      <section className="py-20 md:py-28 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">{preview("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {preview("title")}
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="aspect-[9/16] bg-bg-tertiary rounded-2xl flex items-center justify-center border border-border-subtle"
                >
                  <p className="text-sm text-text-muted font-medium text-center px-4 whitespace-pre-line">
                    {preview("placeholder")}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      ─── */}

      {/* ─── TRUST / SAFETY ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">{trust("label")}</p>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
                {trust("title")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 ${i % 2 === 0 ? 'bg-teal-light' : 'bg-secondary-light'}`}>
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2 text-sm">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAITLIST CTA ─── */}
      <section id="waitlist" className="py-20 md:py-28 bg-bg-secondary">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-secondary-light/60 to-teal-light/30 rounded-3xl p-8 md:p-14">
              <div className="text-center mb-10">
                <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-4">
                  {waitlist("label")}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-3">
                  {waitlist("title")}
                </h2>
                <p className="text-sm text-text-secondary max-w-md mx-auto leading-relaxed">
                  {waitlist("description")}
                </p>
              </div>

              <WaitlistForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight mb-3">
                {faq("title")}
              </h2>
              <p className="text-sm text-text-secondary">{faq("subtitle")}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <FAQAccordion faqs={landingFaqs} />
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="mt-10 text-center">
              <Link
                href={`/${locale}/faq`}
                className="inline-block text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
              >
                {faq("viewAll")} &rarr;
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
