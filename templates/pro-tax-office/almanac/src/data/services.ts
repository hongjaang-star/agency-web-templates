// 업무분야 — 헤더 메뉴, 업무분야 페이지, 상세 페이지, sitemap 이 모두 이 파일에서 만들어집니다.

export const categories = {
  business: { ko: "사업자 세무", en: "Business" },
  property: { ko: "재산 세무", en: "Property" },
  dispute: { ko: "조사·불복", en: "Dispute" },
} as const;

export type ServiceCategory = keyof typeof categories;

export type Service = {
  slug: string;
  category: ServiceCategory;
  ko: string;
  summary: string;
  forWho: string[];
  scope: string[];
  documents: string[];
  timing: string;
};

export const services: Service[] = [
  {
    slug: "bookkeeping",
    category: "business",
    ko: "기장대리",
    summary: "매월 장부 작성부터 원천세·4대보험 신고까지 맡기고 사업에만 집중하세요.",
    forWho: ["복식부기 의무가 생긴 개인사업자", "직원을 처음 채용한 사업장", "증빙 관리가 어려운 소규모 법인"],
    scope: ["월별 장부 작성과 증빙 검토", "원천세·지급명세서 신고", "4대보험 취득·상실 신고 연계", "분기별 손익 리포트 제공"],
    documents: ["사업자등록증", "홈택스 수임 동의", "카드·통장 거래내역", "인건비 자료"],
    timing: "수임 다음 달부터 매월",
  },
  {
    slug: "income-vat",
    category: "business",
    ko: "종합소득세·부가세 신고",
    summary: "신고 기한에 쫓기지 않도록 공제 항목을 미리 점검하고 정확하게 신고합니다.",
    forWho: ["프리랜서·인적용역 사업자", "부동산 임대사업자", "복수 소득이 있는 개인"],
    scope: ["부가가치세 예정·확정 신고", "종합소득세 신고와 공제 검토", "중간예납 안내", "신고 후 납부 일정 관리"],
    documents: ["매출·매입 증빙", "사업용 카드 내역", "기부금·보험료 등 공제 자료"],
    timing: "부가세 1·7월, 종합소득세 5월",
  },
  {
    slug: "corporate",
    category: "business",
    ko: "법인 설립·법인세",
    summary: "법인 전환 검토부터 설립, 결산과 법인세 신고까지 단계별로 함께합니다.",
    forWho: ["매출 규모가 커진 개인사업자", "투자 유치를 준비하는 스타트업", "가족 법인을 검토하는 경우"],
    scope: ["법인 전환 시 세 부담 비교", "설립 절차와 정관 검토 연계", "결산·법인세 신고", "가지급금·급여 구조 점검"],
    documents: ["최근 2년 소득 자료", "주주 구성안", "사업계획 개요"],
    timing: "법인세 신고 3월 (12월 결산 법인)",
  },
  {
    slug: "transfer",
    category: "property",
    ko: "양도소득세",
    summary: "매도 전에 계산해 보면 선택지가 보입니다. 비과세 요건과 신고 시점을 함께 검토합니다.",
    forWho: ["주택·토지 매도를 앞둔 분", "일시적 2주택 상황", "상속받은 부동산을 처분하려는 분"],
    scope: ["매도 전 예상 세액 계산", "비과세·감면 요건 검토", "필요경비 증빙 정리", "예정·확정 신고 대리"],
    documents: ["매매계약서(취득·양도)", "등기부등본", "필요경비 영수증"],
    timing: "양도일이 속한 달의 말일부터 2개월 이내",
  },
  {
    slug: "inheritance",
    category: "property",
    ko: "상속세",
    summary: "상속재산 파악부터 평가, 신고까지 가족이 놓치기 쉬운 절차를 순서대로 안내합니다.",
    forWho: ["부모님 상속이 개시된 가족", "상속재산 구성이 복잡한 경우", "사전 상속 계획이 필요한 분"],
    scope: ["상속재산·채무 조회와 정리", "재산 평가 방법 검토", "공제 항목 적용 검토", "신고·분납·연부연납 안내"],
    documents: ["사망진단서", "가족관계증명서", "재산·금융 조회 결과"],
    timing: "상속개시일이 속한 달의 말일부터 6개월 이내",
  },
  {
    slug: "gift",
    category: "property",
    ko: "증여세",
    summary: "자녀 증여, 부담부 증여 등 방식에 따라 달라지는 세 부담을 비교해 드립니다.",
    forWho: ["자녀에게 자금이나 부동산을 이전하려는 분", "부부간 증여를 검토하는 분", "주식 증여를 검토하는 법인 주주"],
    scope: ["증여 방식별 세액 비교", "증여재산 평가", "신고서 작성과 대리", "자금 출처 소명 대비"],
    documents: ["증여 대상 재산 자료", "가족관계증명서", "기존 증여 이력"],
    timing: "증여일이 속한 달의 말일부터 3개월 이내",
  },
  {
    slug: "audit",
    category: "dispute",
    ko: "세무조사 대응",
    summary: "조사 통지를 받으셨다면 첫 대응이 중요합니다. 사전 준비부터 조사 종결까지 동행합니다.",
    forWho: ["세무조사 사전통지를 받은 사업자", "소명 요청을 받은 개인", "자금출처 조사 대상자"],
    scope: ["조사 범위와 쟁점 사전 분석", "소명 자료 준비", "조사 현장 대리", "결과 통지 후 대응 검토"],
    documents: ["세무조사 사전통지서", "최근 신고서", "관련 장부와 증빙"],
    timing: "통지 즉시 상담 권장",
  },
  {
    slug: "appeal",
    category: "dispute",
    ko: "경정청구·조세불복",
    summary: "과다 납부한 세금이나 부당한 처분이 있다면 기한 안에 바로잡을 수 있습니다.",
    forWho: ["공제를 누락해 세금을 더 낸 분", "고지 처분에 이의가 있는 분"],
    scope: ["경정청구 가능 여부 검토", "과세전적부심사 청구", "이의신청·심사·심판청구 대리"],
    documents: ["기존 신고서", "고지서 또는 결정 통지서", "누락 증빙"],
    timing: "경정청구는 법정신고기한부터 5년 이내",
  },
];

export const getServicesByCategory = (c: ServiceCategory) => services.filter((s) => s.category === c);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
