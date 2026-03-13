import type { Metadata } from "next";
import FAQAccordion from "./FAQAccordion";

export const metadata: Metadata = {
  title: "자주 묻는 질문 — Roami",
  description: "Roami 앱에 대해 자주 묻는 질문과 답변입니다.",
};

const faqs = [
  {
    question: "Roami는 어떤 앱인가요?",
    answer:
      "Roami는 여행 중 동행을 찾을 수 있는 지도 기반 매칭 앱입니다. 여행지에서 함께 밥 먹을 사람, 카페 갈 사람, 한잔 할 사람, 액티비티를 함께 할 사람을 지도 위에서 바로 찾을 수 있어요. 기존의 오픈채팅방이나 커뮤니티 게시판 대신, 내 주변에서 실시간으로 동행을 찾는 새로운 방식입니다.",
  },
  {
    question: "어떤 동행을 찾을 수 있나요?",
    answer:
      "Roami에서는 네 가지 카테고리의 동행을 찾을 수 있습니다.\n\n• Eat (같이 먹기) — 현지 맛집에서 함께 식사할 동행\n• Cafe (카페 가기) — 분위기 좋은 카페에서 함께 시간을 보낼 동행\n• Drinks (한잔 하기) — 여행지의 바나 펍에서 가볍게 한잔 할 동행\n• Activity (액티비티) — 투어, 하이킹, 다이빙 등 함께 즐길 동행\n\n카테고리별로 지도 위에 표시되어, 관심 있는 모임을 바로 확인하고 참여할 수 있어요.",
  },
  {
    question: "어떻게 사용하나요?",
    answer:
      "사용법은 아주 간단합니다.\n\n1. 지도 열기 — 여행 중인 도시의 지도를 열어보세요.\n2. 동행 찾기 — 내 근처에 있는 동행 모집을 확인하세요.\n3. 참가 요청 — 마음에 드는 모임에 참가를 요청하세요.\n4. 만남 — 호스트가 승인하면 약속된 장소에서 만나세요!\n\n동행을 찾을 수도 있고, 직접 모임을 만들어 호스트가 될 수도 있어요.",
  },
  {
    question: "무료인가요?",
    answer:
      "네, Roami의 기본 기능은 무료입니다. 동행 찾기, 모임 만들기, 참가 요청 등 핵심 기능은 무료로 이용할 수 있습니다. 향후 프리미엄 기능이 추가될 수 있으나, 기본 서비스는 항상 무료로 제공될 예정입니다.",
  },
  {
    question: "안전한가요?",
    answer:
      "이용자의 안전을 최우선으로 생각합니다.\n\n• 호스트 승인 시스템 — 아무나 모임에 참여할 수 없어요. 호스트가 참가 요청을 확인하고 승인해야 합니다.\n• 프로필 필수 — 모든 이용자는 프로필을 설정해야 서비스를 이용할 수 있습니다.\n• 공공장소 권장 — 카페, 식당 등 공공장소에서의 만남을 권장합니다.\n• 신고 기능 — 부적절한 행동을 하는 이용자를 신고할 수 있습니다.\n\n안전한 동행 문화를 만들어가고 있습니다.",
  },
  {
    question: "어디서 사용할 수 있나요?",
    answer:
      "Roami는 곧 출시될 예정이며, 한국인 여행자가 많은 도시부터 순차적으로 지원할 계획입니다. 사전 등록 시 관심 도시를 알려주시면, 우선 지원 지역 선정에 반영하겠습니다. 여러분이 가장 필요로 하는 곳에서 먼저 만나볼 수 있도록 준비하고 있어요.",
  },
  {
    question: "언제 출시되나요?",
    answer:
      "현재 열심히 개발 중이며, 곧 출시될 예정입니다. 정확한 출시일이 확정되면 사전 등록하신 분들께 이메일로 가장 먼저 알려드릴게요. 페이지 하단에서 이메일을 등록하시면 출시 소식을 받아보실 수 있습니다.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">자주 묻는 질문</h1>
        <p className="text-sm text-gray-500">
          Roami에 대해 궁금한 점이 있으신가요?
        </p>
      </div>

      <FAQAccordion faqs={faqs} />

      <div className="mt-14 text-center bg-gray-50 rounded-2xl p-8">
        <p className="text-sm text-gray-500 mb-3">
          찾으시는 답변이 없나요?
        </p>
        <a
          href="mailto:hello@roami.kr"
          className="inline-block text-sm font-semibold text-teal hover:text-teal-dark transition-colors"
        >
          hello@roami.kr으로 문의하기
        </a>
      </div>
    </div>
  );
}
