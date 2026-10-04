const DEFAULT_CONTENT = {
  nav: {
    logo: '홈페이지 편집기',
    links: [{ label: '서비스 소개' }, { label: '포트폴리오' }, { label: '가격' }, { label: 'FAQ' }],
    cta: '상담 신청'
  },
  hero: {
    eyebrow: 'WEB AGENCY',
    title: '구조가 보이는\n웹사이트를 만듭니다',
    desc: '기획부터 SEO 최적화까지, 그리드처럼 촘촘한 구조로 설계한 웹사이트를 제작합니다.',
    ctaPrimary: '프로젝트 문의',
    ctaGhost: '포트폴리오 보기',
    plateCaption: 'fig. 01 — structure'
  },
  diff: {
    eyebrow: 'WHY STUDIO/구조',
    title: '같은 예산, 다른 결과를 만드는 기준',
    items: [
      { num: '01', title: '구조 우선 설계', desc: '화면을 그리기 전에 정보 구조부터 정리해, 방문자가 헤매지 않는 동선을 만듭니다.' },
      { num: '02', title: '기술 SEO 내장', desc: '메타데이터·구조화 데이터·성능 최적화를 제작 단계에서부터 포함합니다.' },
      { num: '03', title: '완료 후 유지보수', desc: '오픈 이후에도 콘텐츠 업데이트와 점검을 함께 책임집니다.' },
      { num: '04', title: '반응형 완성도', desc: '모바일부터 데스크톱까지 실제 기기에서 검증한 반응형 레이아웃을 제공합니다.' },
      { num: '05', title: '실무 커뮤니케이션', desc: '기획 의도와 진행 상황을 문서로 남겨 의사결정 속도를 높입니다.' },
      { num: '06', title: '투명한 견적 구조', desc: '숨겨진 추가 비용 없이 작업 범위를 명확히 안내합니다.' }
    ]
  },
  services: {
    eyebrow: 'SERVICE',
    title: '기획부터 운영까지, 한 팀이 끝까지 책임집니다',
    items: [
      { title: '웹사이트 기획·설계', desc: '비즈니스 목표에 맞춘 정보 구조와 와이어프레임을 설계합니다.' },
      { title: '디자인·개발', desc: '브랜드에 맞는 디자인 시스템을 만들고 반응형으로 구현합니다.' },
      { title: 'SEO·유지보수', desc: '오픈 후 검색 노출과 성능을 지속적으로 관리합니다.' }
    ]
  },
  board: { eyebrow: 'MAGAZINE', title: '스튜디오구조가 정리한 실무 인사이트' },
  gallery: { eyebrow: 'PORTFOLIO', title: '구조로 완성한 프로젝트들' },
  testimonial: { eyebrow: 'REVIEW', title: '함께 일한 클라이언트의 이야기' },
  faq: { eyebrow: 'FAQ', title: '자주 묻는 질문' },
  footer: {
    bizName: '스튜디오구조',
    bizNo: '000-00-00000',
    address: '서울특별시 OO구 OO로 00',
    tel: '000-0000-0000'
  }
};

const DEFAULT_THEME = {
  ink: '#15161A', paper: '#F7F7F3', paperAlt: '#EFEFEA',
  blue: '#2447FF', signal: '#FF5A36', line: '#D6D6CF', muted: '#6B6B63',
  fontFamily: "'Pretendard Variable', Pretendard, -apple-system, sans-serif",
  radius: '2',
  headingSpacing: '-0.02'
};

/* ---------- 텍스트 스타일 일괄 관리 ---------- */
const TEXT_STYLE_OPTIONS = [
  { key: 'fontFamily', label: '폰트', type: 'select', choices: [
    { v: '', l: '기본값 (Pretendard Variable)' },
    { v: "'Pretendard Variable', sans-serif", l: 'Pretendard Variable' },
    { v: 'Georgia, serif', l: '세리프 (Georgia)' },
    { v: '"Courier New", monospace', l: '모노스페이스 (Courier New)' },
    { v: 'system-ui, sans-serif', l: '시스템 고딕' }
  ] },
  { key: 'fontSize', label: '크기', type: 'number', min: 10, max: 64, step: 1, unit: 'px' },
  { key: 'fontWeight', label: '굵기', type: 'select', choices: [
    { v: '400', l: '보통' }, { v: '500', l: '미디엄' }, { v: '600', l: '세미볼드' }, { v: '700', l: '볼드' }, { v: '800', l: '엑스트라볼드' }
  ] },
  { key: 'letterSpacing', label: '자간', type: 'number', min: -0.05, max: 0.1, step: 0.005, unit: 'em' },
  { key: 'color', label: '폰트 컬러', type: 'color' },
  { key: 'shadowColor', label: '그림자 컬러', type: 'color' }
];
const TEXT_STYLE_DEFAULT_EXTRA = { color: '', shadowColor: '', shadowStrength: 0, customCSS: '' };
const TEXT_STYLE_TYPES = [
  { key: 'sectionHeading', label: '섹션별 타이틀', sample: '우리의 서비스', usage: '섹션 편집 모달의 "섹션 제목"에 입력한 텍스트', defaults: { fontFamily: '', fontSize: 36, fontWeight: '800', letterSpacing: -0.02, ...TEXT_STYLE_DEFAULT_EXTRA } },
  { key: 'heroTitle', label: '히어로 타이틀', sample: '구조가 보이는 웹사이트', usage: '히어로 섹션(.hero h1)의 제목 — 현재 워크플로에는 히어로 섹션이 없어 적용 대상이 없음', defaults: { fontFamily: '', fontSize: 44, fontWeight: '800', letterSpacing: -0.03, ...TEXT_STYLE_DEFAULT_EXTRA } },
  { key: 'h2', label: '섹션 타이틀', sample: '같은 예산, 다른 결과를 만드는 기준', usage: '홈 히어로 섹션 본문의 "검색까지 고려한 홈페이지 제작" 문구, 그리고 HTML 콘텐츠 영역에 직접 입력한 <h2> 태그', defaults: { fontFamily: '', fontSize: 28, fontWeight: '800', letterSpacing: -0.02, ...TEXT_STYLE_DEFAULT_EXTRA } },
  { key: 'h3', label: '카드 · 항목 제목 (H3)', sample: '구조 우선 설계', usage: '게시판 글 제목, 섹션 본문 안 소제목', defaults: { fontFamily: '', fontSize: 16, fontWeight: '700', letterSpacing: 0, ...TEXT_STYLE_DEFAULT_EXTRA } },
  { key: 'body', label: '본문 · 설명 텍스트', sample: '방문자가 헤매지 않는 동선을 만듭니다.', usage: '섹션 본문 문단, 게시판 글 요약', defaults: { fontFamily: '', fontSize: 14, fontWeight: '400', letterSpacing: 0, ...TEXT_STYLE_DEFAULT_EXTRA } },
  { key: 'label', label: '마커 · 라벨', sample: 'WHY STUDIO/구조', usage: '게시판 글의 날짜 · 작성자 등 보조 텍스트', defaults: { fontFamily: '', fontSize: 13, fontWeight: '600', letterSpacing: 0, ...TEXT_STYLE_DEFAULT_EXTRA } }
];
