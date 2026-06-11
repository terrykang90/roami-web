import { getLocale } from "next-intl/server";
import { TESTFLIGHT_URL } from "@/lib/config";
import { localeAlternates } from "@/lib/seo";

const GROUP_URL = "https://groups.google.com/g/roami-beta";
const OPT_IN_URL = "https://play.google.com/apps/testing/kr.roami.app";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    alternates: localeAlternates(locale, "/android"),
    title:
      locale === "ko"
        ? "Android 베타 참여 — roami"
        : locale === "th"
          ? "ร่วมเบต้า Android — roami"
          : "Join the Android beta — roami",
    description:
      locale === "ko"
        ? "roami Android 베타에 참여하는 방법 — 3단계면 끝나요."
        : locale === "th"
          ? "วิธีเข้าร่วมเบต้า roami บน Android — แค่ 3 ขั้นตอน"
          : "How to join the roami Android beta — three quick steps.",
  };
}

export default async function AndroidBetaPage() {
  const locale = await getLocale();
  const t = locale === "ko" ? KO : locale === "th" ? TH : EN;

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{t.title}</h1>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.intro}</p>

      <div className="bg-teal-light/30 border border-teal/20 rounded-2xl px-5 py-4 mb-10">
        <p className="text-sm text-text-primary font-medium leading-relaxed">⚠️ {t.accountWarning}</p>
      </div>

      <div className="space-y-8">
        <Step n={1} title={t.step1Title} desc={t.step1Desc} cta={t.step1Cta} href={GROUP_URL} />
        <Step n={2} title={t.step2Title} desc={t.step2Desc} cta={t.step2Cta} href={OPT_IN_URL} />
        <Step n={3} title={t.step3Title} desc={t.step3Desc} />
      </div>

      <div className="mt-12 space-y-3 text-sm text-text-secondary leading-relaxed">
        <p>💡 {t.delayNote}</p>
        <p>🙏 {t.keepNote}</p>
        <p>
          🍎 {t.iosNote}{" "}
          <a href={TESTFLIGHT_URL} className="text-teal font-semibold hover:text-teal-dark transition-colors" target="_blank" rel="noopener noreferrer">
            TestFlight
          </a>
        </p>
        <p>
          ✉️ {t.contactNote}{" "}
          <a href="mailto:hello@roami.kr" className="text-teal font-semibold hover:text-teal-dark transition-colors">
            hello@roami.kr
          </a>
        </p>
      </div>
    </div>
  );
}

function Step({ n, title, desc, cta, href }: { n: number; title: string; desc: string; cta?: string; href?: string }) {
  return (
    <div className="flex gap-4">
      <div className="flex-none w-9 h-9 rounded-full bg-teal text-white font-bold text-sm flex items-center justify-center mt-0.5">
        {n}
      </div>
      <div className="flex-1">
        <h2 className="text-base font-bold text-text-primary mb-1">{title}</h2>
        <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
        {cta && href && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 bg-teal hover:bg-teal-dark text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            {cta}
          </a>
        )}
      </div>
    </div>
  );
}

const KO = {
  title: "roami Android 베타 참여",
  intro: "치앙마이에서 베타 운영 중인 roami를 Android에서 써보세요. 3단계면 끝나요.",
  accountWarning: "휴대폰 Play 스토어에서 사용하는 구글 계정으로 로그인한 상태에서 진행해주세요. 다른 계정으로 가입하면 설치가 안 돼요.",
  step1Title: "베타 그룹 가입",
  step1Desc: "아래 버튼을 누르고 “그룹 가입(Join group)”을 클릭하세요. 가입하면 자동으로 테스터 자격이 생겨요.",
  step1Cta: "베타 그룹 가입하기",
  step2Title: "테스터 수락",
  step2Desc: "이어서 아래 버튼을 열고 “테스터 되기(Become a tester)”를 수락하세요.",
  step2Cta: "테스터 수락하기",
  step3Title: "Play 스토어에서 설치",
  step3Desc: "수락 페이지에 나오는 “Google Play에서 다운로드” 링크로 설치하면 끝!",
  delayNote: "그룹 가입 직후엔 테스터 링크 반영까지 몇 분 걸릴 수 있어요. 안 되면 잠시 후 다시 시도해주세요.",
  keepNote: "베타 기간 동안 앱을 지우지 말고 가끔 열어봐 주시면 큰 힘이 돼요.",
  iosNote: "iPhone을 쓰신다면:",
  contactNote: "막히면 편하게 연락주세요:",
};

const EN = {
  title: "Join the roami Android beta",
  intro: "Try roami on Android — currently in beta in Chiang Mai. Three quick steps.",
  accountWarning: "Make sure you're signed in with the same Google account your phone's Play Store uses. Joining with a different account will block the install.",
  step1Title: "Join the beta group",
  step1Desc: "Tap the button below and click “Join group”. Joining automatically makes you a tester.",
  step1Cta: "Join the beta group",
  step2Title: "Accept testing",
  step2Desc: "Then open the button below and accept “Become a tester”.",
  step2Cta: "Become a tester",
  step3Title: "Install from the Play Store",
  step3Desc: "Use the “Download it on Google Play” link on the accept page — done!",
  delayNote: "Right after joining the group, it can take a few minutes for the tester link to activate. If it doesn't work, try again shortly.",
  keepNote: "Please keep the app installed during the beta and open it now and then — it really helps.",
  iosNote: "On iPhone?",
  contactNote: "Stuck? Reach out anytime:",
};

const TH = {
  title: "ร่วมเบต้า roami บน Android",
  intro: "ลองใช้ roami บน Android — กำลังเปิดเบต้าที่เชียงใหม่ แค่ 3 ขั้นตอน",
  accountWarning: "โปรดล็อกอินด้วยบัญชี Google เดียวกับที่ใช้ใน Play Store บนมือถือของคุณ หากใช้บัญชีอื่นจะติดตั้งไม่ได้",
  step1Title: "เข้าร่วมกลุ่มเบต้า",
  step1Desc: "แตะปุ่มด้านล่างแล้วคลิก “Join group” การเข้าร่วมจะทำให้คุณเป็นผู้ทดสอบโดยอัตโนมัติ",
  step1Cta: "เข้าร่วมกลุ่มเบต้า",
  step2Title: "ยอมรับการเป็นผู้ทดสอบ",
  step2Desc: "จากนั้นเปิดปุ่มด้านล่างและยอมรับ “Become a tester”",
  step2Cta: "เป็นผู้ทดสอบ",
  step3Title: "ติดตั้งจาก Play Store",
  step3Desc: "ใช้ลิงก์ “Download it on Google Play” ในหน้ายอมรับ — เสร็จแล้ว!",
  delayNote: "หลังเข้าร่วมกลุ่ม อาจใช้เวลาสักครู่ก่อนลิงก์ผู้ทดสอบจะใช้งานได้ หากไม่สำเร็จให้ลองใหม่ภายหลัง",
  keepNote: "โปรดอย่าลบแอประหว่างช่วงเบต้า และเปิดใช้เป็นครั้งคราว — ช่วยเราได้มาก",
  iosNote: "ใช้ iPhone?",
  contactNote: "ติดปัญหา? ติดต่อได้ที่:",
};
