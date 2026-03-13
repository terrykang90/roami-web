import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 — Roami",
  description: "Roami 앱의 개인정보처리방침입니다.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-400 mb-10">최종 업데이트: 2025년 3월</p>

      <div className="prose-custom space-y-10">
        <Section title="1. 개요">
          <p>
            Roami(이하 &ldquo;서비스&rdquo;)는 개인 개발자가 운영하는 모바일 애플리케이션으로,
            여행 중 동행을 찾을 수 있는 지도 기반 매칭 서비스입니다.
            본 개인정보처리방침은 서비스 이용 과정에서 수집되는 개인정보의 처리에 관한 사항을 안내합니다.
          </p>
        </Section>

        <Section title="2. 수집하는 개인정보">
          <p>서비스는 다음과 같은 개인정보를 수집합니다:</p>
          <h4 className="font-semibold text-gray-900 mt-4 mb-2">필수 수집 항목</h4>
          <ul>
            <li>이메일 주소 (회원가입 및 로그인)</li>
            <li>닉네임 (프로필 표시)</li>
            <li>위치 정보 (지도 기반 서비스 제공)</li>
          </ul>
          <h4 className="font-semibold text-gray-900 mt-4 mb-2">선택 수집 항목</h4>
          <ul>
            <li>프로필 사진</li>
            <li>자기소개</li>
            <li>관심 여행 도시</li>
          </ul>
          <h4 className="font-semibold text-gray-900 mt-4 mb-2">자동 수집 항목</h4>
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
            위 권리 행사는 앱 내 설정 또는 이메일(hello@roami.app)을 통해 요청할 수 있습니다.
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
            <li>이메일: hello@roami.app</li>
          </ul>
        </Section>

        <Section title="11. 방침 변경">
          <p>
            본 개인정보처리방침은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            변경 시 앱 내 공지 또는 이메일을 통해 안내합니다.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
      <div className="text-sm text-gray-600 leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-gray-600">
        {children}
      </div>
    </section>
  );
}
