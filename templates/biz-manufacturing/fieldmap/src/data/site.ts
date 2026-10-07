// ─────────────────────────────────────────────
// 업체 정보와 화면 문구 — 업체명·업종 문구는 이 파일(과 catalog.ts, content.ts)에만 둡니다.
// ─────────────────────────────────────────────

export const site = {
  nameKo: "세로결정밀",
  nameEn: "SEROGYEOL PRECISION",
  tagline: "어디에 쓰실 부품인가요?",
  description: "알루미늄 압출과 CNC 가공으로 방열판, 프로파일, 하우징, 정밀 브래킷을 만드는 가상 제조사 데모. 적용 분야를 고르면 맞는 제품과 사양, 최소 주문 수량, 납기를 바로 확인할 수 있습니다.",
  demoNotice: "가상 업체 데모 · 제품·인증·납품 정보는 예시입니다",
  founded: "1998",
  phone: "000-0000-0000",
  email: "quote@example.co.kr",
  hours: "평일 08:30–17:30 (점심 12:00–13:00)",
  address: "경기도 ○○시 산업단지로 00 (가상 주소)",
  postal: { addressCountry: "KR", addressRegion: "경기도", addressLocality: "○○시", streetAddress: "산업단지로 00" },
  nav: [
    { href: "/products", label: "제품 찾기" },
    { href: "/applications", label: "적용 분야" },
    { href: "/capability", label: "설비·공정" },
    { href: "/company", label: "회사" },
  ],
};

export const brandColors = { ink: "#1f2326", paper: "#f4f5f6", hot: "#ff5a1f" };

export const homeCopy = {
  eyebrow: "ALUMINUM EXTRUSION · CNC · SINCE 1998 (가상)",
  title: "어디에 쓰실 부품인가요?",
  lead: "적용 분야를 고르면 맞는 알루미늄 부품과 사양, 최소 주문 수량, 납기가 정리됩니다. 도면이 있으면 견적 요청에 함께 보내 주세요.",
  allLabel: "전체 제품 보기",
  allNote: "분야 상관없이",
  featuredTitle: "자주 찾는 모델",
  categoriesTitle: "제품 카테고리",
  quoteTitle: "도면이 있다면, 3일 안에 견적을 드립니다.",
  quoteLead: "수량·납기·용도만 알려 주시면 담당 엔지니어가 가공 방법과 단가를 정리해 회신합니다. (데모 문구)",
};
