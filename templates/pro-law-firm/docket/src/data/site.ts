// ─────────────────────────────────────────────
// 사무소 기본 정보 (가상 데이터 — 실제 정보로 교체하세요)
// 화면에 보이는 업체명·업종 문구는 모두 src/data/ 에만 둡니다.
// 변호사 광고 규정: "최고·유일", 승소율, "무료 상담", 결과 단정 표현을 쓰지 않습니다.
// ─────────────────────────────────────────────

export const site = {
  nameKo: "담연 법률사무소",
  nameShort: "담연 법률사무소",
  nameMark: "담연",
  nameEn: "DAMYEON",
  brandFull: "DAMYEON Law Office",
  logoSub: "LAW OFFICE",
  area: "대전 둔산동", // 검색 지역 키워드 — 제목·설명에 사용
  regionEn: "DUNSAN · DAEJEON",
  tagline: "Where you are, what comes next",

  seoTitle: "대전 변호사 담연 법률사무소 | 이혼·형사·상속·보증금 소송 상담",
  description:
    "대전지방법원 앞 담연 법률사무소. 이혼·가사, 상속, 형사, 민사·손해배상, 전세보증금, 계약, 노동, 행정 사건을 변호사 3인이 맡습니다. 사건이 어떤 순서로 흘러가는지부터 설명합니다.",

  phone: "042-000-0000",
  phoneHref: "tel:0420000000",
  email: "contact@example.com",
  address: "대전광역시 서구 둔산중로 000, 담연빌딩 5층",
  walk: "대전지방법원 정문에서 도보 3분",
  parking: "건물 지하주차장 (상담 고객 1시간)",

  postal: {
    streetAddress: "둔산중로 000, 담연빌딩 5층",
    addressLocality: "서구",
    addressRegion: "대전광역시",
    postalCode: "35200",
    addressCountry: "KR",
  },
  openingHours: [{ days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" }],
  hours: [
    { day: "평일", time: "09:00 – 18:00" },
    { day: "야간·주말", time: "사전 예약 상담" },
  ],

  links: {
    kakao: "https://pf.kakao.com/",
    naverMap: "https://map.naver.com/p/search/%EB%8C%80%EC%A0%84%EC%A7%80%EB%B0%A9%EB%B2%95%EC%9B%90",
    kakaoMap: "https://map.kakao.com/?q=%EB%8C%80%EC%A0%84%EC%A7%80%EB%B0%A9%EB%B2%95%EC%9B%90",
    blog: "https://blog.naver.com/",
  },

  // 오시는 길 네이버 지도 (NAVER Maps API v3)
  // ncpKeyId: 네이버 클라우드 플랫폼 > Maps 에서 발급한 Client ID. "Web 서비스 URL" 에 배포 도메인
  //           (예: https://hongjaang-star.github.io) 을 등록해야 지도가 뜬다. 비어 있으면 대체 카드를 보여 준다.
  map: {
    ncpKeyId: "",
    name: "대전지방법원",
    address: "대전광역시 서구 둔산중로78번길 45",
    lat: 36.3546874,
    lng: 127.3884765,
    zoom: 16,
    naverUrl: "https://map.naver.com/p/search/%EB%8C%80%EC%A0%84%EC%A7%80%EB%B0%A9%EB%B2%95%EC%9B%90",
  },

  // 푸터 SNS — 데모는 각 서비스 대표 주소. 납품 시 사무소 채널 주소로 교체
  sns: [
    { key: "kakao", label: "카카오톡 채널", href: "https://pf.kakao.com/" },
    { key: "instagram", label: "인스타그램", href: "https://www.instagram.com/" },
    { key: "youtube", label: "유튜브", href: "https://www.youtube.com/" },
    { key: "blog", label: "네이버 블로그", href: "https://blog.naver.com/" },
  ],

  business: { ceo: "윤서진", registration: "000-00-00000", adResponsible: "윤서진" },

  demoNotice: "가상 업체 데모",
  footerNotice:
    "본 사이트는 홈페이지 포트폴리오 시연을 위한 가상 법률사무소 데모입니다. 사례는 유형별 예시이며 결과는 사안의 사실관계와 증거에 따라 달라집니다. 구체적인 법률 판단은 상담을 통해 안내합니다.",
} as const;

// 업종 설정 (구조화 데이터)
export const industry = {
  slug: "pro-law-firm",
  variant: "docket",
  schemaTypes: ["LegalService"],
  staffTitle: "변호사",
} as const;

export const nav = [
  { href: "/areas", label: "업무분야" },
  { href: "/flow", label: "사건 흐름" },
  { href: "/attorneys", label: "변호사" },
  { href: "/cases", label: "사례" },
  { href: "/contact", label: "오시는 길" },
] as const;

export const home = {
  label: "대전지방법원 앞 · 변호사 3인",
  headline: { a: "지금 어디쯤인지", b: "먼저 ", c: "알려드립니다." },
  lead: "소장을 받았을 때, 수사기관 연락을 받았을 때, 이혼을 결심했을 때. 담연 법률사무소는 앞으로 무슨 일이 어떤 순서로 일어나는지부터 설명합니다.",
  primaryCta: "전화 상담 예약 →",
  secondaryCta: "사건 흐름 보기",
  sections: {
    areas: { eyebrow: "AREAS OF PRACTICE", title: "어떤 일을 겪고 계신가요", more: "업무분야 전체 보기 →" },
    flow: { eyebrow: "CASE FLOW", title: "사건은 이렇게 흘러갑니다", lead: "업무분야를 고르고 단계를 누르면, 그 단계에서 일어나는 일과 의뢰인이 준비할 것을 보여 드립니다.", more: "단계별 자세히 보기 →" },
    attorneys: { eyebrow: "ATTORNEYS", title: "사건을 맡는 사람", more: "변호사 소개 →" },
    cases: { eyebrow: "CASES", title: "함께 정리한 일들", more: "사례 더 보기 →" },
    faq: { eyebrow: "BEFORE YOU CALL", title: "상담 전에 많이 물으세요" },
    visit: { eyebrow: "VISIT", lines: ["법원 정문에서", "걸어서 3분."] },
  },
} as const;

export const flowCopy = {
  stepLabel: "STEP",
  periodLabel: "일반적인 기간",
  prepareLabel: "이 단계에서 준비할 것",
  note: "기간은 일반적인 예시이며 사건의 내용, 법원 사정, 상대방 대응에 따라 크게 달라질 수 있습니다.",
  tabsLabel: "업무분야",
  procedureLabel: "절차",
} as const;

// 사건 흐름 페이지 — STEP BY STEP 영역의 왼쪽 바로가기
export const flowPageCopy = {
  eyebrow: "STEP BY STEP",
  title: "분야별 단계 한눈에",
  navLabel: "업무분야 바로가기",
  stepsUnit: "단계",
  areaLink: "업무분야 자세히 →",
} as const;

// 사례 검색·분류
export const casesCopy = {
  searchLabel: "사례 검색",
  searchPlaceholder: "예: 보증금, 해고, 유류분",
  filterLabel: "업무분야로 보기",
  all: "전체",
  keywordsLabel: "키워드",
  resultSuffix: "건의 사례",
  empty: "찾는 사례가 없습니다. 다른 단어로 검색하거나 전체를 눌러 주세요.",
  reset: "전체 보기",
  areaLink: "업무 보기 →",
} as const;

export const pages = {
  areas: { label: "AREAS OF PRACTICE", title: "어떤 일을 겪고 계신가요", lead: "여덟 가지 업무분야. 지금 겪는 일과 가장 가까운 항목을 고르면 진행 순서와 준비할 자료를 볼 수 있습니다." },
  flow: { label: "CASE FLOW", title: "사건은 이렇게 흘러갑니다", lead: "여덟 가지 업무분야마다 처음 상담부터 끝날 때까지 어떤 단계를 거치는지 정리했습니다." },
  attorneys: { label: "ATTORNEYS", title: "사건을 맡는 사람", lead: "상담한 변호사가 사건 끝까지 직접 맡습니다." },
  cases: { label: "CASES", title: "함께 정리한 일들", lead: "업무분야와 키워드로 골라 보거나 검색해 보세요. 실제 의뢰인 정보가 아닌 유형별 예시이며, 결과는 사안의 사실관계와 증거에 따라 달라집니다." },
  contact: { label: "CONTACT", title: "법원 앞에서 기다립니다", lead: "전화로 상담 시간을 먼저 잡아 주세요. 받은 서류가 있다면 함께 가져오시면 됩니다." },
} as const;

export const areaDetailCopy = {
  situations: "이런 일이라면",
  scope: "담연이 하는 일",
  documents: "가져오시면 좋은 자료",
  deadline: "놓치기 쉬운 기한",
  flow: "관련 사건 흐름",
  lawyer: "맡는 변호사",
  ask: "이 일로 상담 예약",
  related: "다른 업무분야",
} as const;

export const attorneysCopy = {
  principles: { eyebrow: "HOW WE WORK", title: "일하는 방식" },
  team: { eyebrow: "ATTORNEYS", title: "변호사 3인" },
  career: "경력",
  focus: "주요 업무",
} as const;

export const contactCopy = {
  channels: { eyebrow: "HOW TO REACH", title: "연락 방법" },
  phone: { label: "전화", desc: "상담 시간을 가장 빨리 잡을 수 있습니다." },
  kakao: { label: "카카오톡", title: "채널 문의", desc: "받은 서류 사진과 함께 간단히 남겨 주세요." },
  email: { label: "이메일", desc: "서류를 미리 보내 주실 때 편합니다." },
  bring: { eyebrow: "WHAT TO BRING", title: "상담 때 가져오실 것", items: ["받은 서류 원본 또는 사진 (소장, 출석요구서, 내용증명, 판결문 등)", "계약서·차용증·영수증 등 근거 자료", "주고받은 메시지와 통화 기록", "일이 일어난 순서를 적은 메모 (날짜·장소·사람)"] },
  visit: { eyebrow: "VISIT" },
  maps: { naver: "네이버 지도", kakao: "카카오맵" },
  map: { title: "네이버 지도", label: "기준 위치", note: "사무소는 법원 정문에서 걸어서 3분 거리입니다.", open: "네이버 지도에서 크게 보기", fallback: "지도를 불러오지 못했습니다. 아래 버튼으로 네이버 지도에서 확인해 주세요." },
  labels: { address: "주소", hours: "상담 시간", walk: "찾아오는 길", parking: "주차" },
} as const;

export const notFoundCopy = { title: "찾으시는 페이지가 없습니다", desc: "주소가 바뀌었거나 삭제된 페이지입니다.", cta: "처음으로" } as const;

// 페이지별 검색 제목·설명 (제목 뒤에는 "| 대전 둔산동 담연 법률사무소" 가 붙는다)
export const seoPages = {
  areas: { title: "업무분야", description: "이혼·가사, 상속·유류분, 형사, 민사·손해배상, 부동산·임대차, 기업 계약, 노동, 행정. 대전지방법원 앞 변호사 3인의 업무분야." },
  flow: { title: "사건 흐름 · 분야별 절차", description: "이혼, 상속·유류분, 형사, 민사, 전세보증금, 계약 분쟁, 부당해고, 영업정지까지 여덟 가지 절차의 단계와 준비할 자료, 일반적인 기간을 정리했습니다." },
  attorneys: { title: "변호사 소개", description: "대표 변호사 윤서진(이혼·가사, 상속), 강도윤(형사, 행정), 민하린(민사, 부동산, 기업 계약). 상담한 변호사가 사건을 끝까지 맡습니다." },
  cases: { title: "유형별 사례", description: "전세보증금 반환, 재판이혼, 수사 단계 조력, 유류분, 부당해고, 영업정지 등 유형별 사례. 결과는 사실관계에 따라 달라집니다." },
  contact: { title: "상담 예약·오시는 길", description: "대전광역시 서구 둔산중로, 대전지방법원 정문에서 도보 3분. 전화·카카오톡으로 상담 시간을 예약하세요." },
  areaSuffix: "변호사 상담",
} as const;

export const brandColors = {
  bg: "#f5efe6",
  ink: "#151313",
  inkSoft: "#4b4440",
  accent: "#6e1423",
} as const;
