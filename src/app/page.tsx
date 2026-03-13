import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import WaitlistForm from "@/components/WaitlistForm";

const categories = [
  {
    name: "Eat",
    label: "같이 먹기",
    description: "현지 맛집에서 함께 식사할 동행을 찾아보세요. 혼밥보다 즐거운 여행 식사.",
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
    label: "카페 가기",
    description: "분위기 좋은 카페에서 대화 나눌 사람을 만나보세요. 작업하거나, 여행 이야기하거나.",
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
    label: "한잔 하기",
    description: "여행지의 밤, 혼자보다 함께. 가볍게 한잔 하며 여행 이야기를 나눠보세요.",
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
    label: "액티비티",
    description: "투어, 하이킹, 다이빙 등 함께 하면 더 즐거운 활동. 동행을 바로 구해보세요.",
    color: "bg-activity",
    lightBg: "bg-[#EEF3FF]",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#5C7CE6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
];

const steps = [
  {
    step: "01",
    title: "지도 열기",
    description: "여행 중인 도시의 지도를 열어보세요.",
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
    title: "동행 찾기",
    description: "내 근처 동행 모집을 확인하세요.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "참가 요청",
    description: "마음에 드는 모임에 참가를 요청하세요.",
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
    title: "만남",
    description: "호스트의 승인 후, 함께 만나세요!",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-light/40 to-white" />
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-0 md:pt-36 md:pb-0 text-center">
          <ScrollReveal>
            <Image
              src="/logo.svg"
              alt="Roami"
              width={400}
              height={400}
              className="mx-auto mb-6"
            />
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <span className="inline-block bg-teal/10 text-teal-dark text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-6">
              Coming Soon
            </span>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              여행 동행,<br />
              <span className="text-teal">지도에서 바로 찾기</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <p className="text-base md:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              여행지에서 함께 밥 먹을 사람, 카페 갈 사람, 한잔 할 사람을<br className="hidden md:block" />
              지도 위에서 바로 찾아보세요.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <a
              href="#waitlist"
              className="inline-block mt-10 bg-teal hover:bg-teal-dark text-white font-semibold text-sm px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-teal/20"
            >
              사전 등록하기
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROBLEM ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">Problem</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                여행 동행, 아직도 이렇게 찾고 있나요?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "오픈채팅방",
                description: "수십 개의 채팅방을 뒤져야 하고, 어디서 누구를 만날지 알 수 없어요.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                ),
              },
              {
                title: "커뮤니티 게시판",
                description: "글을 올려도 답이 없거나, 시간과 장소가 안 맞는 경우가 대부분이에요.",
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
                title: "숙소 라운지",
                description: "마침 같은 숙소에 있는 사람과 일정이 맞길 바라는 건 운에 맡기는 거예요.",
                icon: (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ),
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="bg-gray-50 rounded-2xl p-6 h-full border border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
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
                  Roami는 <strong>지도 위</strong>에서 바로 주변 동행을 찾아 연결해줍니다.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── FEATURES / CATEGORIES ─── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-4">
                지도 위에서 만나는 네 가지 동행
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
                먹고, 마시고, 즐기고. 여행지에서 하고 싶은 것에 맞춰 동행을 찾아보세요.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 100}>
                <div className={`${cat.lightBg} rounded-2xl p-6 h-full border border-transparent hover:border-gray-200 transition-colors`}>
                  <div className="mb-4">{cat.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {cat.name}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{cat.label}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{cat.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={400}>
            <div className="mt-14 bg-white rounded-2xl p-8 md:p-10 border border-gray-100 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2CB5AE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <h3 className="font-bold text-gray-900">Map-First</h3>
              </div>
              <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                리스트를 스크롤하는 대신, 지도에서 바로 내 주변 동행을 확인하세요.
                어디서, 언제, 어떤 모임이 있는지 한눈에 볼 수 있습니다.
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
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                이렇게 쉽게 동행을 찾아요
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <ScrollReveal key={s.step} delay={i * 100}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-teal-light flex items-center justify-center mx-auto mb-4">
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-bold text-teal/60 uppercase tracking-widest">
                    Step {s.step}
                  </span>
                  <h3 className="font-bold text-gray-900 mt-1 mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP SCREENSHOTS ─── */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-xs font-semibold text-teal uppercase tracking-widest mb-3">Preview</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                앱 미리보기
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="aspect-[9/16] bg-gray-200 rounded-2xl flex items-center justify-center border border-gray-100"
                >
                  <p className="text-sm text-gray-400 font-medium text-center px-4">
                    앱 스크린샷<br />준비 중
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── WAITLIST CTA ─── */}
      <section id="waitlist" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-gradient-to-br from-teal-light/50 to-teal-light/20 rounded-3xl p-8 md:p-14">
              <div className="text-center mb-10">
                <span className="inline-block bg-teal/10 text-teal-dark text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-4">
                  Waitlist
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-3">
                  출시 소식을 가장 먼저 받아보세요
                </h2>
                <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
                  이메일을 등록하시면, Roami가 출시될 때 가장 먼저 알려드립니다.
                  관심 도시를 알려주시면 우선 지원 지역에 반영할게요.
                </p>
              </div>

              <WaitlistForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
