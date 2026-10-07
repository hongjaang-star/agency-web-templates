// ─────────────────────────────────────────────
// 제품 데이터 — 제품 카테고리, 적용 분야, 모델을 이 파일 하나에서 관리합니다.
// 적용 분야 링, 부품 도면 목록·상세, sitemap, 구조화 데이터가 모두 여기서 만들어집니다.
//
// 제품 추가: products 배열에 항목을 하나 더 넣으세요.
//   id        품번 (주소가 됩니다: /parts/{id})
//   category  아래 categories 의 id
//   apps      아래 applications 의 id 목록
//   spec      사양 이름: 값 (원하는 항목을 자유롭게)
//   image     가상 제품 이미지 설명 (촬영·AI 이미지 제작 지시문으로 사용)
// ─────────────────────────────────────────────

export type CategoryId = "heatsink" | "profile" | "housing" | "bracket";
export type AppId = "ev" | "semi" | "led" | "robot" | "telecom" | "medical";

export type Category = { id: CategoryId; name: string; en: string; desc: string; process: string };
export type Application = { id: AppId; name: string; note: string; summary: string; needs: string[]; check: string };
export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  apps: AppId[];
  summary: string;
  features: string[];
  spec: Record<string, string>;
  moq: string;
  lead: string;
  image: string;
};

export const categories: Category[] = [
  { id: "heatsink", name: "방열판", en: "Heat Sink", desc: "핀 간격과 두께를 용도에 맞춰 압출·가공한 방열 부품", process: "압출 → 스카이빙 또는 접합 → 평면 가공 → 아노다이징" },
  { id: "profile", name: "압출 프로파일", en: "Extrusion Profile", desc: "장비 프레임과 레일에 쓰는 표준·주문형 단면", process: "다이 설계 → 압출 → 교정·절단 → 장착면 가공" },
  { id: "housing", name: "하우징·케이스", en: "Housing", desc: "전장품·센서를 감싸는 밀폐형 알루미늄 케이스", process: "압출 또는 다이캐스팅 → CNC 가공 → 기밀 시험 → 도장" },
  { id: "bracket", name: "정밀 가공 브래킷", en: "Machined Bracket", desc: "CNC로 깎아 만든 고정·지지 부품", process: "소재 절단 → 5축 가공 → 치수 검사 → 표면처리" },
];

export const applications: Application[] = [
  {
    id: "ev",
    name: "전기차 배터리",
    note: "셀 냉각, 모듈 고정",
    summary: "배터리 모듈은 열과 진동을 함께 견뎌야 합니다. 냉각수 유로가 있는 콜드플레이트와 밀폐 하우징을 한 업체에서 맞추면 조립 공차가 줄어듭니다.",
    needs: ["냉각수 누설 없는 접합", "모듈 무게 감소", "IP 등급 밀폐"],
    check: "유로 압력, 셀 배열 도면, 목표 무게를 알려 주세요.",
  },
  {
    id: "semi",
    name: "반도체 장비",
    note: "진공 챔버 주변 프레임",
    summary: "장비 프레임과 센서 마운트는 평면도와 청정도가 중요합니다. 가공 후 초음파 세척과 진공 포장까지 한 번에 진행합니다.",
    needs: ["평면도·직각도", "파티클 관리", "세척·포장 기준"],
    check: "세척 등급과 포장 방식, 장착면 공차를 알려 주세요.",
  },
  {
    id: "led",
    name: "LED 조명",
    note: "고출력 조명 방열",
    summary: "고출력 조명은 방열판 크기가 곧 제품 크기입니다. 핀 두께와 간격을 조정해 같은 크기에서 방열 면적을 넓힙니다.",
    needs: ["방열 면적", "외관 색상", "대량 생산 단가"],
    check: "소비 전력, 허용 온도, 외형 제한을 알려 주세요.",
  },
  {
    id: "robot",
    name: "로봇·자동화",
    note: "리니어 레일, 관절 브래킷",
    summary: "자동화 설비는 프레임과 레일, 관절 부품이 함께 움직입니다. 표준 프로파일과 정밀 브래킷을 묶어 공급합니다.",
    needs: ["반복 정밀도", "경량화", "빠른 납기"],
    check: "하중, 스트로크, 조립 도면을 알려 주세요.",
  },
  {
    id: "telecom",
    name: "통신 장비",
    note: "옥외 기지국 함체",
    summary: "옥외 장비는 비·먼지·햇빛을 견디면서 내부 열을 밖으로 내보내야 합니다. 방열 리브가 있는 함체로 두 조건을 함께 맞춥니다.",
    needs: ["방수·방진", "내후성 도장", "방열 리브"],
    check: "설치 환경과 내부 발열량을 알려 주세요.",
  },
  {
    id: "medical",
    name: "의료기기",
    note: "영상 장비 내부 구조물",
    summary: "의료 장비 내부 구조물은 치수 기록과 추적 관리가 필요합니다. 로트별 검사 성적서를 함께 보내 드립니다.",
    needs: ["로트 추적", "치수 성적서", "표면 품질"],
    check: "필요한 성적서 양식과 로트 단위를 알려 주세요.",
  },
];

export const products: Product[] = [
  {
    id: "SH-120",
    name: "스카이빙 방열판 SH-120",
    category: "heatsink",
    apps: ["led", "telecom"],
    summary: "얇은 핀을 한 덩어리에서 깎아 세운 방열판. 같은 크기에서 방열 면적을 넓힙니다.",
    features: ["핀과 바닥이 한 몸이라 접촉 열저항이 없음", "핀 수·높이 주문 조정", "흑색 아노다이징 기본"],
    spec: { 재질: "A6063-T5", "핀 두께": "0.4mm", 크기: "120×80×35mm", 표면: "흑색 아노다이징" },
    moq: "300개",
    lead: "3주",
    image: "검은색 아노다이징 방열판을 45도 위에서 내려다본 사진. 얇은 핀 52장이 빗살처럼 서 있고, 핀 끝에 측면 조명이 닿아 은색 결이 드러난다.",
  },
  {
    id: "CP-200",
    name: "수랭 콜드플레이트 CP-200",
    category: "heatsink",
    apps: ["ev", "semi"],
    summary: "두 장의 판을 마찰교반접합으로 붙여 냉각수 유로를 만든 냉각판.",
    features: ["S자 2패스 유로", "전 수량 헬륨 누설 시험 (예시)", "입·출구 니플 위치 조정"],
    spec: { 재질: "A3003 + 마찰교반접합", 유로: "S자 2패스", 크기: "200×150×12mm", 기밀: "헬륨 누설 시험" },
    moq: "100개",
    lead: "5주",
    image: "무광 은색 판 두 장을 겹친 콜드플레이트를 반쯤 뒤집어 세운 사진. 뒷면에 S자 냉각수 유로가 음각으로 보이고, 입·출구 니플 두 개가 앞으로 나와 있다.",
  },
  {
    id: "RX-4040",
    name: "T슬롯 프로파일 RX-4040",
    category: "profile",
    apps: ["robot", "semi", "medical"],
    summary: "40mm 각 표준 프로파일. 장비 프레임, 커버, 작업대 구조에 씁니다.",
    features: ["8mm 슬롯 4면", "1mm 단위 절단", "끝단 탭 가공 선택"],
    spec: { 재질: "A6063-T5", 단면: "40×40mm, 8mm 슬롯", 길이: "최대 6,000mm 절단", 표면: "투명 아노다이징" },
    moq: "50m",
    lead: "1주",
    image: "길이가 다른 프로파일 세 개를 계단처럼 세워 단면이 정면을 향하게 찍은 사진. 십자형 슬롯과 가운데 구멍이 그림자로 또렷하다.",
  },
  {
    id: "LR-15",
    name: "리니어 레일 베이스 LR-15",
    category: "profile",
    apps: ["robot"],
    summary: "LM 레일을 올리는 베이스. 장착면을 연삭해 평면도를 맞춥니다.",
    features: ["레일 장착면 연삭", "볼트 구멍 피치 주문 지정", "길이 300~3,000mm"],
    spec: { 재질: "A6061-T6", 평면도: "0.05mm/m", 길이: "300~3,000mm", 가공: "레일 장착면 연삭" },
    moq: "20개",
    lead: "3주",
    image: "긴 알루미늄 레일 베이스를 작업대 위에 비스듬히 놓은 사진. 연삭한 상면이 거울처럼 천장 조명을 비추고, 측면에 볼트 구멍이 일정 간격으로 나 있다.",
  },
  {
    id: "HB-310",
    name: "배터리 모듈 하우징 HB-310",
    category: "housing",
    apps: ["ev"],
    summary: "배터리 모듈을 감싸는 밀폐 하우징. 내부 격벽으로 셀 묶음을 나눕니다.",
    features: ["가스켓 홈 일체 가공", "내부 격벽 3칸", "회색 분체도장"],
    spec: { 재질: "A6061-T6", 방수: "IP67 (시험 조건 예시)", 크기: "310×220×90mm", 표면: "회색 분체도장" },
    moq: "200개",
    lead: "6주",
    image: "회색 상자형 하우징의 뚜껑을 반쯤 열어 내부 격벽이 보이게 찍은 사진. 가장자리 가스켓 홈과 모서리 볼트 자리가 함께 보인다.",
  },
  {
    id: "OT-500",
    name: "옥외 통신 함체 OT-500",
    category: "housing",
    apps: ["telecom"],
    summary: "옥외 기지국 장비용 함체. 바깥면 방열 리브로 내부 열을 내보냅니다.",
    features: ["세로 방열 리브", "케이블 글랜드 4구", "백색 내후 도장"],
    spec: { 재질: "ADC12 다이캐스팅 + 가공", 방수: "IP66 (시험 조건 예시)", 크기: "500×360×140mm", 표면: "백색 내후 도장" },
    moq: "100개",
    lead: "8주",
    image: "흰색 통신 함체를 정면에서 찍은 사진. 바깥면에 방열 리브가 세로로 촘촘하고, 아래쪽에 케이블 글랜드 네 개가 한 줄로 달려 있다.",
  },
  {
    id: "BK-07",
    name: "로봇 관절 브래킷 BK-07",
    category: "bracket",
    apps: ["robot", "medical"],
    summary: "로봇 관절의 베어링을 잡는 L자 브래킷. 5축 가공으로 한 번에 깎습니다.",
    features: ["베어링 자리 ±0.02mm", "A7075 고강도 소재", "경질 아노다이징"],
    spec: { 재질: "A7075-T6", 공차: "±0.02mm", 크기: "86×64×22mm", 표면: "경질 아노다이징" },
    moq: "50개",
    lead: "2주",
    image: "짙은 회색 L자 브래킷을 손바닥 위에 올려 크기를 보여 주는 사진. 베어링 자리와 탭 구멍의 가공면이 밝게 반짝인다.",
  },
  {
    id: "SM-3",
    name: "챔버 센서 마운트 SM-3",
    category: "bracket",
    apps: ["semi"],
    summary: "진공 챔버 주변 센서를 고정하는 작은 마운트. 세척 후 진공 포장합니다.",
    features: ["초음파 세척", "개별 진공 포장", "품번 라벨"],
    spec: { 재질: "A5052", 공차: "±0.03mm", 크기: "48×48×30mm", 세척: "초음파 세척·진공 포장" },
    moq: "30개",
    lead: "2주",
    image: "작은 사각 마운트 세 개를 진공 포장 봉투 옆에 나란히 놓은 사진. 가공면이 매끈하고 봉투에 품번 라벨이 붙어 있다.",
  },
];

export const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;
export const applicationOf = (id: AppId) => applications.find((a) => a.id === id)!;
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const productsFor = (app: AppId) => products.filter((p) => p.apps.includes(app));
