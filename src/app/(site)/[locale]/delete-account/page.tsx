import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    alternates: localeAlternates(locale, "/delete-account"),
    title:
      locale === "ko"
        ? "계정 삭제 안내 — roami"
        : locale === "th"
          ? "การลบบัญชี — roami"
          : "Delete your account — roami",
    description:
      locale === "ko"
        ? "roami 계정과 데이터를 삭제하는 방법을 안내합니다."
        : locale === "th"
          ? "วิธีลบบัญชี roami และข้อมูลที่เกี่ยวข้อง"
          : "How to delete your roami account and associated data.",
  };
}

export default async function DeleteAccountPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <DeleteKo /> : locale === "th" ? <DeleteTh /> : <DeleteEn />}
    </div>
  );
}

function DeleteKo() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">roami 계정 삭제 안내</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2026년 6월</p>

      <div className="space-y-10">
        <Section title="방법 1 — 앱에서 직접 삭제 (즉시)">
          <ol>
            <li>roami 앱 실행 → <b>프로필</b> 탭</li>
            <li>우측 상단 <b>설정(⚙️)</b></li>
            <li><b>계정 삭제</b> 선택 후 확인</li>
          </ol>
          <p>확인 즉시 계정이 삭제됩니다.</p>
        </Section>

        <Section title="방법 2 — 이메일로 요청">
          <p>
            앱에 접근할 수 없는 경우, 가입에 사용한 이메일로{" "}
            <a href="mailto:hello@roami.kr?subject=%EA%B3%84%EC%A0%95%20%EC%82%AD%EC%A0%9C%20%EC%9A%94%EC%B2%AD" className="text-teal font-semibold">hello@roami.kr</a>
            에 &ldquo;계정 삭제 요청&rdquo;을 보내주세요. 영업일 기준 7일 이내에 처리하고 회신해 드립니다.
          </p>
        </Section>

        <Section title="삭제되는 데이터">
          <ul>
            <li>계정 정보: 이메일, 닉네임, 프로필 사진, 자기소개, 국적, 생년월일, 언어 설정</li>
            <li>위치 정보 및 관심 핀, 알림 구독</li>
            <li>푸시 알림 토큰</li>
            <li>작성한 모임과 채팅 메시지</li>
          </ul>
        </Section>

        <Section title="보관되는 데이터 (예외)">
          <ul>
            <li>공개 커뮤니티 게시글·호스트 리뷰 등 다른 이용자와 연결된 콘텐츠는 <b>익명 처리</b> 후 유지되거나 삭제됩니다.</li>
            <li>신고·차단 등 안전 관련 기록은 분쟁 대응을 위해 일정 기간 보관 후 파기됩니다.</li>
            <li>법령상 보존 의무: 계약/청약철회 기록 5년, 소비자 분쟁 기록 3년, 접속 로그 3개월.</li>
          </ul>
          <p>자세한 내용은 <a href="/ko/privacy" className="text-teal font-semibold">개인정보처리방침</a>을 참고하세요.</p>
        </Section>
      </div>
    </>
  );
}

function DeleteEn() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">Delete your roami account</h1>
      <p className="text-sm text-text-muted mb-10">Last updated: June 2026</p>

      <div className="space-y-10">
        <Section title="Option 1 — Delete in the app (instant)">
          <ol>
            <li>Open the roami app → <b>Profile</b> tab</li>
            <li>Tap <b>Settings (⚙️)</b> in the top right</li>
            <li>Choose <b>Delete account</b> and confirm</li>
          </ol>
          <p>Your account is deleted immediately upon confirmation.</p>
        </Section>

        <Section title="Option 2 — Request by email">
          <p>
            If you can no longer access the app, email{" "}
            <a href="mailto:hello@roami.kr?subject=Account%20deletion%20request" className="text-teal font-semibold">hello@roami.kr</a>{" "}
            from the address you signed up with, with the subject &ldquo;Account deletion request&rdquo;.
            We process requests within 7 business days and confirm by reply.
          </p>
        </Section>

        <Section title="Data that is deleted">
          <ul>
            <li>Account info: email, nickname, profile photos, bio, nationality, date of birth, language settings</li>
            <li>Location data, interest pins, and alert subscriptions</li>
            <li>Push notification tokens</li>
            <li>Meetups you created and your chat messages</li>
          </ul>
        </Section>

        <Section title="Data that is kept (exceptions)">
          <ul>
            <li>Public community posts and host reviews tied to other users are <b>anonymized</b> or removed.</li>
            <li>Safety records (reports, blocks) are kept for a limited period for dispute handling, then deleted.</li>
            <li>Records required by law: contract/withdrawal records 5 years, consumer dispute records 3 years, access logs 3 months.</li>
          </ul>
          <p>See our <a href="/en/privacy" className="text-teal font-semibold">Privacy Policy</a> for details.</p>
        </Section>
      </div>
    </>
  );
}

function DeleteTh() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">ลบบัญชี roami ของคุณ</h1>
      <p className="text-sm text-text-muted mb-10">อัปเดตล่าสุด: มิถุนายน 2026</p>

      <div className="space-y-10">
        <Section title="วิธีที่ 1 — ลบในแอป (ทันที)">
          <ol>
            <li>เปิดแอป roami → แท็บ <b>โปรไฟล์</b></li>
            <li>แตะ <b>ตั้งค่า (⚙️)</b> มุมขวาบน</li>
            <li>เลือก <b>ลบบัญชี</b> แล้วยืนยัน</li>
          </ol>
          <p>บัญชีจะถูกลบทันทีเมื่อยืนยัน</p>
        </Section>

        <Section title="วิธีที่ 2 — ส่งคำขอทางอีเมล">
          <p>
            หากเข้าแอปไม่ได้ ส่งอีเมลจากที่อยู่ที่ใช้สมัครไปที่{" "}
            <a href="mailto:hello@roami.kr?subject=Account%20deletion%20request" className="text-teal font-semibold">hello@roami.kr</a>{" "}
            หัวข้อ &ldquo;Account deletion request&rdquo; เราจะดำเนินการภายใน 7 วันทำการและตอบกลับยืนยัน
          </p>
        </Section>

        <Section title="ข้อมูลที่จะถูกลบ">
          <ul>
            <li>ข้อมูลบัญชี: อีเมล ชื่อเล่น รูปโปรไฟล์ คำแนะนำตัว สัญชาติ วันเกิด การตั้งค่าภาษา</li>
            <li>ข้อมูลตำแหน่ง หมุดความสนใจ และการสมัครรับการแจ้งเตือน</li>
            <li>โทเค็นการแจ้งเตือน</li>
            <li>มีตอัปที่คุณสร้างและข้อความแชทของคุณ</li>
          </ul>
        </Section>

        <Section title="ข้อมูลที่เก็บไว้ (ข้อยกเว้น)">
          <ul>
            <li>โพสต์ชุมชนสาธารณะและรีวิวโฮสต์ที่เชื่อมกับผู้ใช้อื่นจะถูก<b>ทำให้ไม่ระบุตัวตน</b>หรือลบออก</li>
            <li>บันทึกด้านความปลอดภัย (รายงาน บล็อก) เก็บไว้ระยะหนึ่งเพื่อจัดการข้อพิพาท แล้วจึงลบ</li>
            <li>บันทึกตามกฎหมาย: สัญญา/การถอนตัว 5 ปี ข้อพิพาทผู้บริโภค 3 ปี บันทึกการเข้าถึง 3 เดือน</li>
          </ul>
          <p>ดูรายละเอียดที่<a href="/th/privacy" className="text-teal font-semibold">นโยบายความเป็นส่วนตัว</a></p>
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
