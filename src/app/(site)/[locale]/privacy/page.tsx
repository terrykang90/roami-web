import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    alternates: localeAlternates(locale, "/privacy"),
    title:
      locale === "ko"
        ? "개인정보처리방침 — roami"
        : locale === "th"
          ? "นโยบายความเป็นส่วนตัว — roami"
          : "Privacy Policy — roami",
    description:
      locale === "ko"
        ? "roami 앱의 개인정보처리방침입니다."
        : locale === "th"
          ? "นโยบายความเป็นส่วนตัวของแอป roami"
          : "Privacy Policy for the roami app.",
  };
}

export default async function PrivacyPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <PrivacyKo /> : locale === "th" ? <PrivacyTh /> : <PrivacyEn />}
    </div>
  );
}

function PrivacyKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">개인정보처리방침</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2026년 6월</p>

      <div className="prose-custom space-y-10">
        <Section title="1. 개요">
          <p>
            roami(이하 &ldquo;서비스&rdquo;)는 개인 개발자가 운영하는 모바일 앱 및 웹 서비스로,
            여행자와 현지인이 지도 기반으로 모임(meetup)을 만들고 참여하는 다국어 매칭 서비스를 제공합니다.
            본 방침은 서비스 이용 과정에서 수집·이용·제공되는 개인정보의 처리에 관한 사항을 안내합니다.
          </p>
        </Section>

        <Section title="2. 수집하는 개인정보">
          <h4 className="font-semibold text-text-primary mt-4 mb-2">필수 수집 항목</h4>
          <ul>
            <li>이메일 주소 (소셜 로그인 — Google 또는 Apple 계정 연동)</li>
            <li>닉네임 (프로필 표시)</li>
            <li>위치 정보 (지도 기반 서비스 제공)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">선택 수집 항목</h4>
          <ul>
            <li>프로필 사진 및 추가 사진</li>
            <li>자기소개(bio), 국적, 생년월일·성별</li>
            <li>구사 언어 및 선호 언어, 관심 여행 도시</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">서비스 이용 과정에서 생성되는 정보</h4>
          <ul>
            <li>모임 제목·설명, 모임 장소(정확/표시용 좌표)</li>
            <li>채팅 메시지 (텍스트·이미지·위치 공유 포함)</li>
            <li>커뮤니티(Hub) 게시글·댓글, 호스트 리뷰</li>
            <li>관심 핀, 신고·차단 내역, 알림 구독(도시/주변) 정보</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">자동 수집 항목</h4>
          <ul>
            <li>기기 정보 (OS 버전, 기기 모델), 푸시 알림 토큰</li>
            <li>앱 사용 로그 (접속 시간, 기능 사용 기록)</li>
            <li>정확한 위치 좌표 (위치 동의 시)</li>
            <li>오류·진단 로그 (앱 안정성 분석)</li>
          </ul>
        </Section>

        <Section title="3. 개인정보의 이용 목적">
          <ul>
            <li>회원 관리 및 본인 확인</li>
            <li>모임 매칭 서비스 제공 (지도 기반 표시 및 참여)</li>
            <li>다국어 번역 제공 (모임·채팅·게시글)</li>
            <li>채팅 및 커뮤니티 기능 제공</li>
            <li>알림 전달, 안전 관리(신고·차단), 부정 이용 방지</li>
            <li>서비스 개선 및 신규 기능 개발</li>
          </ul>
        </Section>

        <Section title="4. 개인정보 처리의 위탁 및 제3자 제공">
          <p>
            서비스는 기능 제공을 위해 아래 외부 처리자(수탁사)에 일부 개인정보·콘텐츠를 위탁합니다.
            이용자의 개인정보를 마케팅 목적으로 제3자에게 판매·제공하지 않습니다.
          </p>
          <LegalTable
            head={["수탁사 (소재 국가)", "위탁 항목", "목적"]}
            rows={[
              ["DeepSeek (중국)", "모임 제목·설명, 채팅 메시지, 게시글·댓글, 자기소개 등 텍스트", "다국어 번역 (기본)"],
              ["Google Cloud Translation (미국)", "채팅 메시지 텍스트", "번역 (보조)"],
              ["Google / Firebase Cloud Messaging (미국)", "기기 푸시 토큰, 알림 제목·내용", "푸시 알림 발송"],
              ["Google Cloud Platform · Storage (미국/아시아)", "서비스 데이터, 업로드 이미지", "서버 호스팅 및 이미지 저장"],
              ["Google · Apple (미국)", "로그인 토큰 (이메일, 계정 식별자)", "소셜 로그인 인증"],
              ["Mapbox (미국)", "위치 정보, 지도 이용 데이터", "지도 표시"],
              ["Sentry (미국)", "오류·진단 로그, 기기 정보", "앱 오류 분석"],
            ]}
          />
          <p>
            또한 서비스 제공을 위해 필요한 최소한의 정보(닉네임, 프로필 사진, 국적 등)는 모임 참가자 간에 공유되며,
            법령에 따라 요구되는 경우 관계기관에 제공될 수 있습니다.
          </p>
        </Section>

        <Section title="5. 개인정보의 국외 이전">
          <p>위 수탁사 중 일부는 국외에 소재하여, 서비스 이용 시 개인정보·콘텐츠가 국외로 이전됩니다.</p>
          <ul>
            <li><b>이전받는 자 / 국가:</b> 위 4항 표 기재 (미국·중국 등)</li>
            <li><b>이전 항목:</b> 4항 표의 위탁 항목과 동일</li>
            <li><b>이전 시점 및 방법:</b> 해당 기능 이용 시점에 암호화된 통신(TLS)으로 전송</li>
            <li><b>이용 목적·보유 기간:</b> 각 수탁사의 처리 목적 달성 시까지 (번역 결과는 서비스 내 저장)</li>
          </ul>
          <p>이용자는 위치 동의 해제, 자동 번역 비활성화, 회원 탈퇴 등을 통해 국외 이전을 제한할 수 있습니다.</p>
        </Section>

        <Section title="6. 개인정보의 보관 및 파기">
          <p>개인정보는 서비스 이용 기간 동안 보관되며, 회원 탈퇴 시 지체 없이 파기합니다. 다만 다음의 경우 예외로 합니다:</p>
          <ul>
            <li>공개 커뮤니티 게시글·리뷰 등 다른 이용자와 연관된 콘텐츠는 익명화 또는 삭제 처리</li>
            <li>신고·차단 등 안전·분쟁 관련 기록은 분쟁 대응 목적으로 일정 기간 보관 후 파기</li>
            <li>법령에 따른 보존: 계약/청약철회 기록 5년, 소비자 분쟁 기록 3년, 접속 로그 3개월</li>
          </ul>
        </Section>

        <Section title="7. 개인정보의 안전성 확보 조치">
          <ul>
            <li>전송 구간 암호화(TLS/SSL) 및 저장 데이터 보호</li>
            <li>접근 권한 관리 및 최소 수집 원칙</li>
            <li>지도 표시 시 모임 위치 좌표 일부를 흐리게 처리하여 정확한 위치 노출 최소화</li>
          </ul>
        </Section>

        <Section title="8. 이용자의 권리">
          <ul>
            <li>개인정보 열람·정정·삭제·처리정지 요청</li>
            <li>회원 탈퇴 (앱 내 설정에서 직접 가능)</li>
            <li>위치·알림·자동 번역 동의 철회 (앱/기기 설정)</li>
          </ul>
          <p>권리 행사는 앱 내 설정 또는 이메일(hello@roami.kr)로 요청할 수 있습니다.</p>
        </Section>

        <Section title="9. 위치 정보">
          <p>
            서비스는 지도 기반 모임 매칭을 위해 정확한 위치 좌표를 수집하며, 앱 사용 중에만 수집합니다.
            위치 정보는 동의 하에 수집되고 앱·기기 설정에서 언제든 비활성화할 수 있습니다.
            모임의 정확한 위치는 호스트가 설정하며, 지도에는 보호를 위해 근사 좌표로 표시됩니다.
          </p>
        </Section>

        <Section title="10. 아동의 개인정보">
          <p>서비스는 만 14세 미만 아동의 가입을 허용하지 않으며, 해당 연령 미만의 개인정보를 수집하지 않습니다.</p>
        </Section>

        <Section title="11. 쿠키 및 추적 기술">
          <p>
            모바일 앱은 광고 식별자(IDFA 등)나 제3자 광고·추적 SDK를 사용하지 않습니다.
            웹사이트의 경우 필수 기능을 위해 최소한의 쿠키를 사용할 수 있습니다.
          </p>
        </Section>

        <Section title="12. 개인정보 보호책임자 및 문의">
          <ul><li>이메일: hello@roami.kr</li></ul>
        </Section>

        <Section title="13. 방침 변경">
          <p>
            본 방침은 법령 및 서비스 변경에 따라 수정될 수 있으며,
            중요한 변경 시 앱 내 공지 또는 이메일로 안내합니다.
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
      <p className="text-sm text-text-muted mb-10">Last updated: June 2026</p>

      <div className="prose-custom space-y-10">
        <Section title="1. Overview">
          <p>
            roami (the &ldquo;Service&rdquo;) is a mobile app and web service operated by an independent developer.
            It provides a map-based, multilingual matching service where travelers and locals create and join meetups.
            This Privacy Policy explains how we collect, use, share, and protect your personal information.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Required</h4>
          <ul>
            <li>Email address (via social login &mdash; Google or Apple)</li>
            <li>Nickname (shown on your profile)</li>
            <li>Location data (for map-based services)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Optional</h4>
          <ul>
            <li>Profile photo and additional photos</li>
            <li>Bio, nationality, date of birth, gender</li>
            <li>Spoken &amp; preferred languages, cities of interest</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Generated through use of the Service</h4>
          <ul>
            <li>Meetup titles/descriptions and location (exact/display coordinates)</li>
            <li>Chat messages (including images and shared location)</li>
            <li>Community (Hub) posts &amp; comments, host reviews</li>
            <li>Interest pins, reports/blocks, alert subscriptions (city/nearby)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">Automatically collected</h4>
          <ul>
            <li>Device info (OS version, model), push notification token</li>
            <li>App usage logs (access times, feature usage)</li>
            <li>Precise location coordinates (with your permission)</li>
            <li>Error/diagnostic logs (app stability)</li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul>
            <li>Account management and identity verification</li>
            <li>Providing the meetup matching service (map display and participation)</li>
            <li>Multilingual translation (meetups, chat, posts)</li>
            <li>Chat and community features</li>
            <li>Notifications, safety (reports/blocks), and misuse prevention</li>
            <li>Service improvement and new feature development</li>
          </ul>
        </Section>

        <Section title="4. Processors &amp; Third-Party Sharing">
          <p>
            To provide its features, the Service entrusts certain personal information and content to the external
            processors below. We do not sell your personal information or share it with third parties for marketing.
          </p>
          <LegalTable
            head={["Processor (location)", "Data shared", "Purpose"]}
            rows={[
              ["DeepSeek (China)", "Text from meetup titles/descriptions, chat messages, posts/comments, bios", "Translation (primary)"],
              ["Google Cloud Translation (USA)", "Chat message text", "Translation (fallback)"],
              ["Google / Firebase Cloud Messaging (USA)", "Push token, notification title/body", "Push notifications"],
              ["Google Cloud Platform · Storage (USA/Asia)", "Service data, uploaded images", "Hosting & image storage"],
              ["Google · Apple (USA)", "Login token (email, account ID)", "Social login auth"],
              ["Mapbox (USA)", "Location, map usage data", "Map rendering"],
              ["Sentry (USA)", "Error/diagnostic logs, device info", "Crash analysis"],
            ]}
          />
          <p>
            Minimal information needed to provide the service (nickname, profile photo, nationality, etc.) is shared
            between meetup participants, and information may be disclosed to authorities where required by law.
          </p>
        </Section>

        <Section title="5. International Data Transfers">
          <p>
            Some processors above are located outside your country, so your information may be transferred
            internationally when you use the Service.
          </p>
          <ul>
            <li><b>Recipients / countries:</b> as listed in Section 4 (USA, China, etc.)</li>
            <li><b>Data transferred:</b> same as the Section 4 table</li>
            <li><b>When &amp; how:</b> at the time you use the feature, over encrypted (TLS) connections</li>
            <li><b>Purpose &amp; retention:</b> until each processor&apos;s purpose is fulfilled (translations are stored within the Service)</li>
          </ul>
          <p>You can limit these transfers by disabling location, turning off auto-translation, or deleting your account.</p>
        </Section>

        <Section title="6. Data Retention and Deletion">
          <p>Personal information is retained while you use the Service and deleted without delay upon account deletion, except:</p>
          <ul>
            <li>Public community posts/reviews tied to other users are anonymized or removed</li>
            <li>Safety/dispute records (reports, blocks) are kept for a limited period for dispute handling, then deleted</li>
            <li>Records required by law: contract/withdrawal 5 years, consumer disputes 3 years, access logs 3 months</li>
          </ul>
        </Section>

        <Section title="7. Security Measures">
          <ul>
            <li>Encryption in transit (TLS/SSL) and protection of stored data</li>
            <li>Access control and data minimization</li>
            <li>Meetup coordinates are fuzzed on the map to avoid exposing exact locations</li>
          </ul>
        </Section>

        <Section title="8. Your Rights">
          <ul>
            <li>Request access, correction, deletion, or suspension of processing</li>
            <li>Delete your account (in app settings)</li>
            <li>Withdraw consent for location, notifications, and auto-translation (app/device settings)</li>
          </ul>
          <p>Exercise these rights via app settings or hello@roami.kr.</p>
        </Section>

        <Section title="9. Location Information">
          <p>
            We collect precise location coordinates for map-based matching, only while the app is in use.
            Location is collected with your consent and can be disabled anytime in app or device settings.
            A meetup&apos;s exact location is set by its host and shown on the map as an approximate point for safety.
          </p>
        </Section>

        <Section title="10. Children&apos;s Privacy">
          <p>The Service does not allow registration by children under 14 and does not knowingly collect their personal information.</p>
        </Section>

        <Section title="11. Cookies and Tracking">
          <p>
            The mobile app does not use advertising identifiers (e.g., IDFA) or third-party ad/tracking SDKs.
            The website may use minimal cookies for essential functionality.
          </p>
        </Section>

        <Section title="12. Contact">
          <ul><li>Email: hello@roami.kr</li></ul>
        </Section>

        <Section title="13. Policy Changes">
          <p>
            This Policy may be updated due to changes in law or the Service.
            We will notify you of material changes via in-app notice or email.
          </p>
        </Section>
      </div>
    </>
  );
}

function PrivacyTh() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">นโยบายความเป็นส่วนตัว</h1>
      <p className="text-sm text-text-muted mb-10">อัปเดตล่าสุด: มิถุนายน 2026</p>

      <div className="prose-custom space-y-10">
        <Section title="1. ภาพรวม">
          <p>
            roami (&ldquo;บริการ&rdquo;) เป็นแอปมือถือและเว็บที่ดำเนินการโดยนักพัฒนาอิสระ
            ให้บริการจับคู่หลายภาษาบนแผนที่ ที่ซึ่งนักเดินทางและคนท้องถิ่นสร้างและเข้าร่วมมีตอัป
            นโยบายนี้อธิบายวิธีที่เราเก็บ ใช้ แบ่งปัน และคุ้มครองข้อมูลส่วนบุคคลของคุณ
          </p>
        </Section>

        <Section title="2. ข้อมูลที่เราเก็บ">
          <h4 className="font-semibold text-text-primary mt-4 mb-2">ข้อมูลที่จำเป็น</h4>
          <ul>
            <li>อีเมล (เข้าสู่ระบบผ่านโซเชียล — บัญชี Google หรือ Apple)</li>
            <li>ชื่อเล่น (แสดงบนโปรไฟล์)</li>
            <li>ข้อมูลตำแหน่ง (สำหรับบริการบนแผนที่)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">ข้อมูลที่เลือกให้</h4>
          <ul>
            <li>รูปโปรไฟล์และรูปเพิ่มเติม</li>
            <li>คำแนะนำตัว (bio) สัญชาติ วันเกิด และเพศ</li>
            <li>ภาษาที่พูดและภาษาที่ต้องการ เมืองที่สนใจ</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">ข้อมูลที่เกิดจากการใช้บริการ</h4>
          <ul>
            <li>ชื่อ/รายละเอียดมีตอัป และสถานที่ (พิกัดจริง/พิกัดที่แสดง)</li>
            <li>ข้อความแชท (รวมถึงรูปภาพและการแชร์ตำแหน่ง)</li>
            <li>โพสต์และความคิดเห็นในชุมชน (Hub) รีวิวโฮสต์</li>
            <li>หมุดความสนใจ ประวัติการรายงาน/บล็อก และการสมัครรับการแจ้งเตือน (เมือง/ใกล้เคียง)</li>
          </ul>
          <h4 className="font-semibold text-text-primary mt-4 mb-2">ข้อมูลที่เก็บอัตโนมัติ</h4>
          <ul>
            <li>ข้อมูลอุปกรณ์ (เวอร์ชัน OS รุ่นเครื่อง) และโทเค็นการแจ้งเตือน</li>
            <li>บันทึกการใช้งานแอป (เวลาเข้าใช้ การใช้ฟีเจอร์)</li>
            <li>พิกัดตำแหน่งที่แม่นยำ (เมื่อคุณอนุญาต)</li>
            <li>บันทึกข้อผิดพลาด/การวินิจฉัย (เพื่อความเสถียรของแอป)</li>
          </ul>
        </Section>

        <Section title="3. วัตถุประสงค์การใช้ข้อมูล">
          <ul>
            <li>การจัดการบัญชีและการยืนยันตัวตน</li>
            <li>ให้บริการจับคู่มีตอัป (แสดงและเข้าร่วมบนแผนที่)</li>
            <li>การแปลหลายภาษา (มีตอัป แชท โพสต์)</li>
            <li>ฟีเจอร์แชทและชุมชน</li>
            <li>การแจ้งเตือน ความปลอดภัย (รายงาน/บล็อก) และป้องกันการใช้งานในทางที่ผิด</li>
            <li>การปรับปรุงบริการและพัฒนาฟีเจอร์ใหม่</li>
          </ul>
        </Section>

        <Section title="4. ผู้ประมวลผลและการเปิดเผยต่อบุคคลที่สาม">
          <p>
            เพื่อให้บริการ เรามอบหมายข้อมูลส่วนบุคคลและเนื้อหาบางส่วนให้แก่ผู้ประมวลผลภายนอกด้านล่าง
            เราไม่ขายข้อมูลส่วนบุคคลของคุณ และไม่แบ่งปันให้บุคคลที่สามเพื่อการตลาด
          </p>
          <LegalTable
            head={["ผู้ประมวลผล (ประเทศ)", "ข้อมูลที่ส่ง", "วัตถุประสงค์"]}
            rows={[
              ["DeepSeek (จีน)", "ข้อความจากชื่อ/รายละเอียดมีตอัป ข้อความแชท โพสต์/ความคิดเห็น และ bio", "การแปล (หลัก)"],
              ["Google Cloud Translation (สหรัฐฯ)", "ข้อความแชท", "การแปล (สำรอง)"],
              ["Google / Firebase Cloud Messaging (สหรัฐฯ)", "โทเค็นการแจ้งเตือน หัวข้อ/เนื้อหาแจ้งเตือน", "ส่งการแจ้งเตือน"],
              ["Google Cloud Platform · Storage (สหรัฐฯ/เอเชีย)", "ข้อมูลบริการ รูปภาพที่อัปโหลด", "โฮสติงและจัดเก็บรูปภาพ"],
              ["Google · Apple (สหรัฐฯ)", "โทเค็นเข้าสู่ระบบ (อีเมล รหัสบัญชี)", "ยืนยันการเข้าสู่ระบบโซเชียล"],
              ["Mapbox (สหรัฐฯ)", "ตำแหน่ง ข้อมูลการใช้แผนที่", "แสดงแผนที่"],
              ["Sentry (สหรัฐฯ)", "บันทึกข้อผิดพลาด/วินิจฉัย ข้อมูลอุปกรณ์", "วิเคราะห์ข้อผิดพลาด"],
            ]}
          />
          <p>
            นอกจากนี้ ข้อมูลขั้นต่ำที่จำเป็นต่อการให้บริการ (ชื่อเล่น รูปโปรไฟล์ สัญชาติ ฯลฯ)
            จะถูกแบ่งปันระหว่างผู้เข้าร่วมมีตอัป และอาจเปิดเผยต่อหน่วยงานเมื่อกฎหมายกำหนด
          </p>
        </Section>

        <Section title="5. การโอนข้อมูลไปต่างประเทศ">
          <p>ผู้ประมวลผลบางรายข้างต้นตั้งอยู่นอกประเทศของคุณ ข้อมูลของคุณจึงอาจถูกโอนไปต่างประเทศเมื่อใช้บริการ</p>
          <ul>
            <li><b>ผู้รับ / ประเทศ:</b> ตามตารางในข้อ 4 (สหรัฐฯ จีน ฯลฯ)</li>
            <li><b>ข้อมูลที่โอน:</b> เช่นเดียวกับตารางในข้อ 4</li>
            <li><b>เมื่อใดและอย่างไร:</b> ณ เวลาที่คุณใช้ฟีเจอร์ ผ่านการเชื่อมต่อที่เข้ารหัส (TLS)</li>
            <li><b>วัตถุประสงค์และการเก็บรักษา:</b> จนกว่าจะบรรลุวัตถุประสงค์ของผู้ประมวลผลแต่ละราย (ผลการแปลถูกจัดเก็บภายในบริการ)</li>
          </ul>
          <p>คุณจำกัดการโอนเหล่านี้ได้โดยปิดตำแหน่ง ปิดการแปลอัตโนมัติ หรือลบบัญชี</p>
        </Section>

        <Section title="6. การเก็บรักษาและการลบข้อมูล">
          <p>ข้อมูลส่วนบุคคลจะถูกเก็บไว้ระหว่างที่คุณใช้บริการ และจะถูกลบโดยไม่ชักช้าเมื่อลบบัญชี ยกเว้น:</p>
          <ul>
            <li>โพสต์/รีวิวสาธารณะที่เกี่ยวข้องกับผู้ใช้อื่นจะถูกทำให้ไม่ระบุตัวตนหรือลบออก</li>
            <li>บันทึกด้านความปลอดภัย/ข้อพิพาท (รายงาน บล็อก) จะถูกเก็บไว้ระยะหนึ่งเพื่อจัดการข้อพิพาท แล้วจึงลบ</li>
            <li>บันทึกที่กฎหมายกำหนด: สัญญา/การถอนตัว 5 ปี ข้อพิพาทผู้บริโภค 3 ปี บันทึกการเข้าถึง 3 เดือน</li>
          </ul>
        </Section>

        <Section title="7. มาตรการรักษาความปลอดภัย">
          <ul>
            <li>เข้ารหัสระหว่างส่ง (TLS/SSL) และคุ้มครองข้อมูลที่จัดเก็บ</li>
            <li>การควบคุมการเข้าถึงและการเก็บข้อมูลเท่าที่จำเป็น</li>
            <li>พิกัดมีตอัปจะถูกทำให้พร่ามัวบนแผนที่เพื่อไม่ให้เปิดเผยตำแหน่งที่แน่นอน</li>
          </ul>
        </Section>

        <Section title="8. สิทธิของคุณ">
          <ul>
            <li>ขอเข้าถึง แก้ไข ลบ หรือระงับการประมวลผล</li>
            <li>ลบบัญชี (ในตั้งค่าแอป)</li>
            <li>ถอนความยินยอมเรื่องตำแหน่ง การแจ้งเตือน และการแปลอัตโนมัติ (ตั้งค่าแอป/อุปกรณ์)</li>
          </ul>
          <p>ใช้สิทธิเหล่านี้ผ่านตั้งค่าแอปหรือ hello@roami.kr</p>
        </Section>

        <Section title="9. ข้อมูลตำแหน่ง">
          <p>
            เราเก็บพิกัดที่แม่นยำเพื่อการจับคู่บนแผนที่ เฉพาะขณะใช้งานแอปเท่านั้น
            ตำแหน่งถูกเก็บด้วยความยินยอมของคุณ และปิดได้ทุกเมื่อในตั้งค่าแอปหรืออุปกรณ์
            ตำแหน่งที่แน่นอนของมีตอัปกำหนดโดยโฮสต์ และแสดงบนแผนที่เป็นจุดโดยประมาณเพื่อความปลอดภัย
          </p>
        </Section>

        <Section title="10. ความเป็นส่วนตัวของเด็ก">
          <p>บริการไม่อนุญาตให้ผู้ที่อายุต่ำกว่า 14 ปีลงทะเบียน และไม่เก็บข้อมูลส่วนบุคคลของพวกเขาโดยเจตนา</p>
        </Section>

        <Section title="11. คุกกี้และการติดตาม">
          <p>
            แอปมือถือไม่ใช้ตัวระบุโฆษณา (เช่น IDFA) หรือ SDK โฆษณา/ติดตามของบุคคลที่สาม
            เว็บไซต์อาจใช้คุกกี้ขั้นต่ำเพื่อการทำงานที่จำเป็น
          </p>
        </Section>

        <Section title="12. ติดต่อ">
          <ul><li>อีเมล: hello@roami.kr</li></ul>
        </Section>

        <Section title="13. การเปลี่ยนแปลงนโยบาย">
          <p>นโยบายนี้อาจปรับปรุงตามการเปลี่ยนแปลงของกฎหมายหรือบริการ เราจะแจ้งการเปลี่ยนแปลงสำคัญผ่านการแจ้งเตือนในแอปหรืออีเมล</p>
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

function LegalTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} className="border border-border-subtle bg-bg-secondary px-2.5 py-2 text-left font-semibold text-text-primary align-top">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border border-border-subtle px-2.5 py-2 align-top text-text-secondary">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
