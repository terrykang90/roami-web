import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    alternates: localeAlternates(locale, "/terms"),
    title:
      locale === "ko"
        ? "이용약관 — roami"
        : locale === "th"
          ? "ข้อกำหนดการใช้งาน — roami"
          : "Terms of Service — roami",
    description:
      locale === "ko"
        ? "roami 앱의 이용약관입니다."
        : locale === "th"
          ? "ข้อกำหนดการใช้งานของแอป roami"
          : "Terms of Service for the roami app.",
  };
}

export default async function TermsPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <TermsKo /> : locale === "th" ? <TermsTh /> : <TermsEn />}
    </div>
  );
}

function TermsKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">이용약관</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2026년 6월</p>

      <div className="space-y-10">
        <Section title="제1조 (목적)">
          <p>
            본 약관은 개인 개발자가 운영하는 roami(이하 &ldquo;서비스&rdquo;)의 이용에 관한 기본적인 사항을 규정함을
            목적으로 합니다. 서비스는 여행자와 현지인이 지도 기반으로 모임을 만들고 참여하는 다국어 매칭 모바일 앱 및 웹 서비스입니다.
          </p>
        </Section>

        <Section title="제2조 (서비스 내용)">
          <p>서비스는 다음과 같은 기능을 제공합니다:</p>
          <ul>
            <li>지도 기반 모임 모집 및 참여</li>
            <li>카테고리별 모임 검색</li>
            <li>모임 참가 요청 및 승인 시스템</li>
            <li>모임 및 도시 채팅</li>
            <li>커뮤니티(Hub) 게시글·댓글, 호스트 리뷰</li>
            <li>다국어 자동 번역</li>
            <li>사용자 프로필 관리, 신고·차단 등 안전 기능</li>
          </ul>
        </Section>

        <Section title="제3조 (회원가입 및 계정)">
          <ol>
            <li>서비스 이용에는 소셜 로그인(Google 또는 Apple)을 통한 회원가입이 필요합니다.</li>
            <li>만 14세 미만은 가입할 수 없습니다.</li>
            <li>회원가입 시 정확한 정보를 제공해야 하며, 허위 정보 입력 시 이용이 제한될 수 있습니다.</li>
            <li>계정은 본인만 이용할 수 있으며, 타인에게 양도·대여할 수 없습니다.</li>
            <li>계정 보안은 본인 책임이며, 비정상적 접근 확인 시 즉시 알려야 합니다.</li>
          </ol>
        </Section>

        <Section title="제4조 (이용자의 의무 및 콘텐츠)">
          <ol>
            <li>타인의 권리를 존중하고 예의 바르게 서비스를 이용합니다.</li>
            <li>정확한 프로필 정보를 유지합니다.</li>
            <li>모임 참가 시 약속된 시간·장소를 성실히 지킵니다.</li>
            <li>서비스를 통해 얻은 타인의 개인정보를 무단 수집·이용하지 않습니다.</li>
            <li>이용자가 작성한 게시글·채팅·리뷰 등 콘텐츠에 대한 책임은 작성자에게 있으며, 서비스는 기능 제공·번역·표시를 위해 해당 콘텐츠를 이용할 수 있습니다.</li>
          </ol>
        </Section>

        <Section title="제5조 (금지 행위)">
          <p>다음 행위는 금지되며, 위반 시 서비스 이용이 제한되거나 계정이 정지될 수 있습니다:</p>
          <ul>
            <li>허위 정보 등록 또는 타인 사칭</li>
            <li>상업적 홍보·광고·스팸</li>
            <li>욕설·비하·차별·성희롱 등 타인에게 불쾌감을 주는 행위</li>
            <li>사기, 금전 요구, 불법 활동</li>
            <li>서비스의 정상 운영 방해</li>
            <li>타인의 개인정보를 동의 없이 수집·저장·공개</li>
            <li>모임을 이용한 범죄 행위</li>
            <li>보안 우회 또는 해킹 시도</li>
          </ul>
        </Section>

        <Section title="제6조 (모임 관련)">
          <ol>
            <li>모임은 이용자 간 자발적 만남이며, 서비스는 중개 역할만 합니다.</li>
            <li>호스트는 참가 요청을 승인·거절할 수 있습니다.</li>
            <li>모임 참가 후 발생하는 일체의 상황에 대한 책임은 참가자 본인에게 있습니다.</li>
            <li>안전을 위해 공공장소에서의 만남을 권장합니다. 자세한 안전 수칙은 커뮤니티·안전 수칙을 참고하세요.</li>
          </ol>
        </Section>

        <Section title="제7조 (이용 제한 및 계정 정지)">
          <ol>
            <li>약관 위반 시 경고·일시 정지·영구 정지 등의 조치를 취할 수 있습니다.</li>
            <li>이용 제한 시 이메일로 사유를 안내합니다.</li>
            <li>이의가 있을 경우 hello@roami.kr으로 문의할 수 있습니다.</li>
          </ol>
        </Section>

        <Section title="제8조 (면책 조항)">
          <ol>
            <li>서비스는 이용자 간 만남을 중개할 뿐, 모임에서 발생하는 사고·분쟁·피해에 직접 책임을 지지 않습니다.</li>
            <li>천재지변·시스템 장애 등 불가항력 사유로 인한 중단에 책임을 지지 않습니다.</li>
            <li>이용자가 제공한 정보 및 이용자 간 교환 정보의 정확성·신뢰성을 보증하지 않습니다.</li>
            <li>자동 번역 결과의 정확성을 보증하지 않습니다.</li>
          </ol>
        </Section>

        <Section title="제9조 (서비스 변경 및 중단)">
          <ol>
            <li>운영·기술상 필요에 따라 서비스 내용을 변경할 수 있습니다.</li>
            <li>변경 시 사전에 앱 내 공지 또는 이메일로 안내합니다.</li>
            <li>개인 개발자 운영 특성상 서비스가 종료될 수 있으며, 이 경우 최소 30일 전에 안내합니다.</li>
          </ol>
        </Section>

        <Section title="제10조 (회원 탈퇴)">
          <ol>
            <li>이용자는 언제든 앱 내 설정에서 탈퇴할 수 있습니다.</li>
            <li>탈퇴 시 개인정보는 개인정보처리방침에 따라 파기되며, 공개 콘텐츠는 익명화 또는 삭제됩니다.</li>
            <li>탈퇴 후 동일 정보로 재가입이 가능합니다.</li>
          </ol>
        </Section>

        <Section title="제11조 (지적 재산권)">
          <p>
            서비스에 포함된 디자인·로고·텍스트·코드 등 모든 지적 재산권은 서비스 운영자에게 귀속됩니다.
            이용자는 제공되는 콘텐츠를 무단 복제·배포·수정할 수 없습니다.
          </p>
        </Section>

        <Section title="제12조 (약관의 변경)">
          <ol>
            <li>본 약관은 필요에 따라 변경될 수 있습니다.</li>
            <li>변경 시 시행일 7일 전에 앱 내 공지 또는 이메일로 안내합니다.</li>
            <li>변경 약관에 동의하지 않는 경우 회원 탈퇴할 수 있습니다.</li>
          </ol>
        </Section>

        <Section title="제13조 (분쟁 해결)">
          <ol>
            <li>서비스 이용 관련 분쟁은 대한민국 법률을 적용합니다.</li>
            <li>분쟁 발생 시 원만한 해결을 위해 노력합니다.</li>
            <li>문의는 hello@roami.kr으로 연락 바랍니다.</li>
          </ol>
        </Section>
      </div>
    </>
  );
}

function TermsEn() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Terms of Service</h1>
      <p className="text-sm text-text-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-10">
        <Section title="Article 1 (Purpose)">
          <p>
            These Terms govern the use of roami (the &ldquo;Service&rdquo;), operated by an independent developer.
            The Service is a map-based, multilingual matching mobile app and web service where travelers and locals
            create and join meetups.
          </p>
        </Section>

        <Section title="Article 2 (Service Description)">
          <p>The Service provides the following features:</p>
          <ul>
            <li>Map-based meetup creation and participation</li>
            <li>Category-based meetup search</li>
            <li>Join request and approval system</li>
            <li>Meetup and city chat</li>
            <li>Community (Hub) posts &amp; comments, host reviews</li>
            <li>Multilingual auto-translation</li>
            <li>Profile management and safety features (reports/blocks)</li>
          </ul>
        </Section>

        <Section title="Article 3 (Registration and Accounts)">
          <ol>
            <li>Registration via social login (Google or Apple) is required.</li>
            <li>Users under 14 may not register.</li>
            <li>You must provide accurate information; false information may result in restricted access.</li>
            <li>Your account is for personal use only and may not be transferred or lent.</li>
            <li>You are responsible for account security and must notify us of unauthorized access.</li>
          </ol>
        </Section>

        <Section title="Article 4 (User Obligations &amp; Content)">
          <ol>
            <li>Respect others&apos; rights and use the Service courteously.</li>
            <li>Maintain accurate profile information.</li>
            <li>Honor the agreed time and place when joining meetups.</li>
            <li>Do not collect or misuse others&apos; personal information obtained through the Service.</li>
            <li>You are responsible for content you create (posts, chat, reviews); the Service may use such content to provide, translate, and display features.</li>
          </ol>
        </Section>

        <Section title="Article 5 (Prohibited Activities)">
          <p>The following activities are prohibited and may result in restricted access or account suspension:</p>
          <ul>
            <li>Registering false information or impersonating others</li>
            <li>Commercial promotion, advertising, or spam</li>
            <li>Profanity, disparagement, discrimination, sexual harassment, or offensive behavior</li>
            <li>Fraud, soliciting money, or illegal activities</li>
            <li>Interfering with the normal operation of the Service</li>
            <li>Collecting, storing, or disclosing others&apos; personal information without consent</li>
            <li>Criminal activity through meetups</li>
            <li>Bypassing security or attempting to hack the Service</li>
          </ul>
        </Section>

        <Section title="Article 6 (Meetups)">
          <ol>
            <li>Meetups are voluntary gatherings; the Service acts only as an intermediary.</li>
            <li>Hosts may approve or reject join requests.</li>
            <li>Participants are responsible for situations arising during or after a meetup.</li>
            <li>We recommend meeting in public places for safety. See the Community &amp; Safety Guidelines for details.</li>
          </ol>
        </Section>

        <Section title="Article 7 (Restrictions and Suspension)">
          <ol>
            <li>We may issue warnings, temporary suspensions, or permanent bans for violations.</li>
            <li>We will notify you of the reason for any restriction via email.</li>
            <li>You may contact us at hello@roami.kr to object.</li>
          </ol>
        </Section>

        <Section title="Article 8 (Disclaimer)">
          <ol>
            <li>The Service only facilitates meetups and is not directly liable for accidents, disputes, or damages arising from them.</li>
            <li>We are not liable for interruptions caused by force majeure such as natural disasters or system failures.</li>
            <li>We do not guarantee the accuracy or reliability of user-provided or user-exchanged information.</li>
            <li>We do not guarantee the accuracy of auto-translation results.</li>
          </ol>
        </Section>

        <Section title="Article 9 (Service Changes and Termination)">
          <ol>
            <li>We may modify features for operational or technical reasons.</li>
            <li>We will notify users in advance via in-app notice or email.</li>
            <li>As an independently operated service, it may be terminated with at least 30 days&apos; notice.</li>
          </ol>
        </Section>

        <Section title="Article 10 (Account Deletion)">
          <ol>
            <li>You may delete your account anytime in app settings.</li>
            <li>Upon deletion, personal information is destroyed per the Privacy Policy, and public content is anonymized or removed.</li>
            <li>You may re-register with the same information after deletion.</li>
          </ol>
        </Section>

        <Section title="Article 11 (Intellectual Property)">
          <p>
            All intellectual property in the Service (designs, logos, text, code) belongs to the operator.
            You may not reproduce, distribute, or modify content without authorization.
          </p>
        </Section>

        <Section title="Article 12 (Changes to Terms)">
          <ol>
            <li>These Terms may be changed as needed.</li>
            <li>We will notify users at least 7 days before the effective date via in-app notice or email.</li>
            <li>If you disagree with the updated Terms, you may delete your account.</li>
          </ol>
        </Section>

        <Section title="Article 13 (Dispute Resolution)">
          <ol>
            <li>Disputes are governed by the laws of the Republic of Korea.</li>
            <li>We will endeavor to reach an amicable resolution.</li>
            <li>For inquiries, contact hello@roami.kr.</li>
          </ol>
        </Section>
      </div>
    </>
  );
}

function TermsTh() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">ข้อกำหนดการใช้งาน</h1>
      <p className="text-sm text-text-muted mb-10">อัปเดตล่าสุด: มิถุนายน 2026</p>

      <div className="space-y-10">
        <Section title="ข้อ 1 (วัตถุประสงค์)">
          <p>
            ข้อกำหนดนี้ควบคุมการใช้ roami (&ldquo;บริการ&rdquo;) ซึ่งดำเนินการโดยนักพัฒนาอิสระ
            บริการเป็นแอปมือถือและเว็บจับคู่หลายภาษาบนแผนที่ ที่ซึ่งนักเดินทางและคนท้องถิ่นสร้างและเข้าร่วมมีตอัป
          </p>
        </Section>

        <Section title="ข้อ 2 (รายละเอียดบริการ)">
          <p>บริการมีฟีเจอร์ดังต่อไปนี้:</p>
          <ul>
            <li>สร้างและเข้าร่วมมีตอัปบนแผนที่</li>
            <li>ค้นหามีตอัปตามหมวดหมู่</li>
            <li>ระบบขอเข้าร่วมและอนุมัติ</li>
            <li>แชทมีตอัปและแชทเมือง</li>
            <li>โพสต์และความคิดเห็นในชุมชน (Hub) รีวิวโฮสต์</li>
            <li>การแปลอัตโนมัติหลายภาษา</li>
            <li>การจัดการโปรไฟล์และฟีเจอร์ความปลอดภัย (รายงาน/บล็อก)</li>
          </ul>
        </Section>

        <Section title="ข้อ 3 (การลงทะเบียนและบัญชี)">
          <ol>
            <li>ต้องลงทะเบียนผ่านการเข้าสู่ระบบโซเชียล (Google หรือ Apple)</li>
            <li>ผู้ที่อายุต่ำกว่า 14 ปีไม่สามารถลงทะเบียนได้</li>
            <li>คุณต้องให้ข้อมูลที่ถูกต้อง ข้อมูลเท็จอาจทำให้ถูกจำกัดการใช้งาน</li>
            <li>บัญชีใช้ได้เฉพาะตัวคุณเอง ห้ามโอนหรือให้ผู้อื่นยืม</li>
            <li>คุณรับผิดชอบความปลอดภัยของบัญชี และต้องแจ้งเราเมื่อพบการเข้าถึงที่ไม่ได้รับอนุญาต</li>
          </ol>
        </Section>

        <Section title="ข้อ 4 (หน้าที่ของผู้ใช้และเนื้อหา)">
          <ol>
            <li>เคารพสิทธิของผู้อื่นและใช้บริการอย่างสุภาพ</li>
            <li>รักษาข้อมูลโปรไฟล์ให้ถูกต้อง</li>
            <li>รักษาเวลาและสถานที่ที่นัดไว้เมื่อเข้าร่วมมีตอัป</li>
            <li>ห้ามเก็บหรือใช้ข้อมูลส่วนบุคคลของผู้อื่นที่ได้จากบริการในทางที่ผิด</li>
            <li>คุณรับผิดชอบเนื้อหาที่คุณสร้าง (โพสต์ แชท รีวิว) และบริการอาจใช้เนื้อหานั้นเพื่อให้บริการ แปล และแสดงผล</li>
          </ol>
        </Section>

        <Section title="ข้อ 5 (การกระทำที่ห้าม)">
          <p>การกระทำต่อไปนี้เป็นข้อห้าม และอาจทำให้ถูกจำกัดการใช้งานหรือระงับบัญชี:</p>
          <ul>
            <li>ลงทะเบียนข้อมูลเท็จหรือแอบอ้างเป็นผู้อื่น</li>
            <li>การโปรโมต โฆษณา หรือสแปมเชิงพาณิชย์</li>
            <li>คำหยาบ การดูหมิ่น เลือกปฏิบัติ ล่วงละเมิดทางเพศ หรือพฤติกรรมที่สร้างความไม่พอใจ</li>
            <li>การฉ้อโกง เรียกร้องเงิน หรือกิจกรรมผิดกฎหมาย</li>
            <li>การรบกวนการทำงานปกติของบริการ</li>
            <li>การเก็บ จัดเก็บ หรือเปิดเผยข้อมูลส่วนบุคคลของผู้อื่นโดยไม่ได้รับความยินยอม</li>
            <li>การก่ออาชญากรรมผ่านมีตอัป</li>
            <li>การหลีกเลี่ยงระบบรักษาความปลอดภัยหรือพยายามแฮ็กบริการ</li>
          </ul>
        </Section>

        <Section title="ข้อ 6 (เกี่ยวกับมีตอัป)">
          <ol>
            <li>มีตอัปเป็นการพบปะโดยสมัครใจระหว่างผู้ใช้ บริการทำหน้าที่เป็นตัวกลางเท่านั้น</li>
            <li>โฮสต์สามารถอนุมัติหรือปฏิเสธคำขอเข้าร่วมได้</li>
            <li>ผู้เข้าร่วมรับผิดชอบสถานการณ์ที่เกิดขึ้นระหว่างหรือหลังมีตอัป</li>
            <li>เพื่อความปลอดภัย แนะนำให้เจอกันในที่สาธารณะ ดูรายละเอียดได้ที่แนวทางชุมชนและความปลอดภัย</li>
          </ol>
        </Section>

        <Section title="ข้อ 7 (การจำกัดการใช้งานและการระงับบัญชี)">
          <ol>
            <li>เราอาจเตือน ระงับชั่วคราว หรือระงับถาวรกรณีฝ่าฝืน</li>
            <li>เราจะแจ้งเหตุผลของการจำกัดผ่านอีเมล</li>
            <li>หากมีข้อโต้แย้ง ติดต่อเราที่ hello@roami.kr</li>
          </ol>
        </Section>

        <Section title="ข้อ 8 (ข้อจำกัดความรับผิด)">
          <ol>
            <li>บริการเป็นเพียงตัวกลางอำนวยความสะดวกในการนัดพบ ไม่รับผิดชอบโดยตรงต่ออุบัติเหตุ ข้อพิพาท หรือความเสียหายที่เกิดจากมีตอัป</li>
            <li>เราไม่รับผิดชอบการหยุดให้บริการอันเกิดจากเหตุสุดวิสัย เช่น ภัยธรรมชาติหรือระบบขัดข้อง</li>
            <li>เราไม่รับประกันความถูกต้องหรือความน่าเชื่อถือของข้อมูลที่ผู้ใช้ให้หรือแลกเปลี่ยนกัน</li>
            <li>เราไม่รับประกันความถูกต้องของผลการแปลอัตโนมัติ</li>
          </ol>
        </Section>

        <Section title="ข้อ 9 (การเปลี่ยนแปลงและยุติบริการ)">
          <ol>
            <li>เราอาจปรับเปลี่ยนฟีเจอร์ตามความจำเป็นด้านการดำเนินงานหรือเทคนิค</li>
            <li>เราจะแจ้งผู้ใช้ล่วงหน้าผ่านการแจ้งเตือนในแอปหรืออีเมล</li>
            <li>เนื่องจากเป็นบริการที่ดำเนินการโดยอิสระ บริการอาจยุติได้โดยแจ้งล่วงหน้าอย่างน้อย 30 วัน</li>
          </ol>
        </Section>

        <Section title="ข้อ 10 (การลบบัญชี)">
          <ol>
            <li>คุณลบบัญชีได้ทุกเมื่อในตั้งค่าแอป</li>
            <li>เมื่อลบ ข้อมูลส่วนบุคคลจะถูกทำลายตามนโยบายความเป็นส่วนตัว และเนื้อหาสาธารณะจะถูกทำให้ไม่ระบุตัวตนหรือลบออก</li>
            <li>คุณลงทะเบียนใหม่ด้วยข้อมูลเดิมได้หลังการลบ</li>
          </ol>
        </Section>

        <Section title="ข้อ 11 (ทรัพย์สินทางปัญญา)">
          <p>
            ทรัพย์สินทางปัญญาทั้งหมดในบริการ (ดีไซน์ โลโก้ ข้อความ โค้ด) เป็นของผู้ดำเนินการ
            คุณไม่อาจทำซ้ำ เผยแพร่ หรือดัดแปลงเนื้อหาโดยไม่ได้รับอนุญาต
          </p>
        </Section>

        <Section title="ข้อ 12 (การเปลี่ยนแปลงข้อกำหนด)">
          <ol>
            <li>ข้อกำหนดนี้อาจเปลี่ยนแปลงได้ตามความจำเป็น</li>
            <li>เราจะแจ้งผู้ใช้อย่างน้อย 7 วันก่อนวันมีผล ผ่านการแจ้งเตือนในแอปหรืออีเมล</li>
            <li>หากคุณไม่เห็นด้วยกับข้อกำหนดที่ปรับปรุง คุณสามารถลบบัญชีได้</li>
          </ol>
        </Section>

        <Section title="ข้อ 13 (การระงับข้อพิพาท)">
          <ol>
            <li>ข้อพิพาทอยู่ภายใต้กฎหมายของสาธารณรัฐเกาหลี</li>
            <li>เราจะพยายามหาข้อยุติอย่างเป็นมิตร</li>
            <li>สอบถามได้ที่ hello@roami.kr</li>
          </ol>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-text-primary mb-3">{title}</h2>
      <div className="text-sm text-text-secondary leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5 [&_li]:text-text-secondary">
        {children}
      </div>
    </section>
  );
}
