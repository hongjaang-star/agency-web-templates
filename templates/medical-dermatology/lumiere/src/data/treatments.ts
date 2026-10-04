// ─────────────────────────────────────────────
// 진료과목 (가상 데이터)
// ─────────────────────────────────────────────

export type TreatmentCategory = "aesthetic" | "medical";

export type Treatment = {
  slug: string;
  category: TreatmentCategory;
  en: string;
  ko: string;
  summary: string;
  intro: string;
  recommend: string[];
  info: { label: string; value: string }[];
  process: { title: string; desc: string }[];
  equipment: string[];
  faq: { q: string; a: string }[];
  /** 내용을 감수한 전문의 (content.ts 의 doctors.name) — 의료 정보 신뢰도(E-E-A-T) 표시 */
  reviewer: string;
  /** 최종 검토일 (YYYY-MM-DD) — 내용을 고치면 함께 갱신하세요 */
  reviewedAt: string;
};

export const categories: Record<TreatmentCategory, { en: string; ko: string; desc: string }> = {
  aesthetic: {
    en: "Aesthetic",
    ko: "피부 미용",
    desc: "탄력과 결, 톤을 되찾는 안티에이징 프로그램",
  },
  medical: {
    en: "Medical",
    ko: "피부 질환",
    desc: "정확한 진단에서 시작하는 피부과 전문 치료",
  },
};

export const treatments: Treatment[] = [
  {
    slug: "lifting",
    reviewer: "한서윤",
    reviewedAt: "2026-09-30",
    category: "aesthetic",
    en: "Lifting",
    ko: "리프팅",
    summary: "처진 윤곽과 탄력을 개선하는 초음파·고주파 리프팅",
    intro:
      "피부 깊이와 처짐 정도를 먼저 분석한 뒤, 초음파(HIFU)와 고주파(RF) 에너지를 층별로 설계해 윤곽선과 탄력을 자연스럽게 끌어올립니다.",
    recommend: [
      "턱선이 무너지고 이중턱이 고민인 분",
      "팔자주름·마리오넷 라인이 깊어진 분",
      "수술 없이 자연스러운 리프팅을 원하는 분",
      "피부가 얇아지고 탄력이 떨어진 분",
    ],
    info: [
      { label: "시술 시간", value: "30 – 60분" },
      { label: "마취", value: "연고 마취" },
      { label: "회복 기간", value: "즉시 일상 가능" },
      { label: "권장 주기", value: "6 – 12개월" },
    ],
    process: [
      { title: "피부 분석", desc: "탄력, 두께, 처짐 방향을 전문의가 직접 평가합니다." },
      { title: "층별 설계", desc: "부위별 깊이와 에너지 양을 개인 맞춤으로 설계합니다." },
      { title: "정량 시술", desc: "정품 팁을 사용하고 샷 수를 투명하게 안내합니다." },
      { title: "사후 관리", desc: "진정 관리 후 경과를 확인하고 다음 계획을 제안합니다." },
    ],
    equipment: ["울쎄라", "써마지 FLX", "슈링크 유니버스"],
    faq: [
      { q: "통증이 심한가요?", a: "부위와 에너지에 따라 다르지만, 연고 마취와 냉각으로 통증을 최소화합니다. 필요 시 에너지를 조절해 편안하게 진행합니다." },
      { q: "효과는 언제부터 나타나나요?", a: "즉각적인 타이트닝 이후, 콜라겐 재생이 진행되는 2~3개월에 걸쳐 점진적으로 개선됩니다." },
    ],
  },
  {
    slug: "toning",
    reviewer: "이도현",
    reviewedAt: "2026-09-30",
    category: "aesthetic",
    en: "Laser Toning",
    ko: "레이저 토닝 · 색소",
    summary: "기미·잡티·칙칙한 톤을 맑게 정돈하는 색소 레이저",
    intro:
      "색소의 종류와 깊이를 먼저 구분합니다. 기미, 잡티, 주근깨, 오타모반은 원인이 다르기 때문에 레이저의 파장과 강도도 달라야 합니다.",
    recommend: [
      "기미·주근깨·잡티가 고민인 분",
      "전체적으로 피부 톤이 칙칙한 분",
      "색소가 반복적으로 재발하는 분",
      "화장으로 가리기 어려운 색소가 있는 분",
    ],
    info: [
      { label: "시술 시간", value: "15 – 30분" },
      { label: "마취", value: "불필요 또는 연고 마취" },
      { label: "회복 기간", value: "즉시 일상 가능" },
      { label: "권장 주기", value: "2주 간격 5 – 10회" },
    ],
    process: [
      { title: "색소 진단", desc: "피부 확대 진단기로 색소의 종류와 깊이를 확인합니다." },
      { title: "파장 선택", desc: "색소 유형에 맞는 레이저와 파장을 선택합니다." },
      { title: "저자극 시술", desc: "피부 장벽을 지키는 강도로 여러 회에 걸쳐 치료합니다." },
      { title: "홈케어 가이드", desc: "자외선 차단과 재발 방지 관리법을 안내합니다." },
    ],
    equipment: ["피코슈어", "레이저토닝 스펙트라", "엑셀V"],
    faq: [
      { q: "기미가 완전히 없어지나요?", a: "기미는 호르몬·자외선 등 복합 원인으로 재발이 잦은 질환입니다. 치료로 옅게 만들고, 유지 관리로 재발을 줄이는 것을 목표로 합니다." },
      { q: "시술 후 주의사항이 있나요?", a: "시술 후 1~2주간 자외선 차단과 보습에 신경 써 주시고, 각질 제거나 사우나는 피해 주세요." },
    ],
  },
  {
    slug: "skin-booster",
    reviewer: "한서윤",
    reviewedAt: "2026-09-30",
    category: "aesthetic",
    en: "Skin Booster",
    ko: "스킨부스터",
    summary: "속부터 차오르는 수분과 결, 광채를 위한 주사 시술",
    intro:
      "피부 속에 유효 성분을 직접 전달해 수분, 탄력, 피부결을 개선합니다. 피부 타입과 고민에 따라 성분을 조합해 맞춤 처방합니다.",
    recommend: [
      "건조하고 푸석한 피부",
      "잔주름과 거친 결이 고민인 분",
      "화장이 잘 받지 않는 분",
      "중요한 일정 전 피부 컨디션을 올리고 싶은 분",
    ],
    info: [
      { label: "시술 시간", value: "20 – 40분" },
      { label: "마취", value: "연고 마취" },
      { label: "회복 기간", value: "1 – 3일 (미세 자국)" },
      { label: "권장 주기", value: "2 – 4주 간격 3회" },
    ],
    process: [
      { title: "타입 분석", desc: "수분도, 유분도, 피부결을 측정합니다." },
      { title: "성분 처방", desc: "PDRN, 히알루론산 등 고민에 맞는 성분을 선택합니다." },
      { title: "정밀 주입", desc: "균일한 깊이와 양으로 꼼꼼하게 주입합니다." },
      { title: "진정 관리", desc: "쿨링과 진정 관리로 마무리합니다." },
    ],
    equipment: ["포텐자", "더마샤인"],
    faq: [
      { q: "여러 성분을 함께 맞아도 되나요?", a: "피부 상태에 따라 조합이 가능합니다. 전문의 상담을 통해 필요한 성분만 권해 드립니다." },
    ],
  },
  {
    slug: "botox-filler",
    reviewer: "한서윤",
    reviewedAt: "2026-09-30",
    category: "aesthetic",
    en: "Botox & Filler",
    ko: "보톡스 · 필러",
    summary: "표정과 비율을 고려한 자연스러운 주름·볼륨 교정",
    intro:
      "얼굴의 비율과 표정 근육의 움직임을 먼저 관찰합니다. 과하지 않게, 본래의 인상을 해치지 않는 범위에서 디자인합니다.",
    recommend: [
      "이마·미간·눈가 표정 주름",
      "사각턱, 승모근 윤곽 개선",
      "꺼진 볼·앞광대·팔자 볼륨 보완",
      "자연스러운 변화를 원하는 분",
    ],
    info: [
      { label: "시술 시간", value: "10 – 30분" },
      { label: "마취", value: "연고 마취" },
      { label: "회복 기간", value: "즉시 일상 가능" },
      { label: "지속 기간", value: "보톡스 3 – 6개월 / 필러 6개월 이상" },
    ],
    process: [
      { title: "얼굴 분석", desc: "정면·측면 비율과 표정 근육을 분석합니다." },
      { title: "디자인", desc: "주입 부위와 용량을 함께 확인하며 계획합니다." },
      { title: "정품 개봉", desc: "고객 앞에서 정품을 개봉하고 정량을 사용합니다." },
      { title: "경과 확인", desc: "2주 후 결과를 확인하고 필요 시 보완합니다." },
    ],
    equipment: [],
    faq: [
      { q: "정품인지 확인할 수 있나요?", a: "모든 제품은 시술 전 고객 앞에서 개봉하며, 정품 인증 라벨을 확인하실 수 있습니다." },
    ],
  },
  {
    slug: "acne",
    reviewer: "정유진",
    reviewedAt: "2026-09-30",
    category: "medical",
    en: "Acne & Pores",
    ko: "여드름 · 모공",
    summary: "원인 진단부터 재발 관리까지, 단계별 여드름 치료",
    intro:
      "여드름은 피지, 각질, 염증, 호르몬 등 원인이 다양합니다. 약물 치료와 시술을 단계적으로 병행해 흉터 없이 회복하는 것을 목표로 합니다.",
    recommend: [
      "반복되는 염증성 여드름",
      "성인 여드름·턱 주변 트러블",
      "넓어진 모공과 블랙헤드",
      "여드름 자국(홍반·색소)이 남는 분",
    ],
    info: [
      { label: "진료 방식", value: "약물 + 시술 병행" },
      { label: "건강보험", value: "진료·약 처방 일부 적용" },
      { label: "회복 기간", value: "시술별 상이" },
      { label: "권장 주기", value: "2 – 4주 간격 관리" },
    ],
    process: [
      { title: "원인 진단", desc: "여드름의 유형과 악화 요인을 확인합니다." },
      { title: "약물 처방", desc: "필요 시 바르는 약, 먹는 약을 처방합니다." },
      { title: "압출·시술", desc: "염증을 가라앉히는 시술을 병행합니다." },
      { title: "재발 관리", desc: "생활 습관과 스킨케어를 함께 조정합니다." },
    ],
    equipment: ["아그네스", "골드 PTT"],
    faq: [
      { q: "건강보험이 적용되나요?", a: "여드름 진료와 약 처방에는 건강보험이 적용됩니다. 미용 목적의 시술은 비급여로 진행됩니다." },
    ],
  },
  {
    slug: "scar",
    reviewer: "이도현",
    reviewedAt: "2026-09-30",
    category: "medical",
    en: "Scar Revision",
    ko: "흉터 치료",
    summary: "패인 여드름 흉터와 수술·외상 흉터의 단계적 재건",
    intro:
      "흉터의 형태(박스형, 아이스픽형, 롤링형)에 따라 치료 방법이 달라집니다. 여러 방법을 조합해 피부 표면을 단계적으로 재건합니다.",
    recommend: [
      "패인 여드름 흉터",
      "수술·외상 후 남은 흉터",
      "튀어나온 비후성 흉터",
      "흉터로 인한 피부결 불균형",
    ],
    info: [
      { label: "시술 시간", value: "30 – 60분" },
      { label: "마취", value: "연고 마취" },
      { label: "회복 기간", value: "3 – 7일" },
      { label: "권장 주기", value: "4 – 6주 간격" },
    ],
    process: [
      { title: "흉터 분류", desc: "흉터의 형태와 깊이를 분류합니다." },
      { title: "조합 설계", desc: "서브시전, 프락셀, 도트필 등을 조합합니다." },
      { title: "단계 시술", desc: "피부 회복 주기에 맞춰 순차적으로 진행합니다." },
      { title: "재생 관리", desc: "재생 크림과 홈케어로 회복을 돕습니다." },
    ],
    equipment: ["프락셀 듀얼", "포텐자"],
    faq: [
      { q: "몇 회 정도 받아야 하나요?", a: "흉터의 깊이와 범위에 따라 다르며, 보통 3~5회 이상 단계적으로 진행합니다." },
    ],
  },
  {
    slug: "atopy",
    reviewer: "정유진",
    reviewedAt: "2026-09-30",
    category: "medical",
    en: "Atopy & Sensitive",
    ko: "아토피 · 민감성 피부",
    summary: "피부 장벽 회복에 집중한 아토피·습진·홍조 치료",
    intro:
      "가려움과 염증을 조절하는 동시에 무너진 피부 장벽을 회복하는 데 집중합니다. 연령과 증상에 맞춰 장기적인 관리 계획을 세웁니다.",
    recommend: [
      "아토피 피부염·습진",
      "지루성 피부염",
      "안면 홍조·주사",
      "쉽게 붉어지고 따가운 민감성 피부",
    ],
    info: [
      { label: "진료 방식", value: "약물 + 광선 치료" },
      { label: "건강보험", value: "질환 치료 적용" },
      { label: "대상", value: "소아 ~ 성인" },
      { label: "관리", value: "증상에 따라 정기 내원" },
    ],
    process: [
      { title: "증상 평가", desc: "염증 범위와 악화 요인을 확인합니다." },
      { title: "염증 조절", desc: "필요한 약물로 가려움과 염증을 가라앉힙니다." },
      { title: "장벽 회복", desc: "광선 치료와 보습 처방으로 장벽을 회복합니다." },
      { title: "생활 관리", desc: "세안·보습·환경 관리법을 안내합니다." },
    ],
    equipment: ["엑셀V"],
    faq: [
      { q: "아이도 진료받을 수 있나요?", a: "네, 소아 아토피도 진료합니다. 연령에 맞는 안전한 치료 방법으로 진행합니다." },
    ],
  },
  {
    slug: "lesion",
    reviewer: "정유진",
    reviewedAt: "2026-09-30",
    category: "medical",
    en: "Lesion Removal",
    ko: "점 · 사마귀 · 검버섯",
    summary: "정확한 감별 진단 후 흔적을 최소화하는 제거",
    intro:
      "제거 전 양성 병변인지 먼저 감별합니다. 병변의 종류와 크기, 깊이에 맞는 방법으로 흔적을 최소화해 제거합니다.",
    recommend: [
      "점·쥐젖·비립종",
      "바이러스성 사마귀·티눈",
      "검버섯(지루각화증)",
      "모양이 변하거나 커지는 점",
    ],
    info: [
      { label: "시술 시간", value: "10 – 30분" },
      { label: "마취", value: "국소 마취" },
      { label: "회복 기간", value: "5 – 10일 (재생 테이프)" },
      { label: "건강보험", value: "사마귀 등 일부 적용" },
    ],
    process: [
      { title: "감별 진단", desc: "더모스코피로 병변을 확인합니다." },
      { title: "방법 선택", desc: "레이저, 냉동, 절제 중 적합한 방법을 선택합니다." },
      { title: "제거", desc: "주변 조직 손상을 최소화해 제거합니다." },
      { title: "재생 관리", desc: "재생 테이프와 연고로 흔적을 줄입니다." },
    ],
    equipment: ["CO2 레이저"],
    faq: [
      { q: "제거 후 흉터가 남나요?", a: "병변의 깊이에 따라 다르지만, 재생 기간 동안 관리 수칙을 지키시면 흔적을 최소화할 수 있습니다." },
    ],
  },
];

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function getTreatmentsByCategory(category: TreatmentCategory) {
  return treatments.filter((t) => t.category === category);
}
