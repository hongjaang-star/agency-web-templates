// ─────────────────────────────────────────────
// 업체 정보와 화면 문구 — 업체명·업종 문구는 이 파일(과 catalog.ts, content.ts)에만 둡니다.
// ─────────────────────────────────────────────

export const site = {
  nameKo: "세로결정밀",
  nameEn: "SEROGYEOL PRECISION",
  tagline: "도면의 선 그대로, 부품이 됩니다.",
  description: "알루미늄 압출과 CNC 가공으로 방열판, 프로파일, 하우징, 정밀 브래킷을 만드는 가상 제조사 데모. 부품을 선화와 도면 표제란으로 보여 주고, 적용 분야별로 맞는 부품과 공정을 안내합니다.",
  demoNotice: "가상 업체 데모 · 제품·인증·수치는 예시입니다",
  founded: "1998",
  phone: "000-0000-0000",
  email: "rfq@example.co.kr",
  hours: "평일 08:30–17:30",
  address: "경기도 ○○시 산업단지로 00 (가상 주소)",
  postal: { addressCountry: "KR", addressRegion: "경기도", addressLocality: "○○시", streetAddress: "산업단지로 00" },
  nav: [
    { href: "/fields", label: "적용 분야" },
    { href: "/parts", label: "부품 도면" },
    { href: "/process", label: "공정" },
    { href: "/about", label: "회사" },
  ],
};

export const colors = { bg: "#0f1714", panel: "#16211d", text: "#e6ece8", lime: "#c6f432" };

export const homeCopy = {
  kicker: "Aluminum parts, drawn first",
  title: ["도면의 선 그대로,", "부품", "이 됩니다."],
  lead: "압출과 CNC 가공으로 방열판, 프로파일, 하우징, 브래킷을 만듭니다. 쓰실 분야를 고르면 맞는 부품의 선화와 사양을 한 장씩 보여 드립니다.",
  fieldsTitle: "어디에 쓰실 건가요?",
  sheetsTitle: "부품 도면 목록",
  rfqTitle: "견적 전에 이것만 체크해 주세요",
};
