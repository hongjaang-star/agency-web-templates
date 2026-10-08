export const milestones = [
  { year: "1998", chapter: "한 대의 선반, 첫 번째 도면", title: "세로결의 시작", body: "작은 임대 작업장에서 알루미늄 절단과 선반 가공을 시작했습니다. 설비 업체의 도면을 한 장씩 읽으며 장착 부품과 소형 브래킷을 만들었습니다.", detail: "수동 가공 작업장 · 절단/선반 중심", image: "factory-1998.webp", alt: "1990년대 소규모 선반 가공 작업장을 표현한 AI 사진" },
  { year: "2006", chapter: "단면을 만드는 공장으로", title: "압출 공정의 내재화", body: "생산동을 확장하고 압출 프레스와 절단·교정 라인을 구성했습니다. 표준 프로파일부터 주문형 단면까지, 소재와 가공을 같은 기준으로 관리하기 시작했습니다.", detail: "압출 생산동 확장 · 프로파일 공급", image: "factory-2006.webp", alt: "2000년대 압출 프레스와 알루미늄 프로파일 생산동을 표현한 AI 사진" },
  { year: "2014", chapter: "정밀도를 더하다", title: "CNC와 방열 부품의 확장", body: "CNC 가공 셀과 스카이빙 방열판 공정을 갖췄습니다. 장착면과 베어링 자리의 가공 기준을 정하고, 검사 기록을 생산 로트와 연결했습니다.", detail: "CNC 가공 셀 · 방열판 라인 · 치수 관리", image: "factory-2014.webp", alt: "2010년대 CNC 가공 설비가 늘어난 정밀 제조 공장을 표현한 AI 사진" },
  { year: "2019", chapter: "새로운 에너지의 부품", title: "수랭·전장 부품으로", body: "콜드플레이트 접합과 배터리 하우징 가공으로 제품군을 넓혔습니다. 조립 공차뿐 아니라 유로·가스켓·밀폐 시험 조건을 함께 검토하는 생산 체계를 만들었습니다.", detail: "콜드플레이트 접합 · 전장 하우징 · 시험 셀", image: "factory-2019.webp", alt: "콜드플레이트와 배터리 하우징을 만드는 현대 제조 생산동을 표현한 AI 사진" },
  { year: "2026", chapter: "사람의 기준, 자동화의 반복", title: "연결되는 스마트 생산", body: "가공 셀과 자재 이송, 검사 데이터를 연결하는 자동화 생산동으로 확장했습니다. 시제품의 변경 내용을 양산 기준에 반영하고, 반복 생산의 흐름을 한눈에 확인합니다.", detail: "자동화 이송 · 생산 데이터 연계 · 로트 추적", image: "factory-2026.webp", alt: "2026년 자동화 가공 셀과 로봇 이송이 있는 밝은 생산동을 표현한 AI 사진" }
];

export const growth = [
  { id: "revenue", label: "매출액", unit: "억원", values: [4.8, 26, 63, 118, 196], caption: "가상 연간 매출 · 명목 금액 기준", description: "절단·가공에서 압출, 방열, 전장 부품으로 사업 범위를 넓혀 온 성장 시나리오입니다." },
  { id: "clients", label: "거래처 수", unit: "곳", values: [12, 34, 78, 126, 184], caption: "가상 연간 거래처 수 · 중복 제외", description: "설비 제작사에서 에너지·반도체·자동화 분야까지, 반복 공급 관계가 넓어지는 흐름입니다." },
  { id: "lines", label: "생산라인", unit: "개", values: [1, 2, 4, 7, 12], caption: "가상 운영 생산라인 수", description: "단일 가공 작업장에서 공정별 생산 셀을 갖춘 통합 생산동으로 확장한 설정입니다." },
  { id: "products", label: "제품 품번", unit: "종", values: [4, 12, 28, 46, 68], caption: "가상 누적 생산 대응 품번 · 공개 카탈로그는 대표 8종", description: "표준 프로파일과 주문 가공품의 대응 범위를 넓혀 온 과정입니다." }
];

export const partners = [
  { name: "NOVOLT", sub: "ENERGY SYSTEMS", field: "전기차·에너지", symbol: "bolt" },
  { name: "ETCHCORE", sub: "SEMICONDUCTOR", field: "반도체 장비", symbol: "chip" },
  { name: "LUMO GRID", sub: "LIGHT TECHNOLOGY", field: "LED 조명", symbol: "sun" },
  { name: "AXISFORM", sub: "ROBOTICS", field: "로봇·자동화", symbol: "axis" },
  { name: "WAVENODE", sub: "COMMUNICATIONS", field: "통신 장비", symbol: "wave" },
  { name: "IMAGENA", sub: "MEDICAL SYSTEMS", field: "의료 장비", symbol: "cross" }
];

export const certificates = [
  { id: "quality", code: "ISO 9001", name: "품질경영 시스템", en: "QUALITY MANAGEMENT", scope: "알루미늄 부품의 설계 검토·압출·정밀 가공", serial: "DEMO-QM-2026-001", date: "2026.01.01 — 2028.12.31" },
  { id: "environment", code: "ISO 14001", name: "환경경영 시스템", en: "ENVIRONMENTAL MANAGEMENT", scope: "소재·가공 공정의 환경 관리 체계", serial: "DEMO-EM-2026-002", date: "2026.01.01 — 2028.12.31" },
  { id: "inspection", code: "LOT REPORT", name: "출하 검사 성적서", en: "INSPECTION REPORT", scope: "품번 HB-310 · 기준면/홀 위치/외관 검사 예시", serial: "DEMO-IR-2026-003", date: "발행 예시 2026.10.09" }
];
