// 딥링크 메커니즘 실측 하니스 (일회용 — 실기기 QA 전용, 어디서도 링크 안 됨).
// 목적: iOS UL(cross-host) / x-safari 탈출 / Smart App Banner / scheme / intent 가
//       각 브라우저(사파리/크롬/카톡인앱/인스타인앱)에서 실제로 앱을 여는지 판가름.
// 사용법: ?id={진짜모임id} 붙여서 열기. 테스트 끝나면 이 폴더 삭제.
import type { Metadata } from "next";

const APP_ID = "6760629019"; // App Store: roami: travel meetups (kr.roami.app)
const WWW = "https://www.roami.kr";

type SP = { searchParams: Promise<{ id?: string }> };

export async function generateMetadata({ searchParams }: SP): Promise<Metadata> {
  const id = (await searchParams).id || "TESTID";
  return {
    title: "deeplink probe",
    robots: { index: false },
    // ③ Smart App Banner — 사파리에서만 상단 회색 띠. app-argument는 앱이 파싱하는 /m/{id}.
    other: { "apple-itunes-app": `app-id=${APP_ID}, app-argument=${WWW}/m/${id}` },
  };
}

const box: React.CSSProperties = {
  display: "block",
  padding: "18px 16px",
  margin: "10px 0",
  borderRadius: 12,
  background: "#2CB5AE",
  color: "#fff",
  fontSize: 17,
  fontWeight: 700,
  textAlign: "center",
  textDecoration: "none",
};
const note: React.CSSProperties = { fontSize: 13, color: "#666", margin: "2px 0 14px" };

export default async function LbTest({ searchParams }: SP) {
  const id = (await searchParams).id || "TESTID";
  const mUrl = `${WWW}/m/${id}`;
  const intent = `intent://m/${id}#Intent;scheme=roami;package=kr.roami.app;S.browser_fallback_url=${encodeURIComponent(mUrl)};end`;

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: "24px 18px", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 20, fontWeight: 800 }}>딥링크 실측</h1>
      <p style={note}>
        meetup id = <b>{id}</b> {id === "TESTID" && "(← ?id=진짜모임id 붙여서 다시 열어!)"}
      </p>
      <p style={note}>
        이 페이지 호스트가 <b>vercel.app</b>이면 www랑 다른 호스트라 ②번이 cross-host 테스트로 유효.
      </p>

      <a href={mUrl} style={box}>② https www/m/ → 앱?</a>
      <p style={note}>
        <b>사파리·크롬에서 탭</b> → 앱이 그 모임으로 열리면 = cross-host UL ✅ (/open도 될 것).
        그냥 페이지로 가면 ❌.
      </p>

      <a href={`x-safari-https://www.roami.kr/m/${id}`} style={{ ...box, background: "#E07A45" }}>
        ① x-safari → 사파리로 탈출?
      </a>
      <p style={note}>
        <b>인스타/카톡 인앱브라우저에서 이 페이지 열고 탭</b> → 사파리가 뜨면 = 탈출 ✅. iOS16은 ❌ 예상.
      </p>

      <a href={`roami://m/${id}`} style={{ ...box, background: "#5C7CE6" }}>④ roami://m/ → 앱? (scheme)</a>
      <p style={note}>커스텀 스킴 직접 테스트. iOS는 미등록이라 ❌ 예상, Android는 ✅ 예상.</p>

      <a href={intent} style={{ ...box, background: "#4CAF7A" }}>⑤ intent:// → 앱? (Android)</a>
      <p style={note}>Android 전용. 인앱/크롬에서 앱 열리나. 미설치면 베타 페이지로 fallback.</p>

      <a href={`kakaotalk://web/openExternal?url=${encodeURIComponent(mUrl)}`} style={{ ...box, background: "#F7C600", color: "#3b2f00" }}>
        ⑥ 카톡 탈출 (카톡 인앱에서만)
      </a>
      <p style={note}>카톡 인앱브라우저에서 이 페이지 열고 탭 → 외부 브라우저 뜨나.</p>

      <hr style={{ margin: "20px 0", border: 0, borderTop: "1px solid #eee" }} />
      <p style={{ fontSize: 14, fontWeight: 700 }}>③ Smart App Banner (메타로 자동)</p>
      <p style={note}>
        <b>사파리에서</b> 이 페이지 맨 위에 회색 띠 뜨나? 띠의 ‘열기’ 누르면 앱이 그 모임으로 가나?
        (크롬·인앱브라우저엔 안 뜸 = 정상)
      </p>
    </main>
  );
}
