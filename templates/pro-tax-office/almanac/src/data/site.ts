// ─────────────────────────────────────────────
// 사무소 기본 정보 (가상 데이터 — 실제 정보로 교체하세요)
// 화면에 보이는 업체명·업종 문구는 모두 src/data/ 에만 둡니다.
// ─────────────────────────────────────────────

export const site = {
  nameKo: "한결세무회계",
  nameShort: "한결세무회계",
  nameEn: "HANGYEOL",
  brandFull: "HANGYEOL Tax & Accounting",
  logoSub: "HANGYEOL TAX & ACCOUNTING",
  area: "광주 상무지구", // 검색 지역 키워드 — 제목·설명에 사용
  regionEn: "SANGMU · GWANGJU",
  tagline: "Steady Numbers, Clear Decisions",

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

  demoNotice: "가상 업체 데모",
  footerNotice:
    "본 사이트는 홈페이지 포트폴리오 시연을 위한 가상 사무소 데모입니다. 게시된 사례와 수치는 예시이며, 구체적인 세무 판단은 개별 사실관계 검토 후 상담을 통해 안내합니다.",
} as const;

// 업종 설정 (구조화 데이터)
export const industry = {
  slug: "pro-tax-office",
  variant: "almanac",
  schemaTypes: ["AccountingService"],
  staffTitle: "세무사",
  serviceLabel: "업무 색인",
} as const;

// 지면 상단(마스트헤드) 문구
export const masthead = {
  left: "광주 서구 상무중앙로 · 평일 09:00–18:00",
  right: "Vol. 15 — 세무 실무 15년째",
  callLabel: "062-000-0000",
} as const;

export const nav = [
  { href: "/calendar", label: "세무 연감" },
  { href: "/services", label: "업무 색인" },
  { href: "/cases", label: "사례" },
  { href: "/about", label: "사무소" },
  { href: "/contact", label: "찾아오는 길" },
] as const;

// 메인 페이지 문구
export const home = {
  kicker: "광주 상무지구 · 대표 세무사 직접 상담",
  // [보통 굵기, 굵게, 줄바꿈, 보통, 강조색]
  headline: { a: "숫자는 ", b: "정확하게,", c: "설명은 ", d: "쉽게." },
  lead: "기장대리부터 양도·상속·증여, 세무조사 대응까지. 한결세무회계는 신고서를 내기 전에 그 숫자가 왜 나왔는지 먼저 설명합니다.",
  primaryCta: "전화 상담 →",
  kakaoCta: "카카오톡 문의",
  seal: { mark: "韓", text: ["정확", "설명"] },
  sections: {
    almanac: { no: "01 · 세무 연감", title: "다음 신고 기한까지", desc: "오늘 날짜를 기준으로 가장 가까운 신고 일정을 보여 줍니다.", more: "연감 전체 보기 →" },
    index: { no: "02 · 업무 색인", title: "무엇을 도와드릴까요", desc: "여덟 가지 업무분야. 필요한 항목만 골라 읽으셔도 됩니다.", more: "업무 색인 전체 →" },
    column: { no: "03 · 대표 칼럼", title: "세무사의 한마디" },
    cases: { no: "04 · 사례", title: "이런 일을 함께했습니다", desc: "실제 고객 정보가 아닌 유형별 예시입니다.", more: "사례 더 보기 →" },
    qa: { no: "05 · 묻고 답하기", title: "자주 받는 질문" },
    visit: { no: "06 · 찾아오는 길", title: "찾아오는 길", lines: ["상무역 3번 출구에서", "걸어서 5분."] },
  },
} as const;

// 세무 연감 문구
export const almanacCopy = {
  urgent: "기한이 2주 안으로 다가왔다면 전화로 먼저 연락 주세요. 필요한 최소 자료부터 안내해 드립니다.",
  note: "일반적인 법정 기한 기준이며, 기한이 공휴일이면 다음 영업일로 미뤄집니다. 개인 상황에 따라 신고 대상과 기한이 다를 수 있습니다.",
  thisMonth: "이번 달",
  dueLabel: "기한",
} as const;

// 서브페이지 머리글
export const pages = {
  calendar: { no: "세무 연감", title: "한 해의 신고 일정", desc: "사업자와 개인이 챙겨야 할 주요 법정 기한을 달력 순서로 정리했습니다." },
  services: { no: "업무 색인", title: "무엇을 도와드릴까요", desc: "사업자 세무, 재산 세무, 조사·불복. 여덟 가지 업무를 장(章)으로 나눴습니다." },
  cases: { no: "사례", title: "이런 일을 함께했습니다", desc: "실제 고객 정보가 아닌 유형별 예시입니다. 결과는 개별 사실관계에 따라 달라집니다." },
  about: { no: "사무소", title: "신고서보다 설명서를 먼저", desc: "한결세무회계가 일하는 방식과 사람들." },
  contact: { no: "찾아오는 길", title: "상담은 전화 한 통으로 시작됩니다", desc: "상황을 듣고 필요한 자료부터 안내해 드립니다." },
} as const;

export const serviceDetailCopy = {
  forWho: "이런 분께 필요합니다",
  scope: "진행 범위",
  documents: "준비 서류",
  timing: "관련 기한",
  related: "같은 장의 다른 업무",
  ask: "이 업무로 상담하기",
} as const;

// 공유 이미지·매니페스트 색상
export const brandColors = {
  bg: "#f4efe4",
  ink: "#1d1b18",
  inkSoft: "#4a453d",
  accent: "#c2361f",
} as const;

export const aboutCopy = {
  principles: { no: "원칙", title: "세 가지 약속" },
  figures: { no: "숫자로 본 사무소", title: "한결세무회계 현황" },
  team: { no: "필진", title: "분야별로 나눠 맡습니다" },
  process: { no: "진행 방식", title: "처음 연락부터 사후 관리까지" },
} as const;

export const calendarCopy = {
  table: { no: "월별 일정", title: "열두 달 신고 일정표" },
  cols: ["월", "기한", "신고·납부", "관련 업무"],
  monthly: "매월",
} as const;

export const contactCopy = {
  channels: { no: "상담 방법", title: "편한 방법을 고르세요" },
  phone: { label: "전화", desc: "가장 빠릅니다. 기한이 임박했다면 전화를 권합니다." },
  kakao: { label: "카카오톡", title: "채널 문의", desc: "자료 사진과 함께 상황을 남겨 주세요." },
  email: { label: "이메일", desc: "서류를 보내 주실 때 편합니다." },
  visit: { no: "찾아오는 길", title: "오시는 길" },
  qa: { no: "묻고 답하기", title: "상담 전에 많이 물으세요" },
  maps: { naver: "네이버 지도", kakao: "카카오맵" },
} as const;

export const notFoundCopy = {
  title: "찾으시는 지면이 없습니다",
  desc: "주소가 바뀌었거나 삭제된 페이지입니다.",
  cta: "첫 지면으로",
} as const;

// 페이지별 검색 제목·설명 (제목 뒤에는 "| 광주 상무지구 한결세무회계" 가 붙는다)
export const seoPages = {
  calendar: { title: "세무 연감 · 신고 일정", description: "사업자와 개인이 챙겨야 할 주요 법정 기한을 달력 순서로 정리했습니다. 부가가치세, 종합소득세, 법인세, 중간예납 기한을 확인하세요." },
  services: { title: "업무 색인 · 업무분야", description: "기장대리, 종합소득세·부가세, 법인세, 양도·상속·증여세, 세무조사 대응, 경정청구까지 여덟 가지 업무분야." },
  cases: { title: "업무 사례", description: "상속세 평가, 기장 정비, 자금출처 소명, 경정청구 등 유형별 업무 사례. 결과는 개별 사실관계에 따라 달라집니다." },
  about: { title: "사무소 소개", description: "신고서보다 설명서를 먼저. 대표 세무사와 세무사 3인, 일하는 원칙과 진행 방식을 소개합니다." },
  contact: { title: "상담·찾아오는 길", description: "광주 서구 상무중앙로 한결빌딩 7층, 상무역 3번 출구 도보 5분. 전화·카카오톡으로 상담을 시작하세요." },
  serviceSuffix: "상담",
} as const;
