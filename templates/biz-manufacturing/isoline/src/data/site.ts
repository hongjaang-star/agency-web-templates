// ─────────────────────────────────────────────
// 업체 정보와 화면 문구 — 업체명·업종 문구는 이 파일(과 catalog.ts, content.ts)에만 둡니다.
// ─────────────────────────────────────────────

export const site = {
  nameKo: "세로결정밀",
  nameEn: "SEROGYEOL PRECISION",
  tagline: "도면의 선 그대로, 부품이 됩니다.",
  description: "알루미늄 압출·CNC 가공의 가상 제조사 데모. 제품 사진과 사양, 적용 분야별 부품 탐색, 제작·검사 기준과 견적 준비 메모를 제공합니다.",
  demoNotice: "가상 업체 데모 · AI 제작 이미지 · 제품·인증·수치는 예시입니다",
  founded: "1998",
  phone: "000-0000-0000",
  email: "rfq@example.co.kr",
  hours: "평일 08:30–17:30",
  address: "경기도 시흥시 정왕동 시화국가산업단지 일대 (데모 위치)",
  postal: { addressCountry: "KR", addressRegion: "경기도", addressLocality: "시흥시", streetAddress: "시화국가산업단지 일대 (데모 위치)" },
  nav: [
    { href: "/parts", label: "제품 카탈로그" },
    { href: "/fields", label: "적용 분야" },
    { href: "/process", label: "제작·검사" },
    { href: "/about", label: "회사 소개" },
  ],
};

export const colors = { bg: "#0f1714", panel: "#16211d", text: "#e6ece8", lime: "#c6f432" };

export const homeCopy = {
  kicker: "Aluminum parts, drawn first",
  title: ["도면의 선 그대로,", "부품", "이 됩니다."],
  lead: "열을 다루는 방열판부터 구조를 지지하는 정밀 브래킷까지. 알루미늄 압출과 CNC 가공으로 설계의 의도를 부품으로 옮깁니다.",
  fieldsTitle: "어디에 쓰실 건가요?",
  sheetsTitle: "제품 카테고리",
  rfqTitle: "견적 전에 이것만 체크해 주세요",
};
