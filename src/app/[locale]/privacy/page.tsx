import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ko" ? "개인정보처리방침 — Roami" : "Privacy Policy — Roami",
    description:
      locale === "ko"
        ? "Roami 앱의 개인정보처리방침입니다."
        : "Privacy Policy for the Roami app.",
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <PrivacyKo /> : <PrivacyEn />}
    </div>
  );
}

function PrivacyKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">개인정보처리방침</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2025년 3월</p>

      <div className="prose-custom space-y-10">
        <Section title="1. 개요">
          <p>
            Roami(이하 &ldquo;서비스&rdquo;)는 개인 개발자가 운영하는 모바일 앱 및 웹 서비스로,
            여행 중 동행을 찾을 수 있는 지도 기반 매칭 서비스(Roami)와
            AI 기반 여행 일정 플래너(Roami Plan)를 제공합니다.
            본 개인정보처리방침은 서비스 이용 과정에서 수집되는 개인정보의 처리에 관한 사항을 안내합니다.
          </p>
        </Section>

        <Section title="2. 수집하는 개인정보">
          <p>서비스는 다음과 같은 개인정보를 수집합니다:</p>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">필수 수집 항목</h4>
          <ul>
            <li>이메일 주소 (회원가입 및 로그인)</li>
            <li>닉네임 (프로필 표시)</li>
            <li>위치 정보 (지도 기반 서비스 제공)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">선택 수집 항목</h4>
          <ul>
            <li>프로필 사진</li>
            <li>자기소개</li>
            <li>관심 여행 도시</li>
            <li>여행 일정 데이터 (Roami Plan 이용 시)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">자동 수집 항목</h4>
          <ul>
            <li>기기 정보 (OS 버전, 기기 모델)</li>
            <li>앱 사용 로그 (접속 시간, 기능 사용 기록)</li>
            <li>위치 데이터 (서비스 이용 시 동의한 경우)</li>
          </ul>
        </Section>

        <Section title="3. 개인정보의 이용 목적">
          <p>수집된 개인정보는 다음 목적으로 이용됩니다:</p>
          <ul>
            <li>회원 관리 및 본인 확인</li>
            <li>동행 매칭 서비스 제공 (지도 기반 모임 표시 및 참여)</li>
            <li>AI 기반 여행 일정 생성 및 관리 (Roami Plan)</li>
            <li>서비스 개선 및 신규 기능 개발</li>
            <li>서비스 관련 공지사항 및 알림 전달</li>
            <li>부정 이용 방지 및 서비스 안전 관리</li>
          </ul>
        </Section>

        <Section title="4. 개인정보의 제3자 제공">
          <p>
            서비스는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            다만, 다음의 경우에는 예외로 합니다:
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의해 요구되는 경우</li>
            <li>서비스 제공을 위해 필요한 최소한의 정보를 동행 참가자 간에 공유하는 경우 (닉네임, 프로필 사진 등)</li>
          </ul>
        </Section>

        <Section title="5. 개인정보의 보관 및 파기">
          <p>
            개인정보는 서비스 이용 기간 동안 보관되며, 회원 탈퇴 시 즉시 파기됩니다.
            다만, 관련 법령에 따라 보존할 필요가 있는 경우 해당 기간 동안 보관됩니다:
          </p>
          <ul>
            <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            <li>접속 로그: 3개월</li>
          </ul>
        </Section>

        <Section title="6. 개인정보의 안전성 확보 조치">
          <p>서비스는 개인정보의 안전성 확보를 위해 다음 조치를 시행합니다:</p>
          <ul>
            <li>개인정보의 암호화 (전송 시 TLS/SSL, 저장 시 암호화)</li>
            <li>접근 권한 관리</li>
            <li>정기적인 보안 점검</li>
          </ul>
        </Section>

        <Section title="7. 이용자의 권리">
          <p>이용자는 다음과 같은 권리를 행사할 수 있습니다:</p>
          <ul>
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정 및 삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
            <li>회원 탈퇴 (앱 내 설정에서 직접 가능)</li>
          </ul>
          <p>
            위 권리 행사는 앱 내 설정 또는 이메일(hello@roami.kr)을 통해 요청할 수 있습니다.
          </p>
        </Section>

        <Section title="8. 위치 정보">
          <p>
            서비스는 지도 기반 동행 매칭을 위해 위치 정보를 수집합니다.
            위치 정보는 이용자의 동의 하에 수집되며, 앱 설정 또는 기기 설정에서 언제든지 비활성화할 수 있습니다.
            수집된 위치 정보는 동행 검색 및 모임 장소 표시 목적으로만 사용됩니다.
          </p>
        </Section>

        <Section title="9. 쿠키 및 추적 기술">
          <p>
            모바일 앱에서는 쿠키를 사용하지 않습니다. 웹사이트의 경우, 필수적인 기능을 위해
            최소한의 쿠키를 사용할 수 있습니다.
          </p>
        </Section>

        <Section title="10. 개인정보 보호책임자">
          <p>
            개인정보 처리에 관한 문의사항은 아래로 연락해 주시기 바랍니다.
          </p>
          <ul>
            <li>이메일: hello@roami.kr</li>
          </ul>
        </Section>

        <Section title="11. 방침 변경">
          <p>
            본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            변경 시 앱 내 공지 또는 이메일을 통해 안내합니다.
          </p>
        </Section>
      </div>
    </>
  );
}

function PrivacyEn() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Privacy Policy</h1>
      <p className="text-sm text-text-muted mb-10">Last updated: March 2025</p>

      <div className="prose-custom space-y-10">
        <Section title="1. Overview">
          <p>
            Roami (the &ldquo;Service&rdquo;) is a mobile app and web service operated by an independent developer.
            It provides a map-based companion matching service for travelers (Roami) and
            an AI-powered trip planner (Roami Plan).
            This Privacy Policy explains how we collect, use, and protect your personal information.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>We collect the following personal information:</p>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Required</h4>
          <ul>
            <li>Email address (for registration and login)</li>
            <li>Nickname (displayed on your profile)</li>
            <li>Location data (for map-based services)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Optional</h4>
          <ul>
            <li>Profile photo</li>
            <li>Bio / self-introduction</li>
            <li>Cities of interest</li>
            <li>Trip itinerary data (when using Roami Plan)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Automatically Collected</h4>
          <ul>
            <li>Device information (OS version, device model)</li>
            <li>App usage logs (access times, feature usage)</li>
            <li>Location data (when you have granted permission)</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>Account management and identity verification</li>
            <li>Providing the companion matching service (displaying and joining meetups on the map)</li>
            <li>AI-powered trip planning and management (Roami Plan)</li>
            <li>Service improvement and new feature development</li>
            <li>Sending service-related notices and notifications</li>
            <li>Preventing misuse and maintaining service safety</li>
          </ul>
        </Section>

        <Section title="4. Sharing with Third Parties">
          <p>
            We do not share your personal information with third parties, except in the following cases:
          </p>
          <ul>
            <li>When you have given prior consent</li>
            <li>When required by law</li>
            <li>When minimal information (nickname, profile photo, etc.) is shared between meetup participants to provide the service</li>
          </ul>
        </Section>

        <Section title="5. Data Retention and Deletion">
          <p>
            Personal information is retained while you use the service and is deleted immediately upon account deletion.
            However, certain records may be retained as required by applicable law:
          </p>
          <ul>
            <li>Records related to contracts or withdrawal: 5 years</li>
            <li>Records related to consumer complaints or disputes: 3 years</li>
            <li>Access logs: 3 months</li>
          </ul>
        </Section>

        <Section title="6. Security Measures">
          <p>We implement the following measures to protect your personal information:</p>
          <ul>
            <li>Encryption of personal data (TLS/SSL in transit, encryption at rest)</li>
            <li>Access control management</li>
            <li>Regular security audits</li>
          </ul>
        </Section>

        <Section title="7. Your Rights">
          <p>You have the right to:</p>
          <ul>
            <li>Request access to your personal information</li>
            <li>Request correction or deletion of your personal information</li>
            <li>Request suspension of personal data processing</li>
            <li>Delete your account (available in app settings)</li>
          </ul>
          <p>
            You can exercise these rights through the app settings or by contacting us at hello@roami.kr.
          </p>
        </Section>

        <Section title="8. Location Information">
          <p>
            We collect location information for the map-based companion matching service.
            Location data is collected with your consent and can be disabled at any time in the app or device settings.
            Collected location data is used only for finding companions and displaying meetup locations.
          </p>
        </Section>

        <Section title="9. Cookies and Tracking">
          <p>
            The mobile app does not use cookies. The website may use minimal cookies for essential functionality.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            For questions about how we handle personal information, please contact us:
          </p>
          <ul>
            <li>Email: hello@roami.kr</li>
          </ul>
        </Section>

        <Section title="11. Policy Changes">
          <p>
            This Privacy Policy may be updated due to changes in law or service.
            We will notify you of any changes through in-app notices or email.
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
