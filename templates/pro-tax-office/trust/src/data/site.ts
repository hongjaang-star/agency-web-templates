// ─────────────────────────────────────────────
// 사무소 기본 정보 (가상 데이터 — 실제 정보로 교체하세요)
// ─────────────────────────────────────────────

export const site = {
  nameEn: "HANGYEOL",
  nameKo: "한결세무회계",
  nameShort: "한결세무회계",
  area: "광주 상무지구", // 검색 지역 키워드 — 제목·설명에 사용
  tagline: "Steady Numbers, Clear Decisions",
  logoSub: "TAX & ACCOUNTING",
  brandFull: "HANGYEOL Tax & Accounting",
  regionEn: "SANGMU · GWANGJU",
  footerIntro: ["숫자는 정확하게, 설명은 쉽게.", "대표 세무사가 직접 상담하고 끝까지 책임집니다."],

  seoTitle: "광주 세무사 한결세무회계 | 기장대리·종합소득세·상속증여 상담",
  description:
    "광주 상무지구 한결세무회계. 개인사업자·법인 기장대리, 종합소득세·부가세 신고, 양도·상속·증여세, 세무조사 대응까지 대표 세무사가 직접 상담합니다.",

  phone: "062-000-0000",
  phoneHref: "tel:0620000000",
  email: "contact@example.com",
  address: "광주광역시 서구 상무중앙로 000, 한결빌딩 7층",
  subway: "광주 도시철도 1호선 상무역 3번 출구 도보 5분",
  parking: "건물 지하주차장 1시간 무료 (상담 고객)",

  postal: {
    streetAddress: "상무중앙로 000, 한결빌딩 7층",
    addressLocality: "서구",
    addressRegion: "광주광역시",
    postalCode: "61900",
    addressCountry: "KR",
  },
  openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
  hours: [
    { day: "평일", time: "09:00 – 18:00" },
    { day: "점심시간", time: "12:00 – 13:00" },
    { day: "토·일·공휴일", time: "휴무 (신고 기간 사전 예약 상담)" },
  ],

  links: {
    kakao: "https://pf.kakao.com/",
    naverMap: "https://map.naver.com/p/search/%EC%83%81%EB%AC%B4%EC%97%AD",
    kakaoMap: "https://map.kakao.com/?q=%EC%83%81%EB%AC%B4%EC%97%AD",
    blog: "https://blog.naver.com/",
  },

  business: { ceo: "김한결", registration: "000-00-00000" },

  // 공통 컴포넌트 문구 (헤더·푸터·배너·CTA)
  hoursTitle: "Office Hours",
  cta: { eyebrow: "Consultation", text: "세금 고민, 첫 상담에서 방향부터 잡아 드립니다", label: "상담 안내 보기", href: "/contact" },
  banner: { lead: "Notice", text: "11월 종합소득세 중간예납 안내 · 사업자 상담 예약 받습니다", href: "/contact" },
  footerNotice:
    "본 사이트는 홈페이지 템플릿 시연을 위한 가상 사무소 데모입니다. 게시된 사례와 수치는 예시이며, 구체적인 세무 판단은 개별 사실관계 검토 후 상담을 통해 안내합니다.",
} as const;

// ─────────────────────────────────────────────
// 업종 설정
// ─────────────────────────────────────────────
export const industry = {
  slug: "pro-tax-office",
  variant: "trust",
  schemaTypes: ["AccountingService"], // schema.org 타입
  staffTitle: "세무사",
  serviceLabel: "업무분야", // 메뉴·브레드크럼에 쓰는 서비스 명칭
} as const;

// 메인 페이지 섹션 순서 — 키는 src/components/blocks/index.ts 참고
export const homeSections = ["hero", "stats", "services", "clients", "process", "team", "cases", "faq", "visit"] as const;

export const nav = [
  { href: "/about", label: "사무소 소개", en: "About" },
  { href: "/services", label: "업무분야", en: "Services", hasMenu: true },
  { href: "/cases", label: "업무 사례", en: "Cases" },
  { href: "/contact", label: "상담·오시는 길", en: "Contact" },
] as const;

// 모바일 하단·데스크톱 우측 고정 상담 버튼
export const channels = [
  { href: site.links.kakao, label: "카톡상담", icon: "message", external: true },
  { href: "/contact", label: "상담안내", icon: "calendar", external: false },
  { href: site.phoneHref, label: "전화문의", icon: "phone", external: false },
] as const;

// globals.css @theme 과 같은 값 — 공유 이미지(og.png), 매니페스트, 브라우저 테마색에 사용
export const brandColors = {
  bg: "#f7f7f5",
  ink: "#13233d",
  inkSoft: "#4a5568",
  accent: "#a8834a",
  accentDeep: "#7a5c2a",
} as const;
