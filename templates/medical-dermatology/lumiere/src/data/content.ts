// ─────────────────────────────────────────────
// 의료진 · 장비 · 이벤트 · 철학 (가상 데이터)
// ─────────────────────────────────────────────

export type Doctor = {
  name: string;
  role: string;
  specialty: string;
  initial: string;
  image: string;
  quote: string;
  career: string[];
};

export const doctors: Doctor[] = [
  {
    name: "한서윤",
    role: "대표원장",
    specialty: "리프팅 · 안티에이징",
    initial: "H",
    image: "/images/doctors/han-seoyun.jpg",
    quote: "피부가 가진 본래의 빛을 되찾는 것, 그것이 가장 아름다운 결과라고 믿습니다.",
    career: [
      "피부과 전문의",
      "OO대학교 의과대학 졸업",
      "OO대학교병원 피부과 전공의 수료",
      "대한피부과학회 정회원",
    ],
  },
  {
    name: "이도현",
    role: "원장",
    specialty: "색소 · 레이저",
    initial: "L",
    image: "/images/doctors/lee-dohyun.jpg",
    quote: "색소는 원인이 다르면 답도 다릅니다. 진단에 가장 많은 시간을 씁니다.",
    career: [
      "피부과 전문의",
      "OO대학교 의과대학 졸업",
      "OO대학교병원 피부과 임상강사",
      "대한피부과학회 정회원",
    ],
  },
  {
    name: "정유진",
    role: "원장",
    specialty: "여드름 · 피부질환",
    initial: "J",
    image: "/images/doctors/jung-yujin.jpg",
    quote: "치료는 결국 일상으로 돌아가는 과정입니다. 오래 편안한 피부를 함께 만들어요.",
    career: [
      "피부과 전문의",
      "OO대학교 의과대학 졸업",
      "OO대학교병원 피부과 전공의 수료",
      "대한피부과학회 정회원",
    ],
  },
];

export type Equipment = {
  image: string;
  name: string;
  en: string;
  type: string;
  desc: string;
};

export const equipment: Equipment[] = [
  { image: "/images/equipment/ulthera.jpg", name: "울쎄라", en: "Ulthera", type: "HIFU 리프팅", desc: "초음파 에너지를 SMAS층까지 전달해 처진 윤곽을 끌어올립니다." },
  { image: "/images/equipment/thermage-flx.jpg", name: "써마지 FLX", en: "Thermage FLX", type: "RF 리프팅", desc: "고주파로 진피층 콜라겐을 자극해 탄력과 피부결을 개선합니다." },
  { image: "/images/equipment/shurink-universe.jpg", name: "슈링크 유니버스", en: "Shurink Universe", type: "HIFU 리프팅", desc: "부위별 카트리지로 얼굴·바디 윤곽을 섬세하게 정리합니다." },
  { image: "/images/equipment/picosure.jpg", name: "피코슈어", en: "PicoSure", type: "피코 레이저", desc: "피코초 단위의 짧은 펄스로 색소를 잘게 부숴 톤을 맑게 합니다." },
  { image: "/images/equipment/spectra.jpg", name: "레이저토닝 스펙트라", en: "Spectra", type: "색소 레이저", desc: "기미와 칙칙한 톤을 저자극으로 개선하는 토닝 레이저입니다." },
  { image: "/images/equipment/excel-v.jpg", name: "엑셀V", en: "Excel V", type: "혈관 레이저", desc: "홍조, 모세혈관 확장, 색소를 함께 치료하는 복합 레이저입니다." },
  { image: "/images/equipment/potenza.jpg", name: "포텐자", en: "Potenza", type: "마이크로니들 RF", desc: "미세 바늘과 고주파로 모공, 흉터, 피부결을 개선합니다." },
  { image: "/images/equipment/fraxel-dual.jpg", name: "프락셀 듀얼", en: "Fraxel Dual", type: "프락셔널 레이저", desc: "피부 재생을 유도해 패인 흉터와 잔주름을 개선합니다." },
  { image: "/images/equipment/agnes.jpg", name: "아그네스", en: "Agnes", type: "절연 RF", desc: "피지선을 선택적으로 치료해 반복되는 여드름을 줄입니다." },
  { image: "/images/equipment/co2-laser.jpg", name: "CO2 레이저", en: "CO2 Laser", type: "제거 레이저", desc: "점, 사마귀, 검버섯 등 병변을 정밀하게 제거합니다." },
];

export type ClinicEvent = {
  slug: string;
  title: string;
  subtitle: string;
  period: string;
  tag: string;
  items: string[];
};

export const events: ClinicEvent[] = [
  {
    slug: "first-visit",
    title: "첫 방문 웰컴 케어",
    subtitle: "처음 오신 분께 1:1 피부 정밀 진단을 무료로 제공합니다.",
    period: "2026.10.01 – 2026.10.31",
    tag: "Welcome",
    items: ["피부 정밀 진단 (확대 진단기)", "전문의 1:1 상담", "맞춤 홈케어 가이드"],
  },
  {
    slug: "autumn-booster",
    title: "가을 스킨부스터 위크",
    subtitle: "건조해지는 계절, 속부터 채우는 수분 프로그램.",
    period: "2026.10.06 – 2026.10.19",
    tag: "Season",
    items: ["스킨부스터 3회 패키지", "진정 관리 1회 포함", "상세 비용은 상담 시 안내"],
  },
  {
    slug: "lifting-program",
    title: "시그니처 리프팅 프로그램",
    subtitle: "울쎄라와 써마지를 개인 피부 두께에 맞춰 설계합니다.",
    period: "상시 진행",
    tag: "Signature",
    items: ["층별 맞춤 설계", "정품 팁 개봉 확인", "시술 후 경과 체크 1회"],
  },
];

export const promises = [
  {
    no: "01",
    title: "전문의 직접 진단",
    en: "Diagnosis",
    desc: "모든 상담과 시술 계획은 피부과 전문의가 직접 진행합니다. 필요 없는 시술은 권하지 않습니다.",
  },
  {
    no: "02",
    title: "정품 · 정량 원칙",
    en: "Integrity",
    desc: "모든 약제와 팁은 고객 앞에서 개봉하며, 사용량을 투명하게 안내합니다.",
  },
  {
    no: "03",
    title: "끝까지 책임지는 관리",
    en: "Aftercare",
    desc: "시술 이후의 경과까지 확인합니다. 결과가 자리 잡을 때까지 함께합니다.",
  },
];

// ─────────────────────────────────────────────
// 메인 페이지 섹션 데이터
// ─────────────────────────────────────────────

/** 고민별 찾기 — slug 는 treatments.ts 의 진료과목으로 연결됩니다 */
export const concerns = [
  { key: "Firmness", title: "탄력 · 처짐", desc: "무너진 턱선, 깊어진 팔자주름", slug: "lifting" },
  { key: "Pigment", title: "기미 · 잡티", desc: "칙칙한 톤, 반복되는 색소", slug: "toning" },
  { key: "Hydration", title: "건조 · 잔주름", desc: "푸석한 결, 화장이 뜨는 피부", slug: "skin-booster" },
  { key: "Acne", title: "여드름 · 모공", desc: "반복되는 트러블과 넓은 모공", slug: "acne" },
  { key: "Scar", title: "패인 흉터", desc: "여드름 흉터, 수술·외상 흉터", slug: "scar" },
  { key: "Sensitive", title: "홍조 · 민감", desc: "쉽게 붉어지고 따가운 피부", slug: "atopy" },
];

/** 첫 방문 진료 과정 (순서가 의미 있는 단계) */
export const visitSteps = [
  { title: "예약", en: "Reservation", desc: "카카오톡, 네이버 예약, 전화 중 편한 방법으로 원하는 시간을 정합니다." },
  { title: "1:1 피부 진단", en: "Diagnosis", desc: "확대 진단기로 피부 상태를 확인하고, 전문의와 충분히 상담합니다." },
  { title: "맞춤 시술", en: "Treatment", desc: "필요한 시술만 권하고, 정품 개봉과 사용량을 확인하신 뒤 진행합니다." },
  { title: "사후 관리", en: "Aftercare", desc: "경과를 확인하고 홈케어 방법과 다음 계획을 안내합니다." },
];

/** 공간 소개 (메인·병원소개 공용) */
export const spaces = [
  { image: "/images/space/reception.jpg", label: "Reception", name: "리셉션 · 라운지", desc: "머무는 시간까지 편안하도록 채광과 동선을 설계했습니다." },
  { image: "/images/space/consulting.jpg", label: "Consulting", name: "1:1 상담실", desc: "독립된 상담실에서 전문의와 충분히 대화합니다." },
  { image: "/images/space/treatment.jpg", label: "Treatment", name: "개별 시술실", desc: "모든 시술실은 1인 1실로 프라이버시를 지킵니다." },
  { image: "/images/space/powder-room.jpg", label: "Powder Room", name: "파우더룸", desc: "시술 후 가볍게 정돈하고 일상으로 돌아가세요." },
];

/** 메인 자주 묻는 질문 */
export const homeFaq = [
  {
    q: "상담만 받아도 되나요?",
    a: "네, 가능합니다. 전문의 상담 후 시술 여부는 충분히 고민하고 결정하셔도 됩니다. 필요하지 않은 시술은 권하지 않습니다.",
  },
  {
    q: "첫 방문 시 무엇을 준비해야 하나요?",
    a: "신분증을 지참해 주세요. 복용 중인 약이나 최근 받은 시술이 있다면 상담 시 알려 주시면 더 정확하게 진단할 수 있습니다.",
  },
  {
    q: "건강보험이 적용되나요?",
    a: "여드름, 아토피, 사마귀 등 질환 치료와 약 처방에는 건강보험이 적용됩니다. 미용 목적의 시술은 비급여로 진행되며 비용은 상담 시 안내해 드립니다.",
  },
  {
    q: "시술 후 바로 일상생활이 가능한가요?",
    a: "대부분의 레이저·리프팅 시술은 바로 일상생활이 가능합니다. 시술에 따라 붉은기나 미세한 자국이 1~3일 정도 남을 수 있어 상담 시 일정에 맞춰 안내해 드립니다.",
  },
  {
    q: "주차가 가능한가요?",
    a: "건물 지하주차장을 이용하실 수 있으며, 진료 고객은 2시간 무료입니다. 강남역 3번 출구에서 도보 3분 거리로 대중교통도 편리합니다.",
  },
];
