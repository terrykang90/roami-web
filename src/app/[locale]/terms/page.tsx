import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    title: locale === "ko" ? "이용약관 — Roami" : "Terms of Service — Roami",
    description:
      locale === "ko"
        ? "Roami 앱의 이용약관입니다."
        : "Terms of Service for the Roami app.",
  };
}

export default async function TermsPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <TermsKo /> : <TermsEn />}
    </div>
  );
}

function TermsKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">이용약관</h1>
      <p className="text-sm text-gray-400 mb-10">최종 업데이트: 2025년 3월</p>

      <div className="space-y-10">
        <Section title="제1조 (목적)">
          <p>
            본 약관은 개인 개발자가 운영하는 Roami(이하 &ldquo;서비스&rdquo;)의 이용에 관한
            기본적인 사항을 규정함을 목적으로 합니다. 서비스는 여행 중 동행을 찾을 수 있는
            지도 기반 매칭 모바일 앱(Roami)과 AI 기반 여행 일정 플래너 웹 서비스(Roami Plan)를 포함합니다.
          </p>
        </Section>

        <Section title="제2조 (서비스 내용)">
          <p>서비스는 다음과 같은 기능을 제공합니다:</p>
          <ul>
            <li>지도 기반 여행 동행 모집 및 참여</li>
            <li>카테고리별 동행 검색 (같이 먹기, 카페, 한잔, 액티비티)</li>
            <li>동행 참가 요청 및 승인 시스템</li>
            <li>동행 관련 채팅</li>
            <li>사용자 프로필 관리</li>
            <li>AI 기반 여행 일정 생성 및 관리 (Roami Plan)</li>
            <li>여행 일정 공유</li>
          </ul>
        </Section>

        <Section title="제3조 (회원가입 및 계정)">
          <ol>
            <li>서비스를 이용하려면 회원가입이 필요합니다.</li>
            <li>회원가입 시 정확한 정보를 제공해야 하며, 허위 정보 입력 시 서비스 이용이 제한될 수 있습니다.</li>
            <li>계정은 본인만 이용할 수 있으며, 타인에게 양도하거나 대여할 수 없습니다.</li>
            <li>계정 보안은 이용자 본인의 책임이며, 비정상적인 접근이 확인될 경우 즉시 서비스에 알려야 합니다.</li>
          </ol>
        </Section>

        <Section title="제4조 (이용자의 의무)">
          <p>이용자는 서비스 이용 시 다음 사항을 준수해야 합니다:</p>
          <ol>
            <li>타인의 권리를 존중하고, 예의 바른 태도로 서비스를 이용합니다.</li>
            <li>정확한 프로필 정보를 유지합니다.</li>
            <li>동행 모임에 참가할 경우, 약속된 시간과 장소를 성실히 지킵니다.</li>
            <li>서비스를 통해 얻은 타인의 개인정보를 무단으로 수집하거나 이용하지 않습니다.</li>
          </ol>
        </Section>

        <Section title="제5조 (금지 행위)">
          <p>다음 행위는 금지되며, 위반 시 서비스 이용이 제한되거나 계정이 정지될 수 있습니다:</p>
          <ul>
            <li>허위 정보를 등록하거나 타인을 사칭하는 행위</li>
            <li>상업적 목적의 홍보, 광고, 스팸 행위</li>
            <li>욕설, 비하, 차별, 성희롱 등 타인에게 불쾌감을 주는 행위</li>
            <li>사기, 금전 요구, 불법 활동</li>
            <li>서비스의 정상적인 운영을 방해하는 행위</li>
            <li>타인의 개인정보를 동의 없이 수집, 저장, 공개하는 행위</li>
            <li>동행 모임을 이용한 범죄 행위</li>
            <li>서비스의 기술적 보안을 우회하거나 해킹을 시도하는 행위</li>
          </ul>
        </Section>

        <Section title="제6조 (동행 모임 관련)">
          <ol>
            <li>동행 모임은 이용자 간의 자발적인 만남이며, 서비스는 모임의 중개 역할만 합니다.</li>
            <li>호스트는 참가 요청을 승인 또는 거절할 수 있습니다.</li>
            <li>모임 참가 후 발생하는 일체의 상황에 대한 책임은 참가자 본인에게 있습니다.</li>
            <li>안전을 위해 공공장소에서의 만남을 권장합니다.</li>
          </ol>
        </Section>

        <Section title="제7조 (서비스 이용 제한 및 계정 정지)">
          <ol>
            <li>서비스는 본 약관을 위반한 이용자에 대해 경고, 일시 정지, 영구 정지 등의 조치를 취할 수 있습니다.</li>
            <li>이용 제한 조치 시, 이메일을 통해 사유를 안내합니다.</li>
            <li>이용자는 이의가 있을 경우 hello@roami.kr으로 문의할 수 있습니다.</li>
          </ol>
        </Section>

        <Section title="제8조 (면책 조항)">
          <ol>
            <li>서비스는 이용자 간의 만남을 중개할 뿐, 모임에서 발생하는 사고, 분쟁, 피해에 대해 직접적인 책임을 지지 않습니다.</li>
            <li>서비스는 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.</li>
            <li>이용자가 제공한 정보의 정확성에 대한 책임은 이용자 본인에게 있습니다.</li>
            <li>서비스는 이용자 간 교환되는 정보의 신뢰성, 정확성에 대해 보증하지 않습니다.</li>
          </ol>
        </Section>

        <Section title="제9조 (서비스 변경 및 중단)">
          <ol>
            <li>서비스는 운영상, 기술상의 필요에 따라 서비스 내용을 변경할 수 있습니다.</li>
            <li>서비스 변경 시, 사전에 앱 내 공지 또는 이메일을 통해 안내합니다.</li>
            <li>개인 개발자가 운영하는 서비스의 특성상, 서비스가 종료될 수 있으며, 이 경우 최소 30일 전에 안내합니다.</li>
          </ol>
        </Section>

        <Section title="제10조 (회원 탈퇴)">
          <ol>
            <li>이용자는 언제든지 앱 내 설정에서 회원 탈퇴를 할 수 있습니다.</li>
            <li>탈퇴 시, 개인정보는 즉시 파기되며, 작성한 동행 모집 글 등의 콘텐츠는 삭제됩니다.</li>
            <li>탈퇴 후 동일한 정보로 재가입이 가능합니다.</li>
          </ol>
        </Section>

        <Section title="제11조 (지적 재산권)">
          <p>
            서비스에 포함된 디자인, 로고, 텍스트, 코드 등 모든 지적 재산권은 서비스 운영자에게 귀속됩니다.
            이용자는 서비스를 통해 제공되는 콘텐츠를 무단으로 복제, 배포, 수정할 수 없습니다.
          </p>
        </Section>

        <Section title="제12조 (약관의 변경)">
          <ol>
            <li>본 약관은 필요에 따라 변경될 수 있습니다.</li>
            <li>약관 변경 시, 시행일 7일 전에 앱 내 공지 또는 이메일을 통해 안내합니다.</li>
            <li>변경된 약관에 동의하지 않는 경우, 이용자는 회원 탈퇴를 할 수 있습니다.</li>
          </ol>
        </Section>

        <Section title="제13조 (분쟁 해결)">
          <ol>
            <li>서비스 이용과 관련한 분쟁은 대한민국 법률을 적용합니다.</li>
            <li>분쟁 발생 시, 서비스와 이용자 간의 원만한 해결을 위해 노력합니다.</li>
            <li>문의사항은 hello@roami.kr으로 연락해 주시기 바랍니다.</li>
          </ol>
        </Section>
      </div>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-10">Last updated: March 2025</p>

      <div className="space-y-10">
        <Section title="Article 1 (Purpose)">
          <p>
            These Terms govern the use of Roami (the &ldquo;Service&rdquo;), operated by an independent developer.
            The Service includes a map-based travel companion matching mobile app (Roami) and
            an AI-powered trip planner web service (Roami Plan).
          </p>
        </Section>

        <Section title="Article 2 (Service Description)">
          <p>The Service provides the following features:</p>
          <ul>
            <li>Map-based travel companion recruitment and participation</li>
            <li>Category-based companion search (eat, cafe, drinks, activities)</li>
            <li>Join request and approval system</li>
            <li>Meetup-related chat</li>
            <li>User profile management</li>
            <li>AI-powered trip planning and management (Roami Plan)</li>
            <li>Trip itinerary sharing</li>
          </ul>
        </Section>

        <Section title="Article 3 (Registration and Accounts)">
          <ol>
            <li>Registration is required to use the Service.</li>
            <li>You must provide accurate information during registration. Providing false information may result in restricted access.</li>
            <li>Your account is for your personal use only and may not be transferred or lent to others.</li>
            <li>You are responsible for your account security and must notify us immediately if you detect unauthorized access.</li>
          </ol>
        </Section>

        <Section title="Article 4 (User Obligations)">
          <p>When using the Service, you must:</p>
          <ol>
            <li>Respect the rights of others and use the Service in a courteous manner.</li>
            <li>Maintain accurate profile information.</li>
            <li>Honor the agreed time and place when participating in meetups.</li>
            <li>Not collect or misuse personal information of other users obtained through the Service.</li>
          </ol>
        </Section>

        <Section title="Article 5 (Prohibited Activities)">
          <p>The following activities are prohibited and may result in restricted access or account suspension:</p>
          <ul>
            <li>Registering false information or impersonating others</li>
            <li>Commercial promotion, advertising, or spam</li>
            <li>Profanity, disparagement, discrimination, sexual harassment, or other offensive behavior</li>
            <li>Fraud, soliciting money, or illegal activities</li>
            <li>Interfering with the normal operation of the Service</li>
            <li>Collecting, storing, or disclosing personal information of others without consent</li>
            <li>Criminal activities through meetups</li>
            <li>Attempting to bypass security measures or hack the Service</li>
          </ul>
        </Section>

        <Section title="Article 6 (Meetups)">
          <ol>
            <li>Meetups are voluntary gatherings between users, and the Service acts only as an intermediary.</li>
            <li>Hosts may approve or reject join requests.</li>
            <li>Participants are responsible for any situations that arise during or after a meetup.</li>
            <li>We recommend meeting in public places for safety.</li>
          </ol>
        </Section>

        <Section title="Article 7 (Service Restrictions and Account Suspension)">
          <ol>
            <li>The Service may issue warnings, temporary suspensions, or permanent bans for violations of these Terms.</li>
            <li>We will notify you of the reason for any restriction via email.</li>
            <li>If you have an objection, you may contact us at hello@roami.kr.</li>
          </ol>
        </Section>

        <Section title="Article 8 (Disclaimer)">
          <ol>
            <li>The Service only facilitates meetups between users and is not directly liable for any accidents, disputes, or damages arising from meetups.</li>
            <li>The Service is not liable for service interruptions caused by force majeure events such as natural disasters or system failures.</li>
            <li>Users are responsible for the accuracy of the information they provide.</li>
            <li>The Service does not guarantee the reliability or accuracy of information exchanged between users.</li>
          </ol>
        </Section>

        <Section title="Article 9 (Service Changes and Termination)">
          <ol>
            <li>The Service may modify its features as needed for operational or technical reasons.</li>
            <li>We will notify users of changes in advance through in-app notices or email.</li>
            <li>Given that the Service is operated by an independent developer, the Service may be terminated with at least 30 days&apos; notice.</li>
          </ol>
        </Section>

        <Section title="Article 10 (Account Deletion)">
          <ol>
            <li>You may delete your account at any time through the app settings.</li>
            <li>Upon deletion, your personal information will be destroyed immediately, and content such as meetup posts will be removed.</li>
            <li>You may re-register with the same information after deletion.</li>
          </ol>
        </Section>

        <Section title="Article 11 (Intellectual Property)">
          <p>
            All intellectual property rights in the Service, including designs, logos, text, and code, belong to the Service operator.
            You may not reproduce, distribute, or modify content provided through the Service without authorization.
          </p>
        </Section>

        <Section title="Article 12 (Changes to Terms)">
          <ol>
            <li>These Terms may be changed as needed.</li>
            <li>We will notify users of changes at least 7 days before the effective date through in-app notices or email.</li>
            <li>If you do not agree with the updated Terms, you may delete your account.</li>
          </ol>
        </Section>

        <Section title="Article 13 (Dispute Resolution)">
          <ol>
            <li>Disputes related to the use of the Service shall be governed by the laws of the Republic of Korea.</li>
            <li>In the event of a dispute, we will endeavor to reach an amicable resolution.</li>
            <li>For inquiries, please contact us at hello@roami.kr.</li>
          </ol>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:text-gray-600">
        {children}
      </div>
    </section>
  );
}
