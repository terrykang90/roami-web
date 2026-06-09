import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ko" ? "커뮤니티·안전 수칙 — roami" : "Community & Safety Guidelines — roami",
    description:
      locale === "ko"
        ? "roami를 안전하게 이용하기 위한 커뮤니티·안전 수칙입니다."
        : "Community and safety guidelines for using roami safely.",
  };
}

export default async function SafetyPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <SafetyKo /> : <SafetyEn />}
    </div>
  );
}

function SafetyKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">커뮤니티·안전 수칙</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2026년 6월</p>

      <div className="space-y-10">
        <p className="text-sm text-text-secondary leading-relaxed">
          roami는 여행자와 현지인이 오프라인에서 만나는 서비스입니다. 모든 만남은 이용자 간 자발적 만남이며,
          안전은 무엇보다 중요합니다. 아래 수칙을 꼭 지켜주세요.
        </p>

        <Section title="1. 만나기 전">
          <ul>
            <li>첫 만남은 사람이 많은 공공장소에서 가지세요.</li>
            <li>약속 전 앱 내 채팅으로 충분히 대화해 상대를 파악하세요.</li>
            <li>가족이나 친구에게 누구와 언제 어디서 만나는지 미리 알리세요.</li>
            <li>프로필이나 대화에서 위화감이 들면 만나지 마세요.</li>
          </ul>
        </Section>

        <Section title="2. 만나는 동안">
          <ul>
            <li>스스로 이동수단을 준비해 언제든 자리를 뜰 수 있게 하세요.</li>
            <li>음료와 소지품을 주의하고, 음주 모임에서는 과음을 삼가세요.</li>
            <li>불편하거나 위험하다고 느끼면 즉시 자리를 떠나도 괜찮습니다. 본능을 믿으세요.</li>
            <li>여행지에서는 현지 긴급 연락처를 미리 알아두세요.</li>
          </ul>
        </Section>

        <Section title="3. 개인정보와 금전">
          <ul>
            <li>집 주소, 금융정보, 신분증 등 민감한 정보를 공유하지 마세요.</li>
            <li>금전 요구·송금·투자 권유는 사기 신호입니다. 거절하고 신고하세요.</li>
            <li>외부 메신저나 사이트로 유도하는 경우 주의하세요.</li>
          </ul>
        </Section>

        <Section title="4. 존중과 신고">
          <ul>
            <li>욕설·차별·성희롱·괴롭힘은 금지되며, 적발 시 이용이 제한됩니다.</li>
            <li>불쾌하거나 위험한 이용자는 앱 내 신고·차단 기능을 이용하세요.</li>
            <li>범죄나 즉각적인 위험 상황은 현지 경찰(긴급번호)에 먼저 신고하세요.</li>
          </ul>
        </Section>

        <Section title="5. 호스트를 위한 안내">
          <ul>
            <li>모임 정보를 정확히 작성하고 안전한 장소를 선택하세요.</li>
            <li>참가 요청을 검토한 뒤 승인하세요.</li>
            <li>약속이 변경되면 참가자에게 미리 알리세요.</li>
          </ul>
        </Section>

        <Section title="6. 미성년자 보호">
          <p>만 14세 미만은 서비스를 이용할 수 없으며, 미성년자를 대상으로 한 일체의 부적절한 행위는 엄격히 금지됩니다.</p>
        </Section>

        <Section title="신고 및 문의">
          <p>
            본 수칙 위반은 이용약관에 따라 이용이 제한될 수 있습니다.
            신고는 앱 내 신고 기능 또는 hello@roami.kr로, 긴급 상황은 현지 경찰에 연락하세요.
          </p>
        </Section>
      </div>
    </>
  );
}

function SafetyEn() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Community &amp; Safety Guidelines</h1>
      <p className="text-sm text-text-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-10">
        <p className="text-sm text-text-secondary leading-relaxed">
          roami connects travelers and locals who meet in person. Every meetup is a voluntary gathering between users,
          and safety comes first. Please follow these guidelines.
        </p>

        <Section title="1. Before you meet">
          <ul>
            <li>Meet in a busy public place, especially the first time.</li>
            <li>Chat in the app beforehand to get a sense of the other person.</li>
            <li>Tell a friend or family member who, when, and where you&apos;re meeting.</li>
            <li>If a profile or conversation feels off, don&apos;t meet.</li>
          </ul>
        </Section>

        <Section title="2. During the meetup">
          <ul>
            <li>Arrange your own transport so you can leave anytime.</li>
            <li>Watch your drink and belongings; don&apos;t over-drink at drinks meetups.</li>
            <li>If you feel uncomfortable or unsafe, leave immediately. Trust your instincts.</li>
            <li>When traveling, know the local emergency numbers in advance.</li>
          </ul>
        </Section>

        <Section title="3. Personal info &amp; money">
          <ul>
            <li>Don&apos;t share sensitive info like your home address, financial details, or ID.</li>
            <li>Requests for money, transfers, or investments are scam signals. Decline and report.</li>
            <li>Be cautious if someone pushes you to an outside messenger or site.</li>
          </ul>
        </Section>

        <Section title="4. Respect &amp; reporting">
          <ul>
            <li>Profanity, discrimination, harassment, and sexual misconduct are prohibited and lead to restrictions.</li>
            <li>Use the in-app report and block tools for anyone uncomfortable or dangerous.</li>
            <li>For crimes or immediate danger, contact local police (emergency number) first.</li>
          </ul>
        </Section>

        <Section title="5. For hosts">
          <ul>
            <li>Describe your meetup accurately and choose a safe location.</li>
            <li>Review join requests before approving.</li>
            <li>Notify participants in advance if plans change.</li>
          </ul>
        </Section>

        <Section title="6. Protecting minors">
          <p>Users under 14 may not use the Service, and any inappropriate behavior toward minors is strictly prohibited.</p>
        </Section>

        <Section title="Reporting &amp; contact">
          <p>
            Violations may lead to restrictions under the Terms of Service.
            Report via the in-app tools or hello@roami.kr; for emergencies, contact local police.
          </p>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-text-primary mb-3">{title}</h2>
      <div className="text-sm text-text-secondary leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-text-secondary">
        {children}
      </div>
    </section>
  );
}
