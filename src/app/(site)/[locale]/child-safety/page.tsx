import { getLocale } from "next-intl/server";
import { localeAlternates } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  return {
    alternates: localeAlternates(locale, "/child-safety"),
    title:
      locale === "ko"
        ? "아동 안전 표준 — roami"
        : locale === "th"
          ? "มาตรฐานความปลอดภัยของเด็ก — roami"
          : "Child Safety Standards — roami",
    description:
      locale === "ko"
        ? "아동 성적 학대 및 착취(CSAE) 방지에 대한 roami의 공개 표준입니다."
        : locale === "th"
          ? "มาตรฐานของ roami ในการป้องกันการล่วงละเมิดและแสวงหาประโยชน์ทางเพศจากเด็ก (CSAE)"
          : "roami's published standards against child sexual abuse and exploitation (CSAE).",
  };
}

export default async function ChildSafetyPage() {
  const locale = await getLocale();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {locale === "ko" ? <Ko /> : locale === "th" ? <Th /> : <En />}
    </div>
  );
}

function Ko() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">roami 아동 안전 표준</h1>
      <p className="text-sm text-text-muted mb-10">최종 업데이트: 2026년 6월 · 아동 성적 학대 및 착취(CSAE) 방지 표준</p>

      <div className="space-y-10">
        <Section title="1. 무관용 원칙">
          <p>
            roami는 아동 성적 학대 및 착취(CSAE)와 아동 성적 학대 자료(CSAM)에 대해 <b>무관용 원칙</b>을 적용합니다.
            roami는 만 14세 미만의 가입을 허용하지 않으며, 미성년자를 대상으로 하거나 미성년자가 연루된
            어떠한 형태의 성적 콘텐츠·행위도 엄격히 금지합니다.
          </p>
        </Section>

        <Section title="2. 금지 행위">
          <ul>
            <li>CSAM의 제작, 공유, 요청, 소지 또는 링크 게시</li>
            <li>미성년자를 성적으로 대상화하는 모든 콘텐츠 및 대화</li>
            <li>그루밍 — 성적 목적으로 미성년자에게 접근하거나 신뢰를 쌓는 행위</li>
            <li>미성년자와의 만남을 성적 목적으로 주선하거나 시도하는 행위</li>
            <li>미성년자 대상 협박, 갈취(sextortion), 인신매매 관련 일체 행위</li>
          </ul>
        </Section>

        <Section title="3. 신고 수단 (인앱)">
          <p>
            모든 이용자는 앱 내에서 <b>이용자, 채팅 메시지, 모임, 게시글을 직접 신고</b>할 수 있고
            우려되는 이용자를 차단할 수 있습니다. 아동 안전 관련 신고는 최우선으로 검토합니다.
            이메일 신고도 가능합니다: <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>
          </p>
        </Section>

        <Section title="4. 조치 및 당국 신고">
          <ul>
            <li>CSAE 위반이 확인되면 해당 콘텐츠를 즉시 제거하고 계정을 <b>영구 정지</b>합니다.</li>
            <li>확인된 CSAM 및 관련 증거는 법령에 따라 보존하며, <b>관할 수사기관 및 관련 당국</b>(대한민국 경찰청,
              미국 NCMEC CyberTipline, 현지 관할 기관 등)에 신고합니다.</li>
            <li>관련 법령 및 수사기관의 적법한 요청에 협조합니다.</li>
          </ul>
        </Section>

        <Section title="5. 아동 안전 담당 연락처">
          <p>
            아동 안전 관련 문의 및 신고: <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>
            <br />본 연락처는 roami의 CSAM 방지 정책 및 준수 사항에 대해 답변할 수 있는 지정 담당자입니다.
          </p>
        </Section>
      </div>
    </>
  );
}

function En() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">roami Child Safety Standards</h1>
      <p className="text-sm text-text-muted mb-10">Last updated: June 2026 · Standards against child sexual abuse and exploitation (CSAE)</p>

      <div className="space-y-10">
        <Section title="1. Zero tolerance">
          <p>
            roami has a <b>zero-tolerance policy</b> toward child sexual abuse and exploitation (CSAE) and child
            sexual abuse material (CSAM). roami does not allow users under 14, and strictly prohibits any sexual
            content or conduct targeting or involving minors.
          </p>
        </Section>

        <Section title="2. Prohibited conduct">
          <ul>
            <li>Creating, sharing, requesting, possessing, or linking to CSAM</li>
            <li>Any content or conversation that sexualizes minors</li>
            <li>Grooming — approaching or building trust with a minor for sexual purposes</li>
            <li>Arranging or attempting to arrange meetings with minors for sexual purposes</li>
            <li>Sextortion, threats, or any conduct related to trafficking of minors</li>
          </ul>
        </Section>

        <Section title="3. In-app reporting">
          <p>
            Every user can <b>report users, chat messages, meetups, and posts directly in the app</b>, and block
            anyone of concern. Child-safety reports are reviewed with the highest priority. Reports can also be
            sent to <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>.
          </p>
        </Section>

        <Section title="4. Enforcement and reporting to authorities">
          <ul>
            <li>Confirmed CSAE violations result in immediate content removal and a <b>permanent ban</b>.</li>
            <li>Confirmed CSAM and related evidence are preserved as required by law and <b>reported to the
              relevant authorities</b> (NCMEC CyberTipline in the US, the Korean National Police Agency, and
              applicable regional authorities).</li>
            <li>We cooperate with lawful requests from law enforcement.</li>
          </ul>
        </Section>

        <Section title="5. Child safety point of contact">
          <p>
            Child safety inquiries and reports: <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>
            <br />This contact is roami&apos;s designated point of contact, able to speak to our CSAM prevention
            practices and compliance.
          </p>
        </Section>
      </div>
    </>
  );
}

function Th() {
  return (
    <>
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">มาตรฐานความปลอดภัยของเด็ก — roami</h1>
      <p className="text-sm text-text-muted mb-10">อัปเดตล่าสุด: มิถุนายน 2026 · มาตรฐานป้องกันการล่วงละเมิดและแสวงหาประโยชน์ทางเพศจากเด็ก (CSAE)</p>

      <div className="space-y-10">
        <Section title="1. ไม่ยอมรับโดยเด็ดขาด">
          <p>
            roami มีนโยบาย<b>ไม่ยอมรับโดยเด็ดขาด</b>ต่อการล่วงละเมิดและแสวงหาประโยชน์ทางเพศจากเด็ก (CSAE)
            และสื่อการล่วงละเมิดทางเพศเด็ก (CSAM) roami ไม่อนุญาตให้ผู้ที่อายุต่ำกว่า 14 ปีใช้งาน
            และห้ามเนื้อหาหรือพฤติกรรมทางเพศใดๆ ที่เกี่ยวข้องกับผู้เยาว์โดยเด็ดขาด
          </p>
        </Section>

        <Section title="2. พฤติกรรมต้องห้าม">
          <ul>
            <li>การสร้าง แชร์ ร้องขอ ครอบครอง หรือลิงก์ไปยัง CSAM</li>
            <li>เนื้อหาหรือบทสนทนาที่ทำให้ผู้เยาว์เป็นวัตถุทางเพศ</li>
            <li>กรูมมิง — การเข้าหาหรือสร้างความไว้วางใจกับผู้เยาว์เพื่อวัตถุประสงค์ทางเพศ</li>
            <li>การนัดพบหรือพยายามนัดพบผู้เยาว์เพื่อวัตถุประสงค์ทางเพศ</li>
            <li>การข่มขู่ทางเพศ (sextortion) หรือการกระทำใดๆ ที่เกี่ยวกับการค้ามนุษย์เด็ก</li>
          </ul>
        </Section>

        <Section title="3. การรายงานในแอป">
          <p>
            ผู้ใช้ทุกคนสามารถ<b>รายงานผู้ใช้ ข้อความแชท มีตอัป และโพสต์ได้โดยตรงในแอป</b> และบล็อกผู้ที่น่ากังวลได้
            รายงานด้านความปลอดภัยของเด็กจะได้รับการตรวจสอบเป็นลำดับแรกสุด หรือส่งอีเมลที่{" "}
            <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>
          </p>
        </Section>

        <Section title="4. การบังคับใช้และการรายงานต่อหน่วยงาน">
          <ul>
            <li>การฝ่าฝืน CSAE ที่ได้รับการยืนยันจะถูกลบเนื้อหาทันทีและ<b>แบนถาวร</b></li>
            <li>CSAM ที่ยืนยันแล้วและหลักฐานจะถูกเก็บรักษาตามกฎหมาย และ<b>รายงานต่อหน่วยงานที่เกี่ยวข้อง</b>
              (NCMEC ในสหรัฐฯ สำนักงานตำรวจแห่งชาติเกาหลี และหน่วยงานในภูมิภาค เช่น TICAC ในประเทศไทย)</li>
            <li>เราให้ความร่วมมือกับคำขอที่ชอบด้วยกฎหมายจากหน่วยงานบังคับใช้กฎหมาย</li>
          </ul>
        </Section>

        <Section title="5. ผู้ติดต่อด้านความปลอดภัยของเด็ก">
          <p>
            สอบถามและรายงานด้านความปลอดภัยของเด็ก: <a href="mailto:hello@roami.kr" className="text-teal font-semibold">hello@roami.kr</a>
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
