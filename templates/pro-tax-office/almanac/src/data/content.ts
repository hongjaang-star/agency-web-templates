// 메인·서브페이지 콘텐츠 (가상 데이터)

export const stats = [
  { value: "15년", label: "세무 실무 경력" },
  { value: "320+", label: "기장 수임 사업자" },
  { value: "8개", label: "업무분야" },
  { value: "1:1", label: "대표 세무사 직접 상담" },
] as const;

export const column = {
  quote: "세금은 결과보다 과정을 이해할 때 덜 불안합니다. 그래서 저희는 신고서보다 설명서를 먼저 씁니다.",
  author: "김한결",
  role: "대표 세무사 · 상속·증여, 법인 컨설팅",
} as const;

// 사무소 소개 — 일하는 원칙
export const principles = [
  { no: "一", title: "먼저 설명합니다", desc: "신고서를 내기 전에 그 숫자가 어떻게 나왔는지, 다른 선택지는 없었는지 문서로 설명합니다." },
  { no: "二", title: "기한을 대신 기억합니다", desc: "수임 고객에게는 다음 신고 일정과 준비 자료를 미리 알려 드립니다. 기한에 쫓기지 않도록." },
  { no: "三", title: "대표 세무사가 직접 봅니다", desc: "첫 상담부터 신고서 검토까지 대표 세무사가 직접 확인합니다. 담당자가 바뀌어도 기록은 남습니다." },
] as const;

export const process = [
  { step: "01", title: "첫 상담", desc: "전화·카카오톡으로 상황을 듣고 필요한 자료를 안내합니다." },
  { step: "02", title: "자료 검토", desc: "신고 이력과 증빙을 검토해 쟁점과 선택지를 정리합니다." },
  { step: "03", title: "방안 설명", desc: "예상 세액과 진행 방식, 보수를 문서로 설명드립니다." },
  { step: "04", title: "신고·대리", desc: "기한 안에 신고하고 진행 상황을 단계마다 공유합니다." },
  { step: "05", title: "사후 관리", desc: "다음 신고 일정과 점검 사항을 미리 알려 드립니다." },
] as const;

export const team = [
  {
    name: "김한결",
    role: "대표 세무사",
    focus: "상속·증여, 법인 컨설팅",
    career: ["국세청 근무 경력 7년", "세무법인 파트너 세무사", "한국세무사회 정회원"],
    quote: "세금은 결과보다 과정을 이해할 때 덜 불안합니다.",
  },
  {
    name: "이서준",
    role: "세무사",
    focus: "양도소득세, 부동산 임대",
    career: ["세무법인 실무 8년", "부동산 세무 강의"],
    quote: "매도 전 한 번의 계산이 가장 큰 차이를 만듭니다.",
  },
  {
    name: "박지원",
    role: "세무사",
    focus: "기장대리, 스타트업 법인",
    career: ["회계법인 감사본부 출신", "창업지원센터 세무 멘토"],
    quote: "사장님은 사업에, 숫자는 저희가 챙기겠습니다.",
  },
] as const;

// 업무 사례 — 실제 고객 정보가 아닌 유형별 예시입니다.
export const cases = [
  {
    tag: "상속세",
    service: "inheritance",
    title: "부동산 위주 상속재산의 평가 방법 검토",
    situation: "상가와 토지가 상속재산의 대부분이라 평가 방식에 따라 세액 차이가 큰 상황",
    action: "감정평가와 기준시가 평가를 비교하고 공제 요건을 정리해 신고",
    result: "유족이 납부 계획을 세울 수 있도록 분납 일정까지 함께 설계",
  },
  {
    tag: "기장대리",
    service: "bookkeeping",
    title: "직원 5명 음식점의 인건비 신고 정비",
    situation: "직원 입·퇴사가 잦아 원천세와 4대보험 신고가 누락되던 사업장",
    action: "급여 대장을 정리하고 매월 신고 일정을 알림으로 관리",
    result: "매월 신고가 정상화되고 고용 관련 공제 검토 진행",
  },
  {
    tag: "세무조사",
    service: "audit",
    title: "자금출처 소명 요청 대응",
    situation: "주택 취득 후 자금출처 소명 안내문을 받은 30대 직장인",
    action: "급여·대출·가족 차입 흐름을 시기별로 정리해 소명서 작성",
    result: "추가 자료 요청 없이 소명 절차 종결",
  },
  {
    tag: "경정청구",
    service: "appeal",
    title: "누락된 공제 항목에 대한 경정청구",
    situation: "프리랜서 소득자가 3년간 경비와 공제를 반영하지 못하고 신고",
    action: "기한이 남은 연도를 확인하고 증빙을 모아 경정청구",
    result: "과다 납부 세액에 대한 환급 절차 진행",
  },
] as const;

export const casesNotice = "사례는 유형별 예시이며, 결과는 개별 사실관계에 따라 달라집니다.";

export const faqs = [
  { q: "상담 비용이 있나요?", a: "첫 상담에서는 상황을 듣고 진행 방식과 보수를 안내드립니다. 서류 검토가 필요한 심층 상담은 사전에 비용을 말씀드린 뒤 진행합니다." },
  { q: "직접 방문하지 않아도 되나요?", a: "기장대리와 대부분의 신고는 홈택스 수임 동의와 자료 전송으로 비대면 진행이 가능합니다. 상속·조사 대응은 대면 상담을 권해 드립니다." },
  { q: "기장 보수는 어떻게 정해지나요?", a: "업종, 매출 규모, 직원 수, 증빙 건수에 따라 달라집니다. 상담 후 견적을 문서로 안내드립니다." },
  { q: "다른 사무소에서 옮겨도 되나요?", a: "가능합니다. 이전 사무소의 신고 이력을 인계받아 누락된 부분이 없는지 먼저 점검합니다." },
  { q: "신고 기한이 얼마 남지 않았어요.", a: "기한이 임박한 경우 전화로 먼저 연락 주세요. 필요한 최소 자료부터 안내해 드립니다." },
] as const;

// 세무 연감 — 일반적인 법정 기한 (월, 일, 항목, 대상, 관련 업무)
export type Deadline = { month: number; day: number; item: string; who: string; service?: string };

export const deadlines: Deadline[] = [
  { month: 1, day: 25, item: "부가가치세 2기 확정신고", who: "개인·법인 사업자", service: "income-vat" },
  { month: 2, day: 10, item: "면세사업자 사업장현황신고", who: "면세 개인사업자", service: "income-vat" },
  { month: 3, day: 10, item: "근로소득 지급명세서 제출", who: "직원을 둔 사업장", service: "bookkeeping" },
  { month: 3, day: 31, item: "법인세 신고 (12월 결산)", who: "법인", service: "corporate" },
  { month: 4, day: 25, item: "부가가치세 1기 예정신고", who: "법인 사업자", service: "income-vat" },
  { month: 5, day: 31, item: "종합소득세 확정신고", who: "개인사업자·프리랜서·임대소득자", service: "income-vat" },
  { month: 6, day: 30, item: "성실신고확인 대상 종합소득세", who: "일정 매출 이상 개인사업자", service: "income-vat" },
  { month: 7, day: 25, item: "부가가치세 1기 확정신고", who: "개인·법인 사업자", service: "income-vat" },
  { month: 8, day: 31, item: "법인세 중간예납", who: "법인 (12월 결산)", service: "corporate" },
  { month: 9, day: 15, item: "근로장려금 반기 신청 (상반기 소득분)", who: "근로소득자" },
  { month: 10, day: 25, item: "부가가치세 2기 예정신고", who: "법인 사업자", service: "income-vat" },
  { month: 11, day: 30, item: "종합소득세 중간예납", who: "개인사업자", service: "income-vat" },
  { month: 12, day: 15, item: "종합부동산세 납부", who: "기준 초과 부동산 보유자", service: "transfer" },
];

// 매달 반복되는 기한
export const monthlyDeadlines = [
  { day: 10, item: "원천세 신고·납부", who: "직원·외주에 대가를 지급한 사업장" },
] as const;
